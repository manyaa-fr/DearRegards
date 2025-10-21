// file: backend/routes/api.js (updated)

const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
if (!process.env.GEMINI_API_KEY) {
  console.error('CRITICAL: GEMINI_API_KEY is not set in the .env file.');
}

/**
 * @route POST /api/convert-email
 * @desc Converts an email with user-specified tone and word limit.
 * @access Public
 */
router.post('/convert-email', async (req, res) => {
  const { angryEmail, tone, wordLimit } = req.body;

  if (!angryEmail || !tone || !wordLimit) {
    return res.status(400).json({ error: 'Bad Request: Missing required fields (angryEmail, tone, wordLimit).' });
  }

  if (!genAI) {
    return res.status(503).json({ error: 'AI service is unavailable.' });
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  // Prompt Engineering to get both a subject and a body from the AI
  const prompt = `You are an AI email tone converter. Your task is to transform the following "angry" email into a "${tone}" and professional one. Ensure the output is approximately ${wordLimit} words long.

  The output must be a single, well-structured JSON object. Do not include any additional text or markdown outside of the JSON.

  Input Email (Angry Tone):
  ---
  ${angryEmail}
  ---

  Output Structure (JSON):
  {
    "convertedSubject": "A polite and professional subject line for the converted email.",
    "convertedBody": "The professionally rephrased email.",
    "toneChange": "A brief summary of the tone shift (e.g., 'From aggressive to collaborative' or 'From rude to friendly')."
  }

  Ensure the converted email is respectful, clear, and maintains the original intent of the message but with a polite tone.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = text.replace(/```json\n|```/g, '').trim();
    const parsedResponse = JSON.parse(cleanedText);

    // Combine the subject and body for the frontend display
    const combinedResponse = {
      convertedEmail: parsedResponse.convertedBody,
      convertedSubject: parsedResponse.convertedSubject,
      toneChange: parsedResponse.toneChange
    };

    // Send the combined response to the frontend
    res.status(200).json(combinedResponse);
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    res.status(500).json({
      error: 'Internal Server Error: Could not process the email conversion.',
      details: error.message,
    });
  }
});

/**
 * @route GET /api/conversions
 * @desc Get conversion history (now returns empty array since no user system)
 * @access Public
 */
router.get('/conversions', async (req, res) => {
  try {
    // Return empty array since we removed user authentication
    res.status(200).json([]);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Server Error: Could not retrieve conversion history.' });
  }
});

module.exports = router;