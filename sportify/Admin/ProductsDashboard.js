import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView } from 'react-native';
import { Formik } from 'formik';

const ProductsDashboard = () => {
  const [productsData, setProductsData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    return (
      <TouchableOpacity onPress={() => handleProductPress(item._id)} style={styles.cardContainer}>
        <View style={styles.card}>
          <Image source={{ uri: item.product_image }} alt={item.product_name} style={styles.cardImage} />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.product_name}
            </Text>
            <Text style={styles.cardDescription}>${item.product_price}</Text>
          </View>
          <TouchableOpacity onPress={() => handleProductDelete(item._id)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete Product</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {selectedProduct ? (
        <Formik initialValues={selectedProduct} onSubmit={handleProductUpdate}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <Text style={styles.title}>Update Product</Text>
              <TextInput defaultValue={selectedProduct.product_name} onChangeText={handleChange('product_name')} onBlur={handleBlur('product_name')} style={styles.input} />
              <TextInput defaultValue={selectedProduct.product_desc} onChangeText={handleChange('product_desc')} onBlur={handleBlur('product_desc')} style={styles.input} />
              <TextInput defaultValue={selectedProduct.product_image} onChangeText={handleChange('product_image')} onBlur={handleBlur('product_image')} style={styles.input} />
              <TextInput defaultValue={selectedProduct.product_price} onChangeText={handleChange('product_price')} onBlur={handleBlur('product_price')} style={styles.input} />
              <TextInput defaultValue={selectedProduct.count_in_stock} onChangeText={handleChange('count_in_stock')} onBlur={handleBlur('count_in_stock')} style={styles.input} />
              <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
                <Text style={styles.addButtonText}>Update Product</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedProduct(null)} style={styles.addButton}>
                <Text style={styles.addButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      ) : (
        <>
          <Formik
            initialValues={{ product_name: '', product_desc: '', product_image: '', product_price: '', count_in_stock: '' }}
            onSubmit={handleProductSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <Text style={styles.title}>Add Product</Text>
                <TextInput placeholder="Name" onChangeText={handleChange('product_name')} onBlur={handleBlur('product_name')} style={styles.input} />
                <TextInput placeholder="Description" onChangeText={handleChange('product_desc')} onBlur={handleBlur('product_desc')} style={styles.input} />
                <TextInput placeholder="Image URL" onChangeText={handleChange('product_image')} onBlur={handleBlur('product_image')} style={styles.input} />
                <TextInput placeholder="Price" onChangeText={handleChange('product_price')} onBlur={handleBlur('product_price')} style={styles.input} />
                <TextInput placeholder="Count in Stock" onChangeText={handleChange('count_in_stock')} onBlur={handleBlur('count_in_stock')} style={styles.input} />
                <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add Product</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
          <FlatList
            data={productsData}
            renderItem={renderProductItem}
            keyExtractor={item => item._id}
            style={styles.list}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  list: {
    marginTop: 20
  },
  cardContainer: {
    marginBottom: 20
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardImage: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  cardInfo: {
    flex: 1
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  cardDescription: {
    color: '#999'
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default ProductsDashboard;