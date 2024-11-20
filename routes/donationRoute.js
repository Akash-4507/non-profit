const express = require('express');
const router = express.Router();
const Donation = require('../models/donation'); 
router.get('/all', async (req, res) => {
  try {
    const donations = await Donation.find().populate('donor', 'name email'); 
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations', error });
  }
});


router.get('/one/:id', async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('donor', 'name email');
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donation', error });
  }
});


router.post('/add', async (req, res) => {
  const { donor, name, email, amount, message } = req.body;

 
  if (!name || !email || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newDonation = new Donation({
      donor, 
      name,
      email,
      amount,
      message,
    });

    const savedDonation = await newDonation.save();
    res.status(201).json(savedDonation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating donation', error });
  }
});

router.put('/edit/:id', async (req, res) => {
  try {
    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, 
      { new: true, runValidators: true } 
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json(updatedDonation);
  } catch (error) {
    res.status(500).json({ message: 'Error updating donation', error });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedDonation = await Donation.findByIdAndDelete(req.params.id);

    if (!deletedDonation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json({ message: 'Donation deleted successfully', deletedDonation });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting donation', error });
  }
});

module.exports = router;
