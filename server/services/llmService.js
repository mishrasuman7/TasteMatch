import axios from 'axios';

export const getLLMResponse = async (userInput) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a cultural assistant recommending food, music, and travel.' },
          { role: 'user', content: userInput }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('LLM error:', error.message);
    return null;
  }
};
