interface ServerResponse {
  status: { code: string; type: string; error_type; message: string };
  data: { transaction_id: string };
}
