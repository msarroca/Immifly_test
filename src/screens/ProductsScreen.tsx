import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '@app/store';
import { fetchProducts, Product } from '@features/products/products.slice';
import CartSummaryBar from '../features/cart/cartSummaryBar';

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '@features/cart/cart.slice';

const ProductsScreen = () => {
  const dispatch = useAppDispatch();
  const [showCart, setShowCart] = useState(false);
  const { items, status, error } = useAppSelector((state) => state.products);
  const cart = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    if (status === 'initial') dispatch(fetchProducts());
  }, [dispatch, status]);

  if (status === 'loading') return <ActivityIndicator style={{ flex: 1 }} />;
  if (status === 'failed') return <Text style={styles.error}>{error}</Text>;

  const renderItem = ({ item }: { item: Product }) => {
    const cartItem = cart.find((i) => i.product.id === item.id);

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.price}>{item.price.toFixed(2)} €</Text>

          {!cartItem ? (
            <TouchableOpacity style={styles.button} onPress={() => dispatch(addToCart(item))}>
              <Text style={styles.buttonText}>Añadir</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => dispatch(decreaseQuantity(item.id))}
              >
                <Text style={styles.btnTxt}>-</Text>
              </TouchableOpacity>

              <View style={styles.bullet}>
                <Text style={styles.bulletTxt}>{cartItem.quantity}</Text>
              </View>

              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => dispatch(increaseQuantity(item.id))}
              >
                <Text style={styles.btnTxt}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => dispatch(removeFromCart(item.id))}
              >
                <Text style={styles.removeTxt}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={items}
        keyExtractor={(p) => String(p.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <CartSummaryBar onPress={() => setShowCart(true)} />
    </>
  );
};

const styles = StyleSheet.create({
  list: { padding: 12 },
  card: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 12,
  },
  image: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#222' },
  title: { color: '#fff', fontWeight: '600', marginBottom: 6 },
  price: { color: '#9fe870', marginBottom: 8 },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
  error: { color: 'tomato', margin: 16 },

  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionBtn: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  btnTxt: { color: '#fff', fontWeight: '600' },
  bullet: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bulletTxt: { color: '#fff', fontWeight: '600' },
  removeBtn: { marginLeft: 8, padding: 6 },
  removeTxt: { color: 'tomato', fontWeight: '700', fontSize: 16 },
});

export default ProductsScreen;
