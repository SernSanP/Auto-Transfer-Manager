interface CallbackTranfer {
  status: { code: "string"; type: "string"; error_type: any; message: string };
  data: {
    transaction_id: string;
    bank_login: string;
    response_payee_name: string;
    request_amount: number;
    unique_amount: number;
  };
}
