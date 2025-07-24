import axios from 'axios';

export const getQlooRecommendations = async (category, input) => {
  try {
    const res = await axios.post(
      `https://api.qloo.com/${category}/recommendations`,
      {
        input: [input],
        size: 5
      },
      {
        headers: {
          'x-api-key': process.env.QLOO_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error('Qloo error:', error.message);
    return null;
  }
};
