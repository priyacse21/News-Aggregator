const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).send({ message: 'All fields are required' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).send(user);
  } catch (err) {
    if (err.code === 11000) { // Duplicate key error (unique constraint violation)
      res.status(409).send({ message: 'User already exists' });
    } else {
      res.status(400).send({ message: 'Signup failed', error: err });
    }
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({ message: 'Invalid password' });
  }
  res.send({ message: 'Login successful' });
});

mongoose.connect('mongodb+srv://priyakaruppasamy2003:priya@cluster0.4vkjs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
})
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});
