const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight/((height*height)/100))*100;

  if (bmi < 18.5){
    return "Underweight (unhealthy weight)";
  } else if (bmi >= 18.5 && bmi < 24.9){
    return "Normal (healthy weight)";
  } else if (bmi >= 24.9 && bmi < 29.9){
    return "Overweight (unhealthy weight)";
  } else {
    return "Obese (unhealthy weight)";
  };
};

console.log(calculateBmi(180, 50));