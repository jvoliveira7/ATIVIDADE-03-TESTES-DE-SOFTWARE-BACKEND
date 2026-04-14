const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;


const USUARIO_ID = 2;
const EMPRESTIMO_ID = 26; 

describe("Multas", () => {
    
    test("deve registrar uma nova multa", async () => {
        const res = await axios.post(`${api}/multas`, {
            usuario_id: USUARIO_ID,
            emprestimo_id: EMPRESTIMO_ID,
            valor: 15.50,
            motivo: "Atraso na devolução"
        });
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");

        // Limpando o banco após o teste
        await axios.delete(`${api}/multas/${res.data.id}`);
    });

    test("deve retornar uma lista de multas", async () => {
        const res = await axios.get(`${api}/multas`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("deve deletar uma multa", async () => {
   
        const postRes = await axios.post(`${api}/multas`, {
            usuario_id: USUARIO_ID,
            emprestimo_id: EMPRESTIMO_ID,
            valor: 10.00
        });

     
        const res = await axios.delete(`${api}/multas/${postRes.data.id}`);
     
        expect(res.status).toBe(200); 
    });

    test("deve retornar 404 ao deletar multa inexistente", async () => {
        try {
            await axios.delete(`${api}/multas/999999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve retornar uma multa pelo id", async () => {
        // Criando a multa
        const postRes = await axios.post(`${api}/multas`, {
            usuario_id: USUARIO_ID,
            emprestimo_id: EMPRESTIMO_ID,
            valor: 20.00
        });

        // Buscando a multa criada
        const res = await axios.get(`${api}/multas/${postRes.data.id}`);
        expect(res.status).toBe(200);
        expect(res.data.id).toBe(postRes.data.id);

        // Limpeza
        await axios.delete(`${api}/multas/${postRes.data.id}`);
    });
    
    test("deve retornar 404 para multa inexistente", async () => {
        try {
            await axios.get(`${api}/multas/999999`);
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve retornar 400 ao registrar multa sem usuario_id", async () => {
        try {
            await axios.post(`${api}/multas`, {
                emprestimo_id: EMPRESTIMO_ID,
                valor: 15.00
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve retornar 400 ao registrar multa sem o valor", async () => {
        try {
            await axios.post(`${api}/multas`, {
                usuario_id: USUARIO_ID,
                emprestimo_id: EMPRESTIMO_ID
            });
        } catch (err) {
            expect(err.response.status).toBe(400);
        }
    });

    test("deve registrar o pagamento de uma multa", async () => {
        // Cria uma multa pendente
        const postRes = await axios.post(`${api}/multas`, {
            usuario_id: USUARIO_ID,
            emprestimo_id: EMPRESTIMO_ID,
            valor: 5.00,
            status: "pendente"
        });

        // Simula a rota de pagamento
        const res = await axios.put(`${api}/multas/${postRes.data.id}/pagamento`, {
            status: "pago"
        });
        expect(res.status).toBe(200);

        // Limpeza
        await axios.delete(`${api}/multas/${postRes.data.id}`);
    });

    test("deve retornar 404 ao pagar multa inexistente", async () => {
        try {
            await axios.put(`${api}/multas/999999/pagamento`, {
                status: "pago"
            });
        } catch (err) {
            expect(err.response.status).toBe(404);
        }
    });

    test("deve listar multas de um usuário específico", async () => {
        // Simula uma rota GET para puxar o histórico de um usuário
        const res = await axios.get(`${api}/multas/usuario/${USUARIO_ID}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });
});