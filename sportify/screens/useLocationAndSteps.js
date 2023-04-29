
// Import React and React Native components
import React, { useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';

// Import the react-native-pedometer library
import Pedometer from 'react-native-pedometer';

// Import the react-native-geolocation-service library
import Geolocation from 'react-native-geolocation-service';

// Define a custom hook to get the user's location and steps
const useLocationAndSteps = () => {
  // Define the state variables for the location and steps
  const [location, setLocation] = useState(null);
  const [steps, setSteps] = useState(0);

  // Define a helper function to request the location permission
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // Define a helper function to get the current location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  // Define a helper function to get the current steps
  const getCurrentSteps = () => {
    Pedometer.startPedometerUpdatesFromDate(new Date().getTime(), (data) => {
      setSteps(data.steps);
    });
  };

  // Use the useEffect hook to run the functions once when the component mounts
  useEffect(() => {
    // Check and request the location permission
    requestLocationPermission().then((granted) => {
      if (granted) {
        // Get the current location and steps
        getCurrentLocation();
        getCurrentSteps();
      } else {
        console.log('Location permission denied');
      }
    });
  }, []);

  // Return the location and steps as an object
  return { location, steps };
};

// Export the custom hook
export default useLocationAndSteps;
