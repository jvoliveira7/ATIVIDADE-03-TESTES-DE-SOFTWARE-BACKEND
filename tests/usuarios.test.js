const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

describe("Usuários", () => {
  // Verifica se a rota GET usuarios retorna status 200 e nomes
  test("deve retornar uma lista de usuários", async () => {
    const res = await axios.get(`${api}/usuarios`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  // Verifica se um usuário existente é retornado corretamente pelo id
  test("deve retornar um usuário pelo id", async () => {
    const res = await axios.get(`${api}/usuarios/1`);
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("id");
    expect(res.data).toHaveProperty("nome");
    expect(res.data).toHaveProperty("email");
  });

  // Verifica se a API retorna 404 ao buscar um usuário que não existe
  test("deve retornar 404 para usuário inexistente", async () => {
    try {
      await axios.get(`${api}/usuarios/99999`);
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

  // Verifica se um novo usuário é criado com sucesso e retorna os dados corretos
  test("deve criar um novo usuário", async () => {
    const res = await axios.post(`${api}/usuarios`, {
      nome: "João Silva",
      email: `joao_${Date.now()}@email.com`,
      senha: "123456",
      tipo: "aluno",
    });
    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty("id");
    expect(res.data.nome).toBe("João Silva");
    expect(res.data.tipo).toBe("aluno");
  });

  // Verifica se a API retorna 400 quando o campo nome não é enviado
  test("deve retornar 400 ao criar usuário sem nome", async () => {
    try {
      await axios.post(`${api}/usuarios`, {
        email: "joao@email.com",
        senha: "123456",
        tipo: "aluno",
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  // Verifica se a API retorna 400 quando o campo email não é enviado
  test("deve retornar 400 ao criar usuário sem email", async () => {
    try {
      await axios.post(`${api}/usuarios`, {
        nome: "João Silva",
        senha: "123456",
        tipo: "aluno",
      });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  // Verifica se a API impede cadastro de dois usuários com o mesmo email
  test("deve retornar 400 ao criar usuário com email já cadastrado", async () => {
    const email = `duplicado_${Date.now()}@email.com`;
    await axios.post(`${api}/usuarios`, { nome: "Maria Souza", email, senha: "123456", tipo: "aluno" });

    try {
      await axios.post(`${api}/usuarios`, { nome: "Carlos Lima", email, senha: "abcdef", tipo: "aluno" });
    } catch (err) {
      expect(err.response.status).toBe(400);
    }
  });

  // Cria um usuário e verifica se os dados são atualizados corretamente
  test("deve atualizar os dados de um usuário", async () => {
    const criado = await axios.post(`${api}/usuarios`, {
      nome: "Pedro Antigo",
      email: `pedro_${Date.now()}@email.com`,
      senha: "123456",
      tipo: "aluno",
    });

    const res = await axios.put(`${api}/usuarios/${criado.data.id}`, { nome: "Pedro Novo" });
    expect(res.status).toBe(200);
    expect(res.data.nome).toBe("Pedro Novo");
  });

  // Verifica se a API retorna 404 ao tentar atualizar um usuário inexistente
  test("deve retornar 404 ao atualizar usuário inexistente", async () => {
    try {
      await axios.put(`${api}/usuarios/99999`, { nome: "Ninguém" });
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });

  // cria um usuário e checa se ele é removido com sucesso
  test("deve remover um usuário", async () => {
    const criado = await axios.post(`${api}/usuarios`, {
      nome: "Para Deletar",
      email: `deletar_${Date.now()}@email.com`,
      senha: "123456",
      tipo: "aluno",
    });

    const res = await axios.delete(`${api}/usuarios/${criado.data.id}`);
    expect(res.status).toBe(200);
  });

  // a API tenta checar e retorna 404 ao tentar deletar um usuário inexistente
  test("deve retornar 404 ao deletar usuário inexistente", async () => {
    try {
      await axios.delete(`${api}/usuarios/99999`);
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });
});