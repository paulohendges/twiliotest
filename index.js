const client = require('twilio')(
    'ACd73bb4fef1b43626e8872a211e77d0ad',
    'ca6573dcf09325553e7b268b2de65a51'
);
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
    const body = req.body.Body.toLowerCase();

    console.log(req.body);
    console.log(req.headers);

    switch (true) {
        case /^(oi|olá|bom dia|boa tarde|boa noite)$/.test(body):
            messageToSend = 'Olá, em que posso ajudar ?';
            break;
        case /produto/.test(body):
            messageToSend = 'Olá, qual produto deseja informações ?';
            break;
        case /^(cartão de crédito|cartao de credito|cartao|cartão)$/.test(body):
            messageToSend = 'Qual o assunto relacionado ao cartão ?';
            break;
        case /^(saldo da fatura|saldo fatura|fatura)$/.test(body):
            messageToSend = 'O valor atual da sua fatura é: R$ 1000.00';
            break;
        case /^(encerrar|encerrar atendimento|tchau)$/.test(body):
            messageToSend = 'Obrigado por nos contatar';
            break;
    }

    sendMessage(messageToSend);
    res.send('OK');
});
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

function sendMessage(messageToSend) {
    client.messages.create({
        body: messageToSend,
        from: `whatsapp:+14155238886`,
        to: `whatsapp:+555192913632`
    }).then(message => console.log(message.sid));
}
