const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint for the API task
app.post('/api/process', (req, res) => {
  const inputData = req.body.data;

  // Validate that data is an array
  if (!Array.isArray(inputData)) {
    return res.status(400).json({ error: 'Invalid input. "data" should be an array.' });
  }

  // Initialize arrays for processed data
  const evenNumbers = [];
  const oddNumbers = [];
  const alphabets = [];

  // Process each element in the input array
  inputData.forEach(item => {
    // Check if the item is a number (as a string)
    if (!isNaN(item)) {
      const num = Number(item);
      // Determine even or odd
      if (num % 2 === 0) {
        evenNumbers.push(item);
      } else {
        oddNumbers.push(item);
      }
    } else if (typeof item === 'string') {
      // Check if the item consists only of alphabets using a regex
      if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      }
    }
  });

  // Construct the response object with static values for demonstration
  const response = {
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    odd_numbers: oddNumbers,
    even_numbers: evenNumbers,
    alphabets: alphabets
  };

  res.json(response);
});

// Start the server on a specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
