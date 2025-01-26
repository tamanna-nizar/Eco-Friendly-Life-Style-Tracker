// filepath: /c:/Users/kadee/OneDrive/Documents/New folder/routes/energy.js
const express = require('express');
const router = express.Router();
const { calculateEnergyCarbon } = require('../models/energy'); // Adjust the path as necessary
const CarbonFootprint = require('../models/CarbonFootprint'); // Import the CarbonFootprint model

// Calculate the carbon footprint based on user input
router.post('/calculate', async (req, res) => {
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

  // Save the result to the database
  try {
    const carbonFootprint = new CarbonFootprint({
      travel,
      energy,
      water,
      travelCarbon,
      energyCarbon,
      waterCarbon,
      totalCarbon,
    });

    await carbonFootprint.save();

    // Send the result back to the client
    res.json({
      travelCarbon: travelCarbon.toFixed(2),
      energyCarbon: energyCarbon.toFixed(2),
      waterCarbon: waterCarbon.toFixed(2),
      totalCarbon: totalCarbon.toFixed(2),
    });
  } catch (error) {
    console.error('Error saving carbon footprint data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
