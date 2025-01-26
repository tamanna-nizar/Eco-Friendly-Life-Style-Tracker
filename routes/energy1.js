const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const { calculateEnergyCarbon } = require('./energy1'); // Import the energy calculation function

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Action Schema and Model
const actionSchema = new mongoose.Schema({
  action: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Action = mongoose.model('Action', actionSchema);

// Routes

// Log an eco-action
app.post('/api/eco-action', async (req, res) => {
  const { action, description } = req.body;

  if (!action || !description) {
    return res.status(400).json({ message: 'Action and description are required.' });
  }

  try {
    const newAction = new Action({ action, description });
    await newAction.save();
    res.status(201).json({ message: 'Eco-friendly action logged successfully!' });
  } catch (error) {
    console.error('Error saving action:', error.message);
    res.status(500).json({ message: 'Failed to log action.' });
  }
});

// Fetch all logged actions
app.get('/api/eco-actions', async (req, res) => {
  try {
    const actions = await Action.find().sort({ timestamp: -1 });
    res.status(200).json(actions);
  } catch (error) {
    console.error('Error fetching actions:', error.message);
    res.status(500).json({ message: 'Failed to fetch actions.' });
  }
});

// Calculate the carbon footprint
app.post('/calculate', (req, res) => {
  const { travel, energy, water } = req.body;

  // Validate the input
  if (travel === undefined || energy === undefined || water === undefined) {
    return res.status(400).json({ message: 'Travel, energy, and water values are required.' });
  }

  // Example estimates for carbon footprint
  const travelCarbon = travel * 0.2; // kg CO2 per km
  const waterCarbon = water * 0.05; // kg CO2 per liter

  // Use energy.js to calculate energy-related carbon footprint
  const energyCarbon = calculateEnergyCarbon(energy);

  const totalCarbon = travelCarbon + energyCarbon + waterCarbon;

  // Send the result back to the client
  res.json({
    travelCarbon: travelCarbon.toFixed(2),
    energyCarbon: energyCarbon.toFixed(2),
    waterCarbon: waterCarbon.toFixed(2),
    totalCarbon: totalCarbon.toFixed(2),
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
