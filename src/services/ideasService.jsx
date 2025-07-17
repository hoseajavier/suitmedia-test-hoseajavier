import axios from 'axios';

const BASE_URL = 'https://suitmedia-backend.suitdev.com';

export const fetchIdeas = async ({ page = 1, size = 10, sort = '-published_at' }) => {
  const response = await axios.get(`${BASE_URL}/api/ideas`, {
    params: {
      'page[number]': page,
      'page[size]': size,
      append: ['small_image', 'medium_image'],
      sort,
    },
  });
  return response;
};
