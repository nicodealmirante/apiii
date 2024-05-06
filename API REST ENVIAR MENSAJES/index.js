const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const express = require('express');
const bodyParser = require('body-parser');
const qrcodeImage = require('qrcode');
const fs = require('fs');

//PRIMERO LE DAN npm i 
//LUEGO LO INICIAN CON npm start por defecto viene en el port 9000
//EN LA CONSOLA PUEDEN SCANEAR EL QR http//localhost:9000/qr O DIRACTAMENTE DESDE LA CONSOLA



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const client = new Client({

app.post('/enviar-mensaje', async (req, res) => {
  const { numero, mensaje } = req.body;

  if (!numero || !mensaje) {
    res.status(400).json({ error: 'El número y el mensaje son requeridos.' });
    return;
  }

  try {
    await client.sendMessage(`${numero}@c.us`, mensaje);
    res.json({ message: `Mensaje enviado a ${numero}: ${mensaje}` });
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error al enviar el mensaje.' });
  }
});

client.on('qr', (qr) => {
  console.log('QR recibido:');
  qrcode.generate(qr, { small: true });

  // Generar imagen con el código QR
  qrcodeImage.toFile(
    './qr.png',
    qr,
    { errorCorrectionLevel: 'H' },
    (err) => {
      if (err) throw err;
      console.log('Código QR generado en qr.png');
    }
  );
});

client.on('ready', () => {
  console.log('Cliente de WhatsApp listo!');
});

client.initialize();

app.get('/qr', (req, res) => {
  // Leer archivo de imagen y enviarlo como respuesta
  
});

app.listen(9000, () => {
  console.log('API REST de WhatsApp iniciada en el puerto 9000.');
});
