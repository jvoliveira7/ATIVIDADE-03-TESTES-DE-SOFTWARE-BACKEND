const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

test('POST /livros cria um livro', async () => {
  const res = await axios.post(`${api}/livros`, { titulo: 'Clean Code', autor: 'Martin Code' });
  expect(res.status).toBe(201);
  expect(res.data.titulo).toBe('Clean Code');

  await axios.delete(`${api}/livros/${res.data.id}`);
});