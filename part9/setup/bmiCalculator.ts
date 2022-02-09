// Command line arguments
interface bmiInputValues {
  value1: number;
  value2: number;
}

// Check for errors
const parseBmiArguments = (args: Array<string>): bmiInputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  // NaN is type number so we have to add this logic to throw error if NaN is returned
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number) => {
  const bmi = (weight/((height*height)/100))*100;

  if (bmi < 18.5){
    console.log("Underweight (unhealthy weight)");
  } else if (bmi >= 18.5 && bmi < 24.9){
    console.log("Normal (healthy weight)");
  } else if (bmi >= 24.9 && bmi < 29.9){
    console.log("Overweight (unhealthy weight)");
  } else {
    console.log("Obese (unhealthy weight)");
  }
}

try {
  const { value1, value2 } = parseBmiArguments(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}