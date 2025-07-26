import axios from 'axios';

export const getRecommendations = async (input, category) => {
  const res = await axios.post('http://localhost:5000/api/recommend', { input, category });
  return res.data;
};
