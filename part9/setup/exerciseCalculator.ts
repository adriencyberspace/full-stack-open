interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface calculateExerciseValues {
  value1: number[];
  value2: number;
}

const parseArguments = (args: Array<string>): calculateExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  const array = JSON.parse(process.argv[2]);

  // NaN is type number so we have to add this logic to throw error if NaN is returned
  if ( Array.isArray(array) && !isNaN(Number(args[3]))) {
    return {
      value1: array,
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not the right types!');
  }

}

const calculateExercises = (dailyExerciseHours: number[], targetHours: number) => {

  const trainingDays = dailyExerciseHours.filter(day => day > 0);
  const periodLength = dailyExerciseHours.length;

  const reducer = (previousValue: number, currentValue: number) => previousValue + currentValue;
  const totalHours = dailyExerciseHours.reduce(reducer);

  const average = totalHours / periodLength;

  const success = average > targetHours;

  const rating = (average: number, targetHours:number): number => {
    if (average < (targetHours * .5)){
      return 1;
    } else if (average > targetHours){
      return 3;
    } else {
      return 2;
    };
  }
  
  const ratingDescription = (average: number, targetHours:number): string => {
    if (average < (targetHours * .5)){
      return "Try harder... :(";
    } else if (average > targetHours){
      return "Wow!!! Great job!";
    } else {
      return "Not bad, but you could do better.";
    };
  }

  const object = {
    periodLength,
    trainingDays: trainingDays.length,
    success,
    rating: rating(average, targetHours),
    ratingDescription: ratingDescription(average, targetHours),
    target: targetHours,
    average
  };

  console.log(object)
}

try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateExercises(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
