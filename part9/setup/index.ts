import express from 'express';
const app = express();
import calculateBmiWithReturn from './bmiCalculatorReturn';

app.get('/hello', (_req, res) => {
  res.send('Hello World');
});

app.get('/bmi', function userIdHandler (req, res) {
  // URL query parameters
  const weight = req.query.weight;
  const height = req.query.height;


  // If height and weight are not numbers, throw error
  const validQueryParams: boolean = !isNaN(Number(height)) && !isNaN(Number(weight));
  if (!validQueryParams) {
    res.send({
      error: "malformatted parameters"
    });
  } else if (!height) {
    res.send({
      error: "missing height parameter"
    });
  } else if (!weight) {
    res.send({
      error: "missing weight parameter"
    });
  }

  // Imported BMI calculator function
  const bmi = calculateBmiWithReturn(Number(height), Number(weight));
  req.query.bmi = String(bmi);

  res.send({ height, weight, bmi });
});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});