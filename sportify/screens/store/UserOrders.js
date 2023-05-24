import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import API_URL from '../../screneens/var';
import { UserDataContext } from '../../MainStackNavigator';
import { ScrollView } from 'native-base';

const UserOrders = () => {
  const { userData } = useContext(UserDataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/orders/getOrders/${userData.User_Id}`)
      .then(res => {
        const updatedResult = res.data.map(item => {
          const matchingItems = item.item || [];
          let total = 0;
          matchingItems.forEach(subItem => {
            if (subItem.prg_price) {
              total += subItem.prg_price;
            }
            if (subItem.product_price && subItem.Qantite_commande) {
              total += subItem.product_price * subItem.Qantite_commande;
            }
          });
          return {
            ...item,
            item: matchingItems,
            total: total.toFixed(2)
          };
        });
        setOrders(updatedResult);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    // Ensure leading zeros for day and month if necessary
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}-${formattedMonth}-${year}`;
  };
  

  return (
    <ScrollView>
    <View style={styles.container}>
      {orders.map(order => (
        <View key={order.commande_id} style={styles.orderContainer}>
          <Text style={styles.orderId}>CMD: {order.commande_id}</Text>
          <Text style={styles.total}>Total: ${order.total}</Text>
          <Text style={styles.date}>Date: {formatDate(order.date)}</Text>
          <Text style={styles.itemsTitle}>Items:</Text>
          {order.item.map(item => (
            <View key={item.commande_id} style={styles.itemContainer}>
              {item.product_name && (
                <Text style={styles.itemText}>
                  {item.Qantite_commande}*{item.product_name} : ${item.product_price}
                </Text>
              )}
              {item.prg_name && (
                <Text style={styles.itemText}>
                  {1}*{item.prg_name} : ${item.prg_price}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemContainer: {
    marginLeft: 10,
  },
  itemText: {
    fontSize: 14,
  },
});

export default UserOrders;
