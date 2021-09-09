import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { PayersService } from 'src/payers/payers.service';
import { TransactionGroupsService } from 'src/transaction-groups/transaction-groups.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { UsersService } from 'src/users/users.service';
import { CreateTransferDto } from './dto/createTransfer.dto';
import { Transfer } from './transfer.entity';

@Injectable()
export class TransferService {
  constructor(
    private transactionsGroupsService: TransactionGroupsService,
    private transactionsService: TransactionsService,
    private usersService: UsersService,
    private payersService: PayersService,
  ) {}
  // async createTransfer(createTransferDto: CreateTransferDto) {
  //   const {
  //     source_system_name,
  //     user_id,
  //     payer_id,
  //     payee_bank_abbr,
  //     payee_bank_account,
  //     amount,
  //     payee_name,
  //   } = createTransferDto;
  //   const transactiongroup =
  //     await this.transactionsGroupsService.createTransactionGroup({
  //       is_running: true,
  //     });
  //   const payer = await this.payersService.getPayerById(payer_id);
  //   const user = await this.usersService.getUserById(user_id);
  //   const transaction = await this.transactionsService.createTransaction({
  //     transaction_group_id: transactiongroup.id,
  //     session_id: 'ada',
  //     source_system_name: source_system_name,
  //     user_id: user_id,
  //     user_first_name: user.first_name,
  //     user_last_name: user.last_name,
  //     payer_id: payer_id,
  //     payer_bank_abbr: payer.payer_bank_abbr,
  //     payer_bank_account: payer.payer_bank_account,
  //     payer_msisdn: payer.payer_msisdn,
  //     payee_bank_abbr,
  //     payee_bank_account,
  //     amount,
  //     payee_name,
  //   });
  //   try {
  //     const response = await axios.post<ServerResponse>(
  //       'https://services.missilegroup.com/autotransfer-test/transfer',
  //       {
  //         session: '00000000-0000-0000-0000-000000000000',
  //         payer_bank: transaction.payer_bank_abbr,
  //         payer_account: transaction.payer_bank_account,
  //         payer_msisdn: transaction.payer_msisdn,
  //         payee_bank: transaction.payee_bank_abbr,
  //         payee_account: transaction.payee_bank_account,
  //         amount: transaction.amount,
  //         callback_url: 'http://127.0.0.1:4040',
  //       },
  //       {
  //         headers: {
  //           apikey: '013ba1c9-6cb2-4891-a523-950a25d1a712',
  //           ['source-system-name']: transaction.source_system_name,
  //         },
  //       },
  //     );

  //     this.transactionsService.updateTransaction(
  //       {
  //         api_transaction_id: response.data.data.transaction_id,
  //         status_code: response.data.status.code,
  //         status_type: response.data.status.type,
  //         status_message: response.data.status.message,
  //       },
  //       transaction.id,
  //     );
  //     return response.data;
  //   } catch (error) {
  //     // console.log(error.response.status);
  //     // console.log(error.response.data);
  //     if (error.response.status == 403) {
  //       throw new ForbiddenException();
  //     }
  //     if (error.response.status == 422) {
  //       throw new UnprocessableEntityException();
  //     }
  //   }
  // }
}
