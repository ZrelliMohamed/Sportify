const Data = {
  name: 'John Doe',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  statistics: {
    weight: 75,
    height: 180,
    bmi: 23.1,
    fat: 15.2,
    muscle: 40.3,
  },
  program: [
    {
      day: 'Monday',
      exercises: [
        { name: 'Squats', sets: 3, reps: 10 },
        { name: 'Lunges', sets: 3, reps: 10 },
        { name: 'Leg Press', sets: 3, reps: 10 },
      ],
    },
    {
      day: 'Tuesday',
      exercises: [
        { name: 'Bench Press', sets: 3, reps: 10 },
        { name: 'Dumbbell Flyes', sets: 3, reps: 10 },
        { name: 'Push Ups', sets: 3, reps: 10 },
      ],
    },
    {
      day: 'Wednesday',
      exercises: [
        { name: 'Pull Ups', sets: 3, reps: 10 },
        { name: 'Barbell Rows', sets: 3, reps: 10 },
        { name: 'Bicep Curls', sets: 3, reps: 10 },
      ],
    },
    {
      day: 'Thursday',
      exercises: [
        { name: 'Shoulder Press', sets: 3, reps: 10 },
        { name: 'Lateral Raises', sets: 3, reps: 10 },
        { name: 'Front Raises', sets: 3, reps: 10 },
      ],
    },
    {
      day: 'Friday',
      exercises: [
        { name: 'Crunches', sets: 3, reps: 10 },
        { name: 'Plank', sets: 3, reps: 30 },
        { name: 'Leg Raises', sets: 3, reps: 10 },
      ],
    },
    {
      day: 'Saturday',
      exercises: [{ name: 'Rest', sets: '-', reps: '-' }],
    },
    {
      day: 'Sunday',
      exercises: [{ name:'Rest', sets:'-', reps:'-'}],
    }
   ],
};
export default Data;