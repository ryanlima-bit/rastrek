// netlify/functions/asaas-pix.js
exports.handler = async (event) => {
  // Apenas aceitamos requisições POST
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Método não permitido' };

  try {
    const { nome, cpf } = JSON.parse(event.body);
    const apiKey = process.env.ASAAS_API_KEY; // A tua chave secreta configurada no Netlify
    const headers = { 'Content-Type': 'application/json', 'access_token': apiKey };

    // 1. Criar o Cliente no Asaas
    const customerReq = await fetch('https://api.asaas.com/v3/customers', {
      method: 'POST', headers,
      body: JSON.stringify({ name: nome, cpfCnpj: cpf })
    });
    const customer = await customerReq.json();

    // 2. Criar a Cobrança PIX de R$ 50,00
    const paymentReq = await fetch('https://api.asaas.com/v3/payments', {
      method: 'POST', headers,
      body: JSON.stringify({
        customer: customer.id,
        billingType: 'PIX',
        value: 50.00,
        dueDate: new Date().toISOString().split('T')[0] // Vence hoje
      })
    });
    const payment = await paymentReq.json();

    // 3. Obter o QR Code e a linha digitável (Copia e Cola)
    const qrReq = await fetch(`https://api.asaas.com/v3/payments/${payment.id}/pixQrCode`, { headers });
    const qrCode = await qrReq.json();

    // Devolver para o frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ qrImage: qrCode.encodedImage, payload: qrCode.payload })
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Erro ao gerar PIX' }) };
  }
};