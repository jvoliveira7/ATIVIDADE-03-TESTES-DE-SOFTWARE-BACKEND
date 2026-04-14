const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;


const LIVRO_ID = 1;
const USUARIO_ID = 2;

describe("Empréstimos", () => {
    test("deve registrar um novo empréstimo", async () => {
        const res = await axios.post(`${api}/emprestimos`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01",
        });
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");

        // Limpeza
        await axios.delete(`${api}/emprestimos/${res.data.id}`);
    });

    test("deve retornar uma lista de empréstimos", async () => {
        const res = await axios.get(`${api}/emprestimos`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("deve deletar um empréstimo", async () => {
        // Criando para poder deletar
        const postRes = await axios.post(`${api}/emprestimos`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01",
        });

        // Deletando
        const res = await axios.delete(`${api}/emprestimos/${postRes.data.id}`);
        expect(res.status).toBe(200); // ou 204, dependendo de como está no seu controller
    });

    test("deve retornar 404 ao deletar empréstimo inexistente", async () => {
        try {
            await axios.delete(`${api}/emprestimos/999999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve retornar um empréstimo pelo id", async () => {
        // Criando
        const postRes = await axios.post(`${api}/emprestimos`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01",
        });

        // Buscando pelo ID
        const res = await axios.get(`${api}/emprestimos/${postRes.data.id}`);
        expect(res.status).toBe(200);
        expect(res.data.id).toBe(postRes.data.id);

        // Limpeza
        await axios.delete(`${api}/emprestimos/${postRes.data.id}`);
    });
    
    test("deve retornar 404 para empréstimo inexistente", async () => {
        try {
            await axios.get(`${api}/emprestimos/999999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem livro_id", async () => {
        try {
            await axios.post(`${api}/emprestimos`, {
                usuario_id: USUARIO_ID,
                data_devolucao_prevista: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem usuario_id", async () => {
        try {
            await axios.post(`${api}/emprestimos`, {
                livro_id: LIVRO_ID,
                data_devolucao_prevista: "2025-05-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve retornar 400 ao registrar empréstimo sem data de devolução", async () => {
        try {
            await axios.post(`${api}/emprestimos`, {
                livro_id: LIVRO_ID,
                usuario_id: USUARIO_ID,
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve registrar a devolução de um empréstimo", async () => {
      
        const postRes = await axios.post(`${api}/emprestimos`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01",
        });

        // Simulando a rota de devolução
        const res = await axios.put(`${api}/emprestimos/${postRes.data.id}/devolucao`, {
            data_devolucao: "2025-04-15"
        });
        expect(res.status).toBe(200);

        // Limpeza
        await axios.delete(`${api}/emprestimos/${postRes.data.id}`);
    });

    test("deve retornar 404 ao devolver empréstimo inexistente", async () => {
        try {
            await axios.put(`${api}/emprestimos/999999/devolucao`, {
                data_devolucao: "2025-04-15"
            });
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve listar empréstimos de um usuário específico", async () => {
        const res = await axios.get(`${api}/emprestimos/usuario/${USUARIO_ID}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("deve retornar 400 ao emprestar livro já emprestado", async () => {
      
        const postRes1 = await axios.post(`${api}/emprestimos`, {
            livro_id: LIVRO_ID,
            usuario_id: USUARIO_ID,
            data_devolucao_prevista: "2025-05-01",
        });

        
        try {
            await axios.post(`${api}/emprestimos`, {
                livro_id: LIVRO_ID, // O mesmo livro_id
                usuario_id: USUARIO_ID, 
                data_devolucao_prevista: "2025-06-01",
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }

        // Limpeza do primeiro empréstimo
        await axios.delete(`${api}/emprestimos/${postRes1.data.id}`);
    });
});