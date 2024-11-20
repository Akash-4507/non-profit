const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); 


router.get('/all', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact submissions', error });
  }
});

router.get('/one/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact submission', error });
  }
});

router.post('/add', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newContact = new Contact({
      name,
      email,
      message,
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact submission', error });
  }
});


router.put('/edit/:id', async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // Only update provided fields
      { new: true, runValidators: true } // Return updated document
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact submission', error });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    res.status(200).json({ message: 'Contact submission deleted successfully', deletedContact });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact submission', error });
  }
});

module.exports = router;
