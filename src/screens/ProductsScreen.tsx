import React, { useEffect } from 'react';
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
import { addToCart } from '@features/cart/cart.slice';

export default function ProductsScreen() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (status === 'initial') dispatch(fetchProducts());
  }, [dispatch, status]);

  if (status === 'loading') return <ActivityIndicator style={{ flex: 1 }} />;
  if (status === 'failed') return <Text style={styles.error}>{error}</Text>;

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.price}>{item.price.toFixed(2)} €</Text>
        <TouchableOpacity style={styles.button} onPress={() => dispatch(addToCart(item))}>
          <Text style={styles.buttonText}>Añadir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={items}
      keyExtractor={(p) => String(p.id)}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
}

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
});
