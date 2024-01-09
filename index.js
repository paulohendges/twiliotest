const client = require('twilio')('ACd73bb4fef1b43626e8872a211e77d0ad', '74ecb0d754fd13e03b2fcbffe1288021');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('olá')
})

app.post('/hook', express.json(), (req, res) => {
    let messageToSend = "Desculpe não conseguimos entender a sua necessidade, contate o numero: XXX";

    // const senderNumber = req.body.to;
    console.log(messageToSend, '+555192913632', req.body.Body)
    if (req.body.Body === 'oi') {
        messageToSend = 'Olá, em que posso ajudar ?'
    } else if (req.body.Body === 'produto') {
        messageToSend = 'Olá, qual produto deseja informações ?';
    } else if (req.body.Body === 'cartão') {
        messageToSend = 'Qual o assunto relacionado ao cartão ?';
    } else if (req.body.Body === '1 - saldo da fatura') {
        messageToSend = 'O valor atual da sua fatura é: R$ 1000.00';
    } else if (req.body.Body === 'encerrar atendimento') {
        messageToSend = 'Obrigado por nos contatar';
    }

    sendMessage(messageToSend);
    res.send('OK');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

function sendMessage(messageToSend) {
    client.messages
        .create({
            body: messageToSend,
            from: `whatsapp:+14155238886`,
            to: `whatsapp:+555192913632`
        })
        .then(message => console.log(message.sid));
}
