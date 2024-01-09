const client = require('twilio')('ACd73bb4fef1b43626e8872a211e77d0ad', '74ecb0d754fd13e03b2fcbffe1288021');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('olá')
})

app.post('/hook', (req, res) => {
    let messageToSend = req.body.message;
    const senderNumber = req.body.to;
    console.log(messageToSend, senderNumber)
    if (messageToSend === 'oi') {
        messageToSend = 'Olá, em que posso ajudar ?'
    } else if (messageToSend === 'produto') {
        messageToSend = 'Olá, qual produto deseja informações ?';
    } else if (messageToSend === 'cartão') {
        messageToSend = 'Qual o assunto relacionado ao cartão ?';
    } else if (messageToSend === '1 - saldo da fatura') {
        messageToSend = 'O valor atual da sua fatura é: R$ 1000.00';
    } else if (messageToSend === 'encerrar atendimento') {
        messageToSend = 'Obrigado por nos contatar';
    } else {
        messageToSend = 'Desculpe não conseguimos entender a sua necessidade, contate o numero: XXX';
    }

    sendMessage(messageToSend, senderNumber);
    res.send('OK');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

function sendMessage(messageToSend, to) {
    client.messages
        .create({
            body: messageToSend,
            from: `whatsapp:+14155238886`,
            to: `whatsapp:${to}`
        })
        .then(message => console.log(message.sid));
}
