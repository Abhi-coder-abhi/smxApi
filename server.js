const express = require('express');
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createOTAHotelResNotifRQ } = require('./utils/otaMessageBuilder');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Basic Authentication
app.use(basicAuth({
    users: { 'testuser': 'testpassword' },
    challenge: true
}));

// Generate a unique Hotel Code
function generateUniqueHotelCode() {
    const prefix = 'HOTEL';
    const uniqueString = crypto.randomBytes(4).toString('hex').toUpperCase();
    return `${prefix}${uniqueString}`;
}

const hotelCode = generateUniqueHotelCode();

// Endpoint to receive reservation notifications
app.post('/api/reservation', (req, res) => {
    const reservationData = req.body;

    // Log the received reservation data
    const message = createOTAHotelResNotifRQ(reservationData);
    res.status(200).json({
        message: 'OTA_HotelResNotifRQ received successfully.',
        generatedMessage: message
    });

});

// HTTPS options with the self-signed certificate for testing purposes
const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
};

// Create HTTPS server
https.createServer(httpsOptions, app).listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
    console.log(`Generated Hotel Code: ${hotelCode}`);
});
