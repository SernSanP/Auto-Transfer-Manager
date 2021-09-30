import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';
import { response } from 'express';
import { PayersService } from 'src/payers/payers.service';
import { TransactionGroupsService } from 'src/transaction-groups/transaction-groups.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { UsersService } from 'src/users/users.service';
import { CreateTransferDto } from './dto/createTranfer.dto';
import { StartTransferDto } from './dto/startTransfer.dto';
import { Transfer } from './transfer.entity';

@Injectable()
export class TransferService {
  constructor(
    private transactionsGroupsService: TransactionGroupsService,
    private transactionsService: TransactionsService,
    private usersService: UsersService,
    private payersService: PayersService,
  ) {}

  async createTransfer(createTransferDto: CreateTransferDto) {
    console.log('createTranferDto: ', createTransferDto);
    const { data, userID, source_system_name } = createTransferDto;
    const transactiongroup =
      await this.transactionsGroupsService.createTransactionGroup({});
    const user = await this.usersService.getUserById(userID);
    for (let i = 0; i < data.length; i++) {
      let transaction = await this.transactionsService.createTransaction({
        transaction_group_id: transactiongroup.id,
        source_system_name: source_system_name,
        user_id: user.id,
        user_first_name: user.first_name,
        user_last_name: user.last_name,
        payee_bank_abbr: data[i][0],
        payee_bank_account: data[i][2],
        amount: Number(data[i][3]),
        payee_name: data[i][1],
      });
      console.log(transaction);
    }
    return transactiongroup;
  }
  async startTransfer(data: StartTransferDto) {
    const { payer_id, transactionlist } = data;
    const payer = await this.payersService.getPayerById(payer_id);
    const transaction_group_id = await (
      await this.transactionsService.getTransactionById(transactionlist[0])
    ).transaction_group_id;
    await this.transactionsGroupsService.updateTransactionGroup(
      { begin_transfered_at: new Date() },
      transaction_group_id,
    );
    for (let i = 0; i < transactionlist.length; i++) {
      await this.transactionsService.updateTransaction_Payer(
        {
          payer_id: payer.id,
          payer_bank_abbr: payer.payer_bank_abbr,
          payer_bank_account: payer.payer_bank_account,
          payer_msisdn: payer.payer_msisdn,
        },
        transactionlist[i],
      );
      let transaction = await this.transactionsService.getTransactionById(
        transactionlist[i],
      );
      try {
        let response = await axios.post<ServerResponse>(
          'https://services.missilegroup.com/autotransfer-test/transfer',
          {
            session: transaction.session_id,
            payer_bank: transaction.payer_bank_abbr,
            payer_account: transaction.payer_bank_account,
            payer_msisdn: transaction.payer_msisdn,
            payee_bank: transaction.payee_bank_abbr,
            payee_account: transaction.payee_bank_account,
            amount: transaction.amount,
            callback_url:
              ' https://cc76-2403-6200-8820-336a-c0c8-45be-f5d6-fbe6.ngrok.io/transfer/callback',
          },
          {
            headers: {
              apikey: '013ba1c9-6cb2-4891-a523-950a25d1a712',
              ['source-system-name']: transaction.source_system_name,
            },
          },
        );
        this.transactionsService.updateTransaction_Response(
          {
            api_transaction_id: response.data.data.transaction_id,
            status_code: response.data.status.code,
            status_type: response.data.status.type,
            status_message: response.data.status.message,
          },
          transaction.id,
        );
      } catch (error) {
        // console.log(error.response.status);
        console.log('error', error.response.data);
        this.transactionsService.updateTransaction_Response(
          {
            api_transaction_id: null,
            status_code: error.response.data.status.code,
            status_type: error.response.data.status.type,
            status_message: error.response.data.status.message,
          },
          transaction.id,
        );
        // if (error.response.status == 403) {
        //   throw new ForbiddenException();
        // }
        // if (error.response.status == 422) {
        //   throw new UnprocessableEntityException();
        // }
      }
    }
    await this.transactionsGroupsService.updateTransactionGroup(
      { end_transfered_at: new Date() },
      transaction_group_id,
    );
  }
  async callbackTranfer(callbackTranferInterface: CallbackTranfer) {
    const { status, data } = callbackTranferInterface;
    const callbackData = {
      actual_amount: data.unique_amount,
      response_payee_name: data.response_payee_name,
      status_code: status.code,
      status_type: status.type,
      status_message: status.message,
    };
    try {
      this.transactionsService.updateTransactionCallback(
        callbackData,
        data.transaction_id,
      );
    } catch (error) {
      this.transactionsService.updateTransactionCallback(
        callbackData,
        data.transaction_id,
      );
      console.log('error', error.response.data);
    }
  }
}
