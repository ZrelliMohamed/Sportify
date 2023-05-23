
// import React, { useState, useEffect } from 'react';
// import { Formik } from 'formik';
// import axios from 'axios';

// const CoachesDashboard = () => {
//   const [coachesData, setCoachesData] = useState([]);
//   const [toggle, setToggle] = useState(false);
//   const [selectedCoach, setSelectedCoach] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:3000/users/coaches')
//       .then(response => response.json())
//       .then(data => {
//         setCoachesData(data.coaches);
//       })
//       .catch(error => {
//         console.error('Error retrieving coaches from server:', error);
//       });
//   }, [toggle]);

//   const uploadImage = async (file) => {
//     const form = new FormData();
//     form.append('file', file);
//     form.append('upload_preset', 'mohamed');

//     try {
//       const response = await axios.post(
//         'https://api.cloudinary.com/v1_1/dmyit8zek/image/upload',
//         form
//       );
//       return response.data.secure_url;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleCoachSubmit = async (values, { resetForm }) => {
//     const { user_img, ...coachData } = values;

//     const uploadedImageUrl = await uploadImage(selectedFile);
//     const coachDataWithImage = {
//       ...coachData,
//       user_img: uploadedImageUrl
//     };

//     fetch('http://localhost:3000/coaches', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(coachDataWithImage)
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Coach added successfully:', data);
//         resetForm();
//         setToggle(!toggle);
//       })
//       .catch(error => {
//         console.error('Error adding coach:', error);
//       });
//   };

//   const handleCoachDelete = (coachId) => {
//     fetch(`http://localhost:3000/coaches/${coachId}`, {
//       method: 'DELETE'
//     })
//       .then(response => response.text())
//       .then(data => {
//         console.log('Coach deleted successfully:', data);
//         setToggle(!toggle);
//         setCoachesData(coachesData.filter(coach => coach.User_Id !== coachId));
//       })
//       .catch(error => {
//         console.error('Error deleting coach:', error);
//       });
//   };

//   const handleCoachPress = (coachId) => {
//     const coach = coachesData.find(coach => coach.User_Id === coachId);
//     setSelectedCoach(coach);
//   };

//   const handleCoachUpdate = (values) => {
//     const updatedCoach = { ...selectedCoach, ...values };
//     const updatedCoaches = coachesData.map(coach =>
//       coach.User_Id === selectedCoach.User_Id ? updatedCoach : coach
//     );
//     setCoachesData(updatedCoaches);
//     setSelectedCoach(null);

//     fetch(`http://localhost:3000/coaches/${selectedCoach.User_Id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedCoach)
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Coach updated successfully:', data);
//         setToggle(!toggle);
//       })
//       .catch(error => {
//         console.error('Error updating coach:', error);
//       });
//   };

//   const renderCoachItem = (item) => {
//     return (
//       <div key={item.User_Id}>
//         <div>
//           <h3>{item.user_name}</h3>
//           <p>{item.user_email}</p>
//         </div>
//         <button onClick={() => handleCoachDelete(item.User_Id)}>Delete Coach</button>
//       </div>
//     );
//   };

//   return (
//     <div>
//       {selectedCoach ? (
//         <Formik initialValues={selectedCoach} onSubmit={handleCoachUpdate}>
//           {({ handleChange, handleBlur, handleSubmit }) => (
//             <form onSubmit={handleSubmit}>
//               <h2>Update Coach</h2>
//               <input
//                 defaultValue={selectedCoach.user_name}
//                 onChange={handleChange('user_name')}
//                 onBlur={handleBlur('user_name')}
//               />
//               <input
//                 defaultValue={selectedCoach.user_email}
//                 onChange={handleChange('user_email')}
//                 onBlur={handleBlur('user_email')}
//               />
//               <input
//                 defaultValue={selectedCoach.user_password}
//                 onChange={handleChange('user_password')}
//                 onBlur={handleBlur('user_password')}
//               />
//               <input
//                 defaultValue={selectedCoach.user_img}
//                 onChange={handleChange('user_img')}
//                 onBlur={handleBlur('user_img')}
//               />
//               <input
//                 defaultValue={selectedCoach.user_gender}
//                 onChange={handleChange('user_gender')}
//                 onBlur={handleBlur('user_gender')}
//               />
//               <input
//                 defaultValue={selectedCoach.user_preference}
//                 onChange={handleChange('user_preference')}
//                 onBlur={handleBlur('user_preference')}
//               />
//               <button type="submit">Update Coach</button>
//               <button onClick={() => setSelectedCoach(null)}>Cancel</button>
//             </form>
//           )}
//         </Formik>
//       ) : (
//         <Formik
//           initialValues={{
//             user_name: '',
//             user_email: '',
//             user_password: '',
//             user_img: '',
//             user_gender: '',
//             user_preference: ''
//           }}
//           onSubmit={handleCoachSubmit}
//         >
//           {({ handleChange, handleBlur, handleSubmit }) => (
//             <form onSubmit={handleSubmit}>
//               <h2>Add Coach</h2>
//               <input
//                 placeholder="Name"
//                 onChange={handleChange('user_name')}
//                 onBlur={handleBlur('user_name')}
//               />
//               <input
//                 placeholder="Email"
//                 onChange={handleChange('user_email')}
//                 onBlur={handleBlur('user_email')}
//               />
//               <input
//                 placeholder="Password"
//                 onChange={handleChange('user_password')}
//                 onBlur={handleBlur('user_password')}
//               />
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 onBlur={handleBlur('user_img')}
//               />
//               <input
//                 placeholder="Gender"
//                 onChange={handleChange('user_gender')}
//                 onBlur={handleBlur('user_gender')}
//               />
//               <input
//                 placeholder="Preference"
//                 onChange={handleChange('user_preference')}
//                 onBlur={handleBlur('user_preference')}
//               />
//               <button type="submit">Add Coach</button>
//             </form>
//           )}
//         </Formik>
//       )}
//       <div>
//         {coachesData.map(renderCoachItem)}
//       </div>
//     </div>
//   );
// };

// export default CoachesDashboard;


// import React, { useState, useEffect } from 'react';
// import { Formik } from 'formik';
// import axios from 'axios';

// const CoachesDashboard = () => {
//   const [coachesData, setCoachesData] = useState([]);
//   const [toggle, setToggle] = useState(false);
//   const [selectedCoach, setSelectedCoach] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [showProfile, setShowProfile] = useState(false);

//   useEffect(() => {
//     fetch('http://localhost:3000/users/coaches')
//       .then(response => response.json())
//       .then(data => {
//         setCoachesData(data.coaches);
//       })
//       .catch(error => {
//         console.error('Error retrieving coaches from server:', error);
//       });
//   }, [toggle]);

//   const uploadImage = async (file) => {
//     const form = new FormData();
//     form.append('file', file);
//     form.append('upload_preset', 'mohamed');

//     try {
//       const response = await axios.post(
//         'https://api.cloudinary.com/v1_1/dmyit8zek/image/upload',
//         form
//       );
//       return response.data.secure_url;
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleCoachSubmit = async (values, { resetForm }) => {
//     const { user_img, ...coachData } = values;

//     const uploadedImageUrl = await uploadImage(selectedFile);
//     const coachDataWithImage = {
//       ...coachData,
//       user_img: uploadedImageUrl
//     };

//     fetch('http://localhost:3000/coaches', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(coachDataWithImage)
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Coach added successfully:', data);
//         resetForm();
//         setToggle(!toggle);
//       })
//       .catch(error => {
//         console.error('Error adding coach:', error);
//       });
//   };

//   const handleCoachDelete = (coachId) => {
//     fetch(`http://localhost:3000/coaches/${coachId}`, {
//       method: 'DELETE'
//     })
//       .then(response => response.text())
//       .then(data => {
//         console.log('Coach deleted successfully:', data);
//         setToggle(!toggle);
//         setCoachesData(coachesData.filter(coach => coach.User_Id !== coachId));
//       })
//       .catch(error => {
//         console.error('Error deleting coach:', error);
//       });
//   };

//   const handleCoachPress = (coachId) => {
//     const coach = coachesData.find(coach => coach.User_Id === coachId);
//     setSelectedCoach(coach);
//     setShowProfile(true);
//   };

//   const handleCoachUpdate = (values) => {
//     const updatedCoach = { ...selectedCoach, ...values };
//     const updatedCoaches = coachesData.map(coach =>
//       coach.User_Id === selectedCoach.User_Id ? updatedCoach : coach
//     );
//     setCoachesData(updatedCoaches);
//     setSelectedCoach(null);

//     fetch(`http://localhost:3000/coaches/${selectedCoach.User_Id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedCoach)
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Coach updated successfully:', data);
//         setToggle(!toggle);
//       })
//       .catch(error => {
//         console.error('Error updating coach:', error);
//       });
//   };

//   const renderCoachItem = (item) => {
//     return (
//       <div key={item.User_Id}>
//         <div>
//           <h3>{item.user_name}</h3>
//           <p>{item.user_email}</p>
//         </div>
//         <button onClick={() => handleCoachDelete(item.User_Id)}>Delete Coach</button>
//         <button onClick={() => handleCoachPress(item.User_Id)}>View Profile</button>
//       </div>
//     );
//   };

//   return (
//     <div>
//       {showProfile && selectedCoach && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setShowProfile(false)}>&times;</span>
//             <h2>{selectedCoach.user_name}'s Profile</h2>
//             <div className="profile-details">
//               <img src={selectedCoach.user_img} alt="Profile" />
//               <p>Email: {selectedCoach.user_email}</p>
//               <p>Gender: {selectedCoach.user_gender}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <Formik
//         initialValues={{
//           user_name: '',
//           user_email: '',
//           user_password: '',
//           user_img: '',
//           user_gender: '',
//           user_preference: ''
//         }}
//         onSubmit={handleCoachSubmit}
//       >
//         {({ handleChange, handleBlur, handleSubmit }) => (
//           <form onSubmit={handleSubmit}>
//             <h2>Add Coach</h2>
//             <input
//               placeholder="Name"
//               onChange={handleChange('user_name')}
//               onBlur={handleBlur('user_name')}
//             />
//             <input
//               placeholder="Email"
//               onChange={handleChange('user_email')}
//               onBlur={handleBlur('user_email')}
//             />
//             <input
//               placeholder="Password"
//               onChange={handleChange('user_password')}
//               onBlur={handleBlur('user_password')}
//             />
//             <input
//               type="file"
//               onChange={handleFileChange}
//               onBlur={handleBlur('user_img')}
//             />
//             <input
//               placeholder="Gender"
//               onChange={handleChange('user_gender')}
//               onBlur={handleBlur('user_gender')}
//             />
//             <input
//               placeholder="Preference"
//               onChange={handleChange('user_preference')}
//               onBlur={handleBlur('user_preference')}
//             />
//             <button type="submit">Add Coach</button>
//           </form>
//         )}
//       </Formik>

//       <div>
//         {coachesData.map(renderCoachItem)}
//       </div>
//     </div>
//   );
// };

// export default CoachesDashboard;
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import axios from 'axios';

const CoachesDashboard = () => {
  const [coachesData, setCoachesData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/users/coaches')
      .then(response => response.json())
      .then(data => {
        setCoachesData(data.coaches);
      })
      .catch(error => {
        console.error('Error retrieving coaches from server:', error);
      });
  }, [toggle]);

  const uploadImage = async (file) => {
    const form = new FormData();
    form.append('file', file);
    form.append('upload_preset', 'mohamed');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dmyit8zek/image/upload',
        form
      );
      return response.data.secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleCoachSubmit = async (values, { resetForm }) => {
    const { user_img, ...coachData } = values;

    const uploadedImageUrl = await uploadImage(selectedFile);
    const coachDataWithImage = {
      ...coachData,
      user_img: uploadedImageUrl
    };

    fetch('http://localhost:3000/coaches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coachDataWithImage)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Coach added successfully:', data);
        resetForm();
        setToggle(!toggle);
      })
      .catch(error => {
        console.error('Error adding coach:', error);
      });
  };

  const handleCoachDelete = (coachId) => {
    fetch(`http://localhost:3000/coaches/${coachId}`, {
      method: 'DELETE'
    })
      .then(response => response.text())
      .then(data => {
        console.log('Coach deleted successfully:', data);
        setToggle(!toggle);
        setCoachesData(coachesData.filter(coach => coach.User_Id !== coachId));
      })
      .catch(error => {
        console.error('Error deleting coach:', error);
      });
  };

  const handleCoachPress = (coachId) => {
    const coach = coachesData.find(coach => coach.User_Id === coachId);
    setSelectedCoach(coach);
    setShowProfile(true);
  };

  const handleCoachUpdate = (values) => {
    const updatedCoach = { ...selectedCoach, ...values };
    const updatedCoaches = coachesData.map(coach =>
      coach.User_Id === selectedCoach.User_Id ? updatedCoach : coach
    );
    setCoachesData(updatedCoaches);
    setSelectedCoach(null);

    fetch(`http://localhost:3000/coaches/${selectedCoach.User_Id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCoach)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Coach updated successfully:', data);
        setToggle(!toggle);
      })
      .catch(error => {
        console.error('Error updating coach:', error);
      });
  };

  const renderCoachItem = (item) => {
    return (
      <div key={item.User_Id}>
        <div>
          <h3>{item.user_name}</h3>
          <p>{item.user_email}</p>
        </div>
        <button onClick={() => handleCoachDelete(item.User_Id)}>Delete Coach</button>
        <button onClick={() => handleCoachPress(item.User_Id)}>View Profile</button>
      </div>
    );
  };

  return (
    <div>
      {showProfile && selectedCoach && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowProfile(false)}>&times;</span>
            <h2>{selectedCoach.user_name}'s Profile</h2>
            <div className="profile-details">
              <img src={selectedCoach.user_img} alt="Profile" />
              <p>Email: {selectedCoach.user_email}</p>
              <p>Gender: {selectedCoach.user_gender}</p>
            </div>
          </div>
        </div>
      )}

      <Formik
        initialValues={{
          user_name: '',
          user_email: '',
          user_password: '',
          user_img: '',
          user_gender: '',
          user_preference: ''
        }}
        onSubmit={handleCoachSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <h2>Add Coach</h2>
            <input
              placeholder="Name"
              onChange={handleChange('user_name')}
              onBlur={handleBlur('user_name')}
            />
            <input
              placeholder="Email"
              onChange={handleChange('user_email')}
              onBlur={handleBlur('user_email')}
            />
            <input
              placeholder="Password"
              onChange={handleChange('user_password')}
              onBlur={handleBlur('user_password')}
            />
            <input
              type="file"
              onChange={handleFileChange}
              onBlur={handleBlur('user_img')}
            />
            <input
              placeholder="Gender"
              onChange={handleChange('user_gender')}
              onBlur={handleBlur('user_gender')}
            />
            <input
              placeholder="Preference"
              onChange={handleChange('user_preference')}
              onBlur={handleBlur('user_preference')}
            />
            <button type="submit">Add Coach</button>
          </form>
        )}
      </Formik>

      <div>
        {coachesData.map(renderCoachItem)}
      </div>
    </div>
  );
};

export default CoachesDashboard;
