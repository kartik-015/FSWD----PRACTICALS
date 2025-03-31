const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
app.use((req, res, next) => {
    const logEntry = `${new Date().toISOString()} - IP: ${req.ip}\n`;
    fs.appendFile('visits.log', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
    next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/logs', (req, res) => {
    fs.readFile('visits.log', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Could not read log file' });
        }
        const logs = data.trim().split('\n').map(entry => {
            const [timestamp, ip] = entry.split(' - IP: ');
            return { timestamp, ip };
        });
        res.json(logs);
    });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
