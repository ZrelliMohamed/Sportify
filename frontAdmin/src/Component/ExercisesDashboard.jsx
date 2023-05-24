
import React, { useState, useEffect } from 'react';
import './ExercisesDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEllipsisV, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ExercisesDashboard = () => {
  const [exercisesData, setExercisesData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [file, setFile] = useState('');
  const [showUpdateWindow, setShowUpdateWindow] = useState(false);
  const [updatedExercise, setUpdatedExercise] = useState({ exercice_name: '', exercice_image: '' });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/exercices')
      .then(response => {
        setExercisesData(response.data);
      })
      .catch(error => {
        console.error('Error retrieving exercises from server:', error);
      });
  }, [toggle]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'mohamed');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dmyit8zek/image/upload',
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleExerciseSubmit = async (values, { resetForm }) => {
    if (selectedExercise) {
      handleExerciseUpdate(values, resetForm);
    } else {
      try {
        const imageUrl = await uploadImage(file);
        values.exercice_image = imageUrl;

        axios.post('http://localhost:3000/exercices', values, {
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => {
            console.log('Exercise added successfully:', response.data);
            resetForm();
            setToggle(!toggle);
          })
          .catch(error => {
            console.error('Error adding exercise:', error);
          });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleExerciseDelete = (exerciseId) => {
    axios.delete(`http://localhost:3000/exercices/${exerciseId}`)
      .then(response => {
        console.log('Exercise deleted successfully:', response.data);
        setToggle(!toggle);
        setExercisesData(exercisesData.filter((exercise) => exercise.exercice_id !== exerciseId));
      })
      .catch(error => {
        console.error('Error deleting exercise:', error);
      });
  };

  const handleExercisePress = (exerciseId) => {
    const exercise = exercisesData.find((exercise) => exercise.exercice_id === exerciseId);
    setUpdatedExercise({
      exercice_name: exercise.exercice_name,
      exercice_image: exercise.exercice_image, // Replace with the correct property name
    });
    setShowUpdateWindow(true);
  };

  const handleExerciseUpdate = async (values, resetForm) => {
    const updatedExerciseData = { ...updatedExercise, ...values };

    try {
      if (file) {
        const imageUrl = await uploadImage(file);
        updatedExerciseData.exercice_image = imageUrl;
      }

      if (selectedExercise && selectedExercise.exercice_id) {
        axios.put(`http://localhost:3000/exercices/${selectedExercise.exercice_id}`, updatedExerciseData, {
          headers: { 'Content-Type': 'application/json' }
        })
          .then(response => {
            console.log('Exercise updated successfully:', response.data);
            const updatedExercises = exercisesData.map(exercise =>
              exercise.exercice_id === selectedExercise.exercice_id ? response.data : exercise
            );
            setExercisesData(updatedExercises);
            resetForm();
            setToggle(!toggle);
            setSelectedExercise(null);
            setShowUpdateWindow(false);
          })
          .catch(error => {
            console.error('Error updating exercise:', error);
          });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleDropdownToggle = (exerciseId) => {
    setShowDropdown(showDropdown === exerciseId ? null : exerciseId);
  };

  const renderDropdownMenu = (exerciseId) => {
    if (showDropdown === exerciseId) {
      return (
        <div className="dropdownMenu">
          <button onClick={() => handleExerciseDelete(exerciseId)}>
            <FontAwesomeIcon icon={faTrash} />
            Remove
          </button>
          <button onClick={() => handleExercisePress(exerciseId)}>
            <FontAwesomeIcon icon={faEdit} />
            Update
          </button>
        </div>
      );
    }
    return null;
  };

  const closeUpdateWindow = () => {
    setShowUpdateWindow(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredExercises = exercisesData.filter((exercise) =>
    exercise.exercice_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="searchContainer">
      <div className="container_ADD">
        <input
          className="searchInput"
          type="text"
          placeholder="Search exercises"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <form className="formContainer" onSubmit={handleExerciseSubmit}>
        <h2>Add Exercise</h2>
        <input
          className="inputField"
          placeholder="Name"
          onChange={(e) => setSelectedExercise({ ...selectedExercise, exercice_name: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="submitButton" type="submit">Add Exercise</button>
      </form>

      {showUpdateWindow && (
        <div className="updateWindow">
          <div className="updateFrame">
            <button className="closeButton" onClick={closeUpdateWindow}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h2>Update Exercise</h2>
            <input
              className="inputField"
              placeholder="Name"
              value={updatedExercise.exercice_name}
              onChange={(e) => setUpdatedExercise({ ...updatedExercise, exercice_name: e.target.value })}
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button className="updateButton" type="submit" onClick={() => handleExerciseUpdate(updatedExercise)}>
              Update Exercise
            </button>
          </div>
        </div>
      )}

      <ul>
        {filteredExercises.map((exercise) => (
          <li key={exercise.exercice_id}>
            <div className="cardContainer">
              <div className="card">
                <div className="cardInfo">
                  <div className="cardImageContainer">
                    <img src={exercise.exercice_image} alt={exercise.exercice_name} className="cardImage" />
                  </div>
                  <div>
                    <h3 className="cardTitle" title={exercise.exercice_name}>
                      <div>{exercise.exercice_name}</div>
                      <div>{exercise.exercice_description}</div>
                    </h3>
                  </div>
                </div>
                <div className="buttonContainer">
                  <button onClick={() => handleDropdownToggle(exercise.exercice_id)} className="dropdownButton">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </button>
                  {renderDropdownMenu(exercise.exercice_id)}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExercisesDashboard;

