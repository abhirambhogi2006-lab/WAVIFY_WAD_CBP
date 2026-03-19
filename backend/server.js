const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/spotifyClone')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err));

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    playlists: [
        {
            name: String,
            songs: Array
        }
    ]
});

const User = mongoose.model('User', userSchema);

// Sign up
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'All fields required.' });
    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ error: 'Username already exists.' });
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashed, playlists: [] });
    res.json({ message: 'Account created.', username });
});

// Log in
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid username or password.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid username or password.' });
    res.json({ message: 'Login successful.', username });
});

// Get playlists
app.get('/playlists/:username', async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json({ playlists: user.playlists });
});

// Save playlists
app.post('/playlists/:username', async (req, res) => {
    const { playlists } = req.body;
    await User.updateOne({ username: req.params.username }, { $set: { playlists } });
    res.json({ message: 'Playlists saved.' });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
