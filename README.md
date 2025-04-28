# WhatsApp Personalized Blast Tool

Send personalized WhatsApp messages for free using your real WhatsApp account.

## Requirements
- Node.js installed (v16 or later)
- WhatsApp account

## Installation
```bash
npm install
```

## Running
```bash
npm start
```

- A QR Code will appear in the terminal.
- Scan the QR code using WhatsApp on your phone.
- Open `http://localhost:3000` in your browser.
- Upload a CSV file with the following columns: `name`, `number`, `message`.
- Each contact will receive their specific message.

## Important
- Numbers must be Malaysian format (start with 60, no spaces or dashes).
- Random 2–5 second delay added between sends to avoid account restrictions.
