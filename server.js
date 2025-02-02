// Import necessary modules
const express = require('express');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

// Create an Express app
const app = express();

// Set up file upload destination and file type filter
const upload = multer({
    dest: 'uploads/', // Save files in the 'uploads' folder
    fileFilter: (req, file, cb) => {
        // Accept only .mp3 files
        const allowedTypes = /mp3/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true); // File is allowed
        } else {
            cb(new Error('Only .mp3 files are allowed!'), false); // Reject file
        }
    },
});

// Serve static files (e.g., uploaded audio files)
app.use('/uploads', express.static('uploads'));

// API key for DeepAI Vocal Remover (replace with your actual key)
const apiKey = "d4a41674-7e9f-45c5-934b-21469fbe3704"; // Replace with your actual API key

// Function to remove vocals from a song
async function removeVocals(filePath) {
    try {
        const response = await axios.post(
            "https://api.deepai.org/api/vocal-remover",
            { file: fs.createReadStream(filePath) },
            { headers: { "api-key": apiKey } }
        );
        console.log("Karaoke track URL:", response.data.output_url);
        return response.data.output_url; // URL of the karaoke version of the song
    } catch (error) {
        console.error("Error:", error);
        throw error; // Rethrow the error to handle it later
    }
}

// Endpoint for handling file upload and vocal separation
app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;

    try {
        // Call the removeVocals function to process the uploaded song
        const karaokeUrl = await removeVocals(filePath);
        // Send the result (karaoke version URL) back to the client
        res.status(200).json({ fileUrl: karaokeUrl });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to process vocal removal" });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
