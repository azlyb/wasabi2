const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const fileUpload = require('express-fileupload');
const csv = require('csvtojson');
const path = require('path');

const app = express();
const client = new Client();
const PORT = process.env.PORT || 3000;

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp client is ready!');
});

client.initialize();

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload', async (req, res) => {
    if (!req.files || !req.files.contacts) {
        return res.status(400).send('No file uploaded.');
    }
    const csvData = req.files.contacts.data.toString('utf8');
    const prospects = await csv().fromString(csvData);

    for (const prospect of prospects) {
        let number = prospect.number.replace(/\D/g, '');
        let message = prospect.message || '';
        if (!number.startsWith('60') || message.trim() === '') {
            console.log(`Skipping invalid entry: ${number}`);
            continue;
        }
        const chatId = number + "@c.us";
        try {
            await client.sendMessage(chatId, message);
            console.log(`Sent message to ${number}`);
        } catch (error) {
            console.error(`Failed to send message to ${number}:`, error);
        }
        const delay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
        await sleep(delay);
    }

    res.send('Messages sent!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
