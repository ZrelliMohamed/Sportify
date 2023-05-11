import { Accelerometer } from 'expo-sensors';
import { useEffect, useState } from 'react';

const StepTracker = () => {
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    let subscription;
    let lastY = 0;
    let isMoving = false;
    let stepCount = 0;

    const calculateCalories = () => {
      const MET = 3.5; // Metabolic Equivalent of Task
      const weight = 70; // User's weight in kilograms
      const strideLength = 0.76; // Average stride length in meters
      const distance = (stepCount * strideLength) / 1000; // Distance in kilometers
      const duration = stepCount * 0.5; // Duration in minutes (assuming 2 steps per second)

      // Calorie Burned (kcal) = MET * T (hours) * weight (kg)
      const caloriesBurned = MET * (duration / 60) * weight;

      setCalories(caloriesBurned.toFixed(2));
    };

    const handleAccelerometerData = ({ x, y, z }) => {
      const acceleration = Math.abs(x + y + z - lastY);

      if (acceleration > 1.5) {
        if (!isMoving) {
          isMoving = true;
        }
      } else if (isMoving) {
        isMoving = false;
        stepCount += 1;
        setSteps(stepCount);
        calculateCalories();
      }

      lastY = x + y + z;
    };

    const startTracking = async () => {
      try {
        await Accelerometer.setUpdateInterval(100); // Update interval in milliseconds
        subscription = Accelerometer.addListener(handleAccelerometerData);
      } catch (error) {
        console.log('Error starting accelerometer tracking:', error);
      }
    };

    const stopTracking = () => {
      if (subscription) {
        subscription.remove();
      }
    };

    startTracking();

    return () => {
      stopTracking();
    };
  }, []);

  return { steps, calories };
};

export default StepTracker;
