const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/cruddb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Define the ServiceRequest model
const ServiceRequest = mongoose.model('ServiceRequest', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
}));

// API routes for CRUD operations
app.get('/api/service-requests', async (req, res) => {
  try {
    const requests = await ServiceRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).send("Error fetching data.");
  }
});

app.post('/api/service-requests', async (req, res) => {
  const { name, description } = req.body;
  const newRequest = new ServiceRequest({ name, description });
  
  try {
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).send("Error saving data.");
  }
});

app.put('/api/service-requests/:id', async (req, res) => {
  const { name, description } = req.body;
  try {
    const updatedRequest = await ServiceRequest.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    res.json(updatedRequest);
  } catch (err) {
    res.status(500).send("Error updating data.");
  }
});

app.delete('/api/service-requests/:id', async (req, res) => {
  try {
    await ServiceRequest.findByIdAndDelete(req.params.id);
    res.send('Service request deleted');
  } catch (err) {
    res.status(500).send("Error deleting data.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
