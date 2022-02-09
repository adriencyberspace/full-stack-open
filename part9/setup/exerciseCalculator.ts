// Output
interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

// Arguments
interface calculateExerciseValues {
  value1: number[];
  value2: number;
}

// Throw errors if arguments are incorrect format
const parseArguments = (args: Array<string>): calculateExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  // Parse array argument from string to array. Throw error if it can't be parsed.
  let array;
  try {
    array = JSON.parse(process.argv[2]);
  } catch (e) {
    throw new Error('First argument must be an array.');
  }

  // NaN is type number so we have to add this logic to throw error if NaN is returned
  if ( Array.isArray(array) && !isNaN(Number(args[3]))) {
    return {
      value1: array,
      value2: Number(args[3])
    }
  } else {
    throw new Error('Second argument must be a number.');
  }
}

// Input command line arguments, output object with all data
const calculateExercises = (dailyExerciseHours: number[], targetHours: number) => {

  // Training days are all non-zero days.
  const trainingDays = dailyExerciseHours.filter(day => day > 0);
  const periodLength = dailyExerciseHours.length;

  // Count all exercise hours, then find average
  const reducer = (previousValue: number, currentValue: number) => previousValue + currentValue;
  const totalHours = dailyExerciseHours.reduce(reducer);
  const average = totalHours / periodLength;

  // Success is when user averaged more than their target goal
  const success = average > targetHours;

  // Simple rating system. <50% of targetHours = 1, 50-100% = 2, 100%+ = 3
  // TODO: DRY code would be to group the two rating functions to output an object
  const rating = (average: number, targetHours:number): number => {
    if (average < (targetHours * .5)){
      return 1;
    } else if (average > targetHours){
      return 3;
    } else {
      return 2;
    }
  }
  
  const ratingDescription = (average: number, targetHours:number): string => {
    if (average < (targetHours * .5)){
      return "Try harder... :(";
    } else if (average > targetHours){
      return "Wow!!! Great job!";
    } else {
      return "Not bad, but you could do better.";
    }
  }

  const object = {
    periodLength,
    trainingDays: trainingDays.length,
    success,
    rating: rating(average, targetHours),
    ratingDescription: ratingDescription(average, targetHours),
    target: targetHours,
    average
  }

  console.log(object)
}

// Run function unless arguments throw errors
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
