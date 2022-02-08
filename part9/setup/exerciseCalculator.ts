interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyExerciseHours: number[], targetHours: number): Result => {

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

  return object;
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1] , 1))