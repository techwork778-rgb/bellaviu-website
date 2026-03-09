import { database } from "../../../config/dbconnection";


export async function GET(req) {
  try {
    const [rows] = await database.query('SELECT id, amount, currency, status, card_brand, card_number, cardholder_name,creation_time, authentication_status, authorization_code,authentication_transaction_id,merchant_name,merchant_id FROM paymenttransactions');
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}