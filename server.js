// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors()); // Allow all origins
app.use(bodyParser.json()); // For parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // Optional: For parsing URL-encoded data

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Define your API routes here
app.get('/api/your-endpoint', (req, res) => {
    // Your endpoint logic here
    res.json({ message: 'Hello, world!' });
});

// Serve React app on all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
