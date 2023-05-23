
// import React, { useState, useEffect } from 'react';
// import { Formik } from 'formik';
// import { FaEdit, FaTrash, FaEllipsisV } from 'react-icons/fa';
// import './ProductsDashboard.css';

// const ProductsDashboard = () => {
//   const [productsData, setProductsData] = useState([]);
//   const [toggle, setToggle] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showOptions, setShowOptions] = useState(false)
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:3000/products')
//       .then(response => response.json())
//       .then(data => {
//         setProductsData(data);
//       })
//       .catch(error => {
//         console.error('Error retrieving products from server:', error);
//       });
//   }, [toggle]);

//   const handleProductSubmit = (values, { resetForm }) => {
//     fetch('http://localhost:3000/products', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(values)
//     })
//       .then(response => response.text())
//       .then(data => {
//         console.log('Product added successfully:', data);
//         setProductsData([...productsData, values]);
//         resetForm();
//       })
//       .catch(error => {
//         console.error('Error adding product:', error);
//       });
//     setToggle(!toggle);
//   };

//   const handleProductDelete = (productId) => {
//     fetch(`http://localhost:3000/products/${productId}`, {
//       method: 'DELETE'
//     })
//       .then(response => response.text())
//       .then(data => {
//         console.log('Product deleted successfully:', data);
//         setToggle(!toggle);
//         setProductsData(productsData.filter((product) => product._id !== productId));
//       })
//       .catch(error => {
//         console.error('Error deleting product:', error);
//       });
//   };

//   const handleProductPress = (productId) => {
//     const product = productsData.find((product) => product._id === productId);
//     setSelectedProduct(product);
//   };

//   const handleProductUpdate = (values) => {
//     const filteredValues = Object.keys(values).reduce((acc, key) => {
//       if (values[key] !== '' && values[key] != null && values[key] !== undefined) {
//         acc[key] = values[key];
//       }
//       return acc;
//     }, {});

//     const updatedProduct = { ...selectedProduct, ...filteredValues };
//     const updatedProducts = productsData.map((product) =>
//       product._id === selectedProduct._id ? updatedProduct : product);
//     setProductsData(updatedProducts);
//     setSelectedProduct(null);

//     fetch(`http://localhost:3000/products/${selectedProduct._id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedProduct)
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Product updated successfully:', data);
//       })
//       .catch(error => {
//         console.error('Error updating product:', error);
//       });
//   };

//   const renderProductItem = ({ item }) => {
//     ;

//     const handleToggleOptions = () => {
//       setShowOptions(!showOptions);
//     };

//     return (
//       <div className="ProductItem">
//         <div onClick={() => handleProductPress(item._id)}>
//           <h2>{item.product_name}</h2>
//           <img src={item.product_image} alt={item.product_name} />
//           <p>${item.product_price}</p>
//         </div>
//         <div className="ProductOptions">
//           <div className="OptionsIcon" onClick={handleToggleOptions}>
//             <FaEllipsisV />
//           </div>
//           <div className={`OptionsList ${showOptions ? 'show' : ''}`}>
//             <div className="Option" onClick={() => handleProductPress(item._id)}>
//               <FaEdit />
//               <span>Edit Product</span>
//             </div>
//             <div className="Option" onClick={() => handleProductDelete(item._id)}>
//               <FaTrash />
//               <span>Delete Product</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="ProductsDashboard">
//       {selectedProduct ? (
//         <Formik initialValues={selectedProduct} onSubmit={handleProductUpdate}>
//           {({ handleChange, handleBlur, handleSubmit, values }) => (
//             <form className="ProductForm" onSubmit={handleSubmit}>
//               <h2>Update Product</h2>
//               <input
//                 type="text"
//                 value={values.product_name}
//                 onChange={handleChange('product_name')}
//                 onBlur={handleBlur('product_name')}
//               />
//               <input
//                 type="text"
//                 value={values.product_desc}
//                 onChange={handleChange('product_desc')}
//                 onBlur={handleBlur('product_desc')}
//               />
//               <input
//                 type="text"
//                 value={values.product_image}
//                 onChange={handleChange('product_image')}
//                 onBlur={handleBlur('product_image')}
//               />
//               <input
//                 type="text"
//                 value={values.product_price}
//                 onChange={handleChange('product_price')}
//                 onBlur={handleBlur('product_price')}
//               />
//               <input
//                 type="text"
//                 value={values.count_in_stock}
//                 onChange={handleChange('count_in_stock')}
//                 onBlur={handleBlur('count_in_stock')}
//               />
//               <button type="submit">Update Product</button>
//               <button type="button" onClick={() => setSelectedProduct(null)}>Cancel</button>
//             </form>
//           )}
//         </Formik>
//       ) : (
//         <Formik
//           initialValues={{
//             product_name: '',
//             product_desc: '',
//             product_image: '',
//             product_price: '',
//             count_in_stock: ''
//           }}
//           onSubmit={handleProductSubmit}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values }) => (
//             <form className="AddProductForm" onSubmit={handleSubmit}>
//               <h2>Add Product</h2>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={values.product_name}
//                 onChange={handleChange('product_name')}
//                 onBlur={handleBlur('product_name')}
//               />
//               <input
//                 type="text"
//                 placeholder="Description"
//                 value={values.product_desc}
//                 onChange={handleChange('product_desc')}
//                 onBlur={handleBlur('product_desc')}
//               />
//               <input
//                 type="text"
//                 placeholder="Image URL"
//                 value={values.product_image}
//                 onChange={handleChange('product_image')}
//                 onBlur={handleBlur('product_image')}
//               />
//               <input
//                 type="text"
//                 placeholder="Price"
//                 value={values.product_price}
//                 onChange={handleChange('product_price')}
//                 onBlur={handleBlur('product_price')}
//               />
//               <input
//                 type="text"
//                 placeholder="Count in Stock"
//                 value={values.count_in_stock}
//                 onChange={handleChange('count_in_stock')}
//                 onBlur={handleBlur('count_in_stock')}
//               />
//               <button type="submit">Add Product</button>
//             </form>
//           )}
//         </Formik>
//       )}
//       <div className="ProductList">
//         {productsData.map((product) => (
//           renderProductItem({ item: product })
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsDashboard;

// import React, { useState, useEffect } from 'react';
// import { Formik } from 'formik';
// import { FaEdit, FaTrash, FaEllipsisV } from 'react-icons/fa';
// import './ProductsDashboard.css';

// const ProductsDashboard = () => {
//   const [productsData, setProductsData] = useState([]);
//   const [toggle, setToggle] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showOptions, setShowOptions] = useState(false)
//   useEffect(() => {
//     fetch('http://localhost:3000/products')
//       .then(response => response.json())
//       .then(data => {
//         setProductsData(data);
//       })
//       .catch(error => {
//         console.error('Error retrieving products from server:', error);
//       });
//   }, [toggle]);

//   const handleProductSubmit = (values, { resetForm }) => {
//     fetch('http://localhost:3000/products', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(values)
//     })
//       .then(response => response.text())
//       .then(data => {
//         console.log('Product added successfully:', data);
//         setProductsData([...productsData, values]);
//         resetForm();
//       })
//       .catch(error => {
//         console.error('Error adding product:', error);
//       });
//     setToggle(!toggle);
//   };

//   const handleProductDelete = (productId) => {
//     fetch(`http://localhost:3000/products/${productId}`, {
//       method: 'DELETE'
//     })
//       .then(response => response.text())
//       .then(data => {
//         console.log('Product deleted successfully:', data);
//         setToggle(!toggle);
//         setProductsData(productsData.filter((product) => product._id !== productId));
//       })
//       .catch(error => {
//         console.error('Error deleting product:', error);
//       });
//   };

//   const handleProductPress = (productId) => {
//     const product = productsData.find((product) => product._id === productId);
//     setSelectedProduct(product);
//   };

//   const handleProductUpdate = (values) => {
//     const filteredValues = Object.keys(values).reduce((acc, key) => {
//       if (values[key] !== '' && values[key] != null && values[key] !== undefined) {
//         acc[key] = values[key];
//       }
//       return acc;
//     }, {});

//     const updatedProduct = { ...selectedProduct, ...filteredValues };
//     const updatedProducts = productsData.map((product) =>
//       product._id === selectedProduct._id ? updatedProduct : product);
//     setProductsData(updatedProducts);
//     setSelectedProduct(null);

//     fetch(`http://localhost:3000/products/${selectedProduct._id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedProduct)
//     })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Product updated successfully:', data);
//       })
//       .catch(error => {
//         console.error('Error updating product:', error);
//       });
//   };

//   const renderProductItem = ({ item }) => {
    

//     const handleToggleOptions = () => {
//       setShowOptions(!showOptions);
//     };

//     return (
//       <div className="ProductItem">
//         <div onClick={() => handleProductPress(item._id)}>
//           <h2>{item.product_name}</h2>
//           <img src={item.product_image} alt={item.product_name} />
//           <p>${item.product_price}</p>
//         </div>
//         <div className="ProductOptions">
//           <div className="OptionsIcon" onClick={handleToggleOptions}>
//             <FaEllipsisV />
//           </div>
//           <div className={`OptionsList ${showOptions ? 'show' : ''}`}>
//             <div className="Option" onClick={() => handleProductPress(item._id)}>
//               <FaEdit />
//               <span>Edit Product</span>
//             </div>
//             <div className="Option" onClick={() => handleProductDelete(item._id)}>
//               <FaTrash />
//               <span>Delete Product</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className='searchContainer'>
//     <div className="ProductsDashboard">
      
//       <input
//       className="searchInput"
//         type="text"
//         placeholder="Search by product name"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       </div>
//       {selectedProduct ? (
//         <Formik initialValues={selectedProduct} onSubmit={handleProductUpdate}>
//           {({ handleChange, handleBlur, handleSubmit, values }) => (
//             <form className="ProductForm" onSubmit={handleSubmit}>
//               <h2>Update Product</h2>
//               <input
//                 type="text"
//                 value={values.product_name}
//                 onChange={handleChange('product_name')}
//                 onBlur={handleBlur('product_name')}
//               />
//               <input
//                 type="text"
//                 value={values.product_desc}
//                 onChange={handleChange('product_desc')}
//                 onBlur={handleBlur('product_desc')}
//               />
//               <input
//                 type="text"
//                 value={values.product_image}
//                 onChange={handleChange('product_image')}
//                 onBlur={handleBlur('product_image')}
//               />
//               <input
//                 type="text"
//                 value={values.product_price}
//                 onChange={handleChange('product_price')}
//                 onBlur={handleBlur('product_price')}
//               />
//               <input
//                 type="text"
//                 value={values.count_in_stock}
//                 onChange={handleChange('count_in_stock')}
//                 onBlur={handleBlur('count_in_stock')}
//               />
//               <button type="submit">Update Product</button>
//               <button type="button" onClick={() => setSelectedProduct(null)}>Cancel</button>
//             </form>
//           )}
//         </Formik>
//       ) : (
//         <Formik
//           initialValues={{
//             product_name: '',
//             product_desc: '',
//             product_image: '',
//             product_price: '',
//             count_in_stock: ''
//           }}
//           onSubmit={handleProductSubmit}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values }) => (
//             <form className="AddProductForm" onSubmit={handleSubmit}>
//               <h2>Add Product</h2>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={values.product_name}
//                 onChange={handleChange('product_name')}
//                 onBlur={handleBlur('product_name')}
//               />
//               <input
//                 type="text"
//                 placeholder="Description"
//                 value={values.product_desc}
//                 onChange={handleChange('product_desc')}
//                 onBlur={handleBlur('product_desc')}
//               />
//               <input
//                 type="text"
//                 placeholder="Image URL"
//                 value={values.product_image}
//                 onChange={handleChange('product_image')}
//                 onBlur={handleBlur('product_image')}
//               />
//               <input
//                 type="text"
//                 placeholder="Price"
//                 value={values.product_price}
//                 onChange={handleChange('product_price')}
//                 onBlur={handleBlur('product_price')}
//               />
//               <input
//                 type="text"
//                 placeholder="Count in Stock"
//                 value={values.count_in_stock}
//                 onChange={handleChange('count_in_stock')}
//                 onBlur={handleBlur('count_in_stock')}
//               />
//               <button type="submit">Add Product</button>
//             </form>
//           )}
//         </Formik>
//       )}
//       <div className="ProductList">
//         {productsData
//           .filter((product) =>
//             product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
//           )
//           .map((product) => (
//             renderProductItem({ item: product })
//           ))}
//       </div>
//     </div>
//   );
// };

// export default ProductsDashboard;
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { FaEdit, FaTrash, FaEllipsisV, FaTimes } from 'react-icons/fa';
import './ProductsDashboard.css';

const ProductsDashboard = () => {
  const [productsData, setProductsData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        setProductsData(data);
      })
      .catch(error => {
        console.error('Error retrieving products from server:', error);
      });
  }, [toggle]);

  const handleProductSubmit = (values, { resetForm }) => {
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(response => response.text())
      .then(data => {
        console.log('Product added successfully:', data);
        setProductsData([...productsData, values]);
        resetForm();
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
    setToggle(!toggle);
  };

  const handleProductDelete = (productId) => {
    fetch(`http://localhost:3000/products/${productId}`, {
      method: 'DELETE'
    })
      .then(response => response.text())
      .then(data => {
        console.log('Product deleted successfully:', data);
        setToggle(!toggle);
        setProductsData(productsData.filter((product) => product._id !== productId));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const handleProductPress = (productId) => {
    const product = productsData.find((product) => product._id === productId);
    setSelectedProduct(product);
    setShowUpdateForm(true);
  };

  const handleProductUpdate = (values) => {
    const filteredValues = Object.keys(values).reduce((acc, key) => {
      if (values[key] !== '' && values[key] != null && values[key] !== undefined) {
        acc[key] = values[key];
      }
      return acc;
    }, {});

    const updatedProduct = { ...selectedProduct, ...filteredValues };
    const updatedProducts = productsData.map((product) =>
      product._id === selectedProduct._id ? updatedProduct : product);
    setProductsData(updatedProducts);
    setSelectedProduct(null);
    setShowUpdateForm(false);

    fetch(`http://localhost:3000/products/${selectedProduct._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product updated successfully:', data);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const renderProductItem = ({ item }) => {
    const handleToggleOptions = () => {
      setShowOptions(!showOptions);
    };

    return (
      <div className="ProductItem">
        <div onClick={() => handleProductPress(item._id)}>
          <h2>{item.product_name}</h2>
          <img src={item.product_image} alt={item.product_name} />
          <p>${item.product_price}</p>
        </div>
        <div className="ProductOptions">
          <div className="OptionsIcon" onClick={handleToggleOptions}>
            <FaEllipsisV />
          </div>
          <div className={`OptionsList ${showOptions ? 'show' : ''}`}>
            <div className="Option" onClick={() => handleProductPress(item._id)}>
              <FaEdit />
              <span>Edit Product</span>
            </div>
            <div className="Option" onClick={() => handleProductDelete(item._id)}>
              <FaTrash />
              <span>Delete Product</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='searchContainer'>
      <div className="ProductsDashboard">
        <input
          className="searchInput"
          type="text"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {selectedProduct && showUpdateForm ? (
        <div className="UpdateProductForm">
          <Formik initialValues={selectedProduct} onSubmit={handleProductUpdate}>
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <h2>Update Product</h2>
                <input
                  type="text"
                  value={values.product_name}
                  onChange={handleChange('product_name')}
                  onBlur={handleBlur('product_name')}
                />
                <input
                  type="text"
                  value={values.product_desc}
                  onChange={handleChange('product_desc')}
                  onBlur={handleBlur('product_desc')}
                />
                <input
                  type="text"
                  value={values.product_image}
                  onChange={handleChange('product_image')}
                  onBlur={handleBlur('product_image')}
                />
                <input
                  type="text"
                  value={values.product_price}
                  onChange={handleChange('product_price')}
                  onBlur={handleBlur('product_price')}
                />
                <input
                  type="text"
                  value={values.count_in_stock}
                  onChange={handleChange('count_in_stock')}
                  onBlur={handleBlur('count_in_stock')}
                />
                <button type="submit">Update Product</button>
                <button type="button" onClick={() => setShowUpdateForm(false)}>
                  <FaTimes />
                </button>
              </>
            )}
          </Formik>
        </div>
      ) : (
        <Formik
          initialValues={{
            product_name: '',
            product_desc: '',
            product_image: '',
            product_price: '',
            count_in_stock: ''
          }}
          onSubmit={handleProductSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <form className="AddProductForm" onSubmit={handleSubmit}>
              <h2>Add Product</h2>
              <input
                type="text"
                placeholder="Name"
                value={values.product_name}
                onChange={handleChange('product_name')}
                onBlur={handleBlur('product_name')}
              />
              <input
                type="text"
                placeholder="Description"
                value={values.product_desc}
                onChange={handleChange('product_desc')}
                onBlur={handleBlur('product_desc')}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={values.product_image}
                onChange={handleChange('product_image')}
                onBlur={handleBlur('product_image')}
              />
              <input
                type="text"
                placeholder="Price"
                value={values.product_price}
                onChange={handleChange('product_price')}
                onBlur={handleBlur('product_price')}
              />
              <input
                type="text"
                placeholder="Count in Stock"
                value={values.count_in_stock}
                onChange={handleChange('count_in_stock')}
                onBlur={handleBlur('count_in_stock')}
              />
              <button type="submit">Add Product</button>
            </form>
          )}
        </Formik>
      )}
      <div className="ProductList">
        {productsData
          .filter((product) =>
            product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            renderProductItem({ item: product })
          ))}
      </div>
    </div>
  );
};

export default ProductsDashboard;
