// filepath: /c:/Users/kadee/OneDrive/Documents/New folder/models/CarbonFootprint.js
const mongoose = require('mongoose');

const carbonFootprintSchema = new mongoose.Schema({
  travel: { type: Number, required: true },
  energy: { type: Number, required: true },
  water: { type: Number, required: true },
  travelCarbon: { type: Number, required: true },
  energyCarbon: { type: Number, required: true },
  waterCarbon: { type: Number, required: true },
  totalCarbon: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const CarbonFootprint = mongoose.model('CarbonFootprint', carbonFootprintSchema);

module.exports = CarbonFootprint;