// routes/formRoutes.js
const express = require('express');
const router = express.Router();
const Form = require('/models/Form');
const multer = require('multer');

// Multer setup for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Submit form data
router.post('/submit', upload.single('image'), async (req, res) => {
  try {
    const { name, rating, description } = req.body;
    if (!name || !rating || !description) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Generate an image for the first letter of the name
    const firstLetter = name.charAt(0).toUpperCase();
    const imageUrl = `/images/${firstLetter}.png`; // Path to your image logic

    const form = new Form({
      image: imageUrl,
      rating,
      description,
      name,
    });

    await form.save();
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error during form submission:', error);
    res.status(500).json({ error: 'Failed to submit the form. Please try again later.' });
  }
});

// Delete form data (admin only)
router.delete('/delete/:id', async (req, res) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).json({ error: 'Form not found.' });
    }
    res.status(200).json({ message: 'Form deleted successfully!' });
  } catch (error) {
    console.error('Error during form deletion:', error);
    res.status(500).json({ error: 'Failed to delete the form. Please try again later.' });
  }
});

module.exports = router;
