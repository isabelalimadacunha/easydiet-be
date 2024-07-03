import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';


const app = express();
const PORT = process.env.PORT || 3000;
const apiKey = YOUR_API_KEY;


app.use(cors({
    origin: 'https://easydiet.vercel.app'
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/generate-meal-plan', async (req, res) => {
   try {
       const { targetCalories, diet, intolerancias } = req.body;


       // Verificar se os dados recebidos estão corretos
       if (!targetCalories) {
           throw new Error('Dados incompletos.');
       }


       console.log('Dados recebidos:', req.body);


       const exclude = intolerancias ? intolerancias.join(',') : '';


       console.log('Chamando a API da Spoonacular...');


       const response = await axios.get(`https://api.spoonacular.com/mealplanner/generate?apiKey=${apiKey}&timeFrame=week&targetCalories=${targetCalories}&diet=${diet}&exclude=${exclude}`);


       const mealPlan = response.data;
       console.log('Dieta gerada:', mealPlan);
       res.json(mealPlan);
   } catch (error) {
       console.error('Erro ao gerar o plano de refeições:', error);
       res.status(500).json({ error: 'Erro ao gerar o plano de refeições' });
   }
});


app.listen(PORT, () => {
   console.log(`Servidor está rodando na porta ${PORT}`);
});


