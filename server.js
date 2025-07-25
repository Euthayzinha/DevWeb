// 1. Importar as bibliotecas necessárias
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');


// 2. Configurar o servidor Express
const app = express();
app.use(cors()); 
app.use(express.json()); 

// Pega a chave da API do arquivo .env
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

// 3. Criar o endpoint /api/chat
app.post('/api/chat', async (req, res) => {
    try {
        const { historicoChat } = req.body; 

        if (!historicoChat) {
            return res.status(400).json({ error: 'O histórico do chat é obrigatório.' });
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    
        const payload = {
            contents: historicoChat,
            systemInstruction: {
                parts: [{
                    // Esta é a instrução do sistema que define o comportamento da IA
                    text: "Você é 'SofIA', um assistente virtual amigável, engraçado e com uma inteligência extrema da 'Escola de Tecnologia Futuro'. Responda sempre em Português do Brasil de forma concisa e útil."
                }]
            }
        };

        const geminiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!geminiResponse.ok) {
            // Se der erro na API do Google, vamos ver o que ela respondeu
            const errorBody = await geminiResponse.text();
            console.error("Erro da API do Gemini:", errorBody);
            throw new Error(`Erro na API externa: ${geminiResponse.statusText}`);
        }

        const result = await geminiResponse.json();
        
        // Verificação de segurança para garantir que a resposta existe
        if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts.length > 0) {
            const respostaIA = result.candidates[0].content.parts[0].text;
            // Devolve a resposta para o front-end
            res.json({ resposta: respostaIA });
        } else {
             // Caso a API retorne uma resposta vazia ou bloqueada
            console.error("Resposta inválida ou bloqueada da API:", result);
            res.json({ resposta: "Não consegui gerar uma resposta no momento. Pode ter ocorrido um bloqueio de segurança." });
        }

    } catch (error) {
        console.error("Erro no backend:", error);
        res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
    }
});

// 4. Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});