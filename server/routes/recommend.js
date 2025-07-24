const express = require('express');
import { getLLMResponse } from '../services/llmService.js';
import { getQlooRecommendations } from '../services/qlooService.js';


const router = express.Router();

router.post('/', async (req, res) => {
  const { input, category } = req.body;
  const llmText = await getLLMResponse(input);
  const qlooData = await getQlooRecommendations(category, input);
  res.json({ message: llmText, recommendations: qlooData });
});

module.exports = router;
