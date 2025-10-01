import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { useAppSelector, useAppDispatch } from '@app/store';
import { removeFromCart, clearCart } from '@features/cart/cart.slice';
import { calculateTotalEUR, convertRates } from '@helpers/index';
import { processPayment } from '@features/sales/thunks';
import PickerModal from '@components/PickerModal';
import ProductQuantityModal from '@components/ProductQuantityModal';
import { useNavigation } from '@react-navigation/native';
import { CartItem, PaymentError } from '@models/index';

const ROWS = ['A', 'B', 'C', 'D'];
const NUMBERS = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

const TicketScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();

  const { items } = useAppSelector((s) => s.cart);
  const { currency, saleType } = useAppSelector((s) => s.sales);

  const [seatRow, setSeatRow] = useState('A');
  const [seatNumber, setSeatNumber] = useState('1');
  const [showRowPicker, setShowRowPicker] = useState(false);
  const [showNumberPicker, setShowNumberPicker] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [loadingMethod, setLoadingMethod] = useState<'Efectivo' | 'Tarjeta' | null>(null);

  const totalEUR = calculateTotalEUR(items);

  const handlePayment = async (method: 'Efectivo' | 'Tarjeta') => {
    setLoadingMethod(method);

    try {
      await dispatch(
        processPayment({
          items,
          total: totalEUR,
          currency,
          saleType,
          seatRow,
          seatNumber,
        }),
      ).unwrap();
      Alert.alert('Pago realizado ✅', '', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(clearCart());
            navigation.reset({
              index: 0,
              routes: [{ name: 'Products' }],
            });
          },
        },
      ]);
    } catch (error) {
      const errorPayload = error as PaymentError;
      const errorMessage =
        errorPayload.message || 'No se pudo procesar el pago. Por favor, inténtalo de nuevo.';

      Alert.alert('Error ❌', errorMessage);
    } finally {
      setLoadingMethod(null);
    }
  };

  const renderRightActions = (id: number) => (
    <View style={styles.deleteBox}>
      <Text style={styles.deleteText}>Eliminar</Text>
    </View>
  );

  const renderItem: ListRenderItem<CartItem> = ({ item }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.product.id)}
      onSwipeableOpen={() => dispatch(removeFromCart(item.product.id))}
    >
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          setSelectedItem(item);
          setShowModal(true);
        }}
      >
        <Image source={{ uri: item.product.image }} style={styles.image} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>
            {item.product.title}
          </Text>
          <Text style={styles.price}>
            {convertRates(item.product.price * item.quantity, currency)}
          </Text>
        </View>
        <Text style={styles.qty}>x{item.quantity}</Text>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ticket</Text>
          <Text style={styles.subTitle}>Productos seleccionados</Text>
        </View>

        <FlatList
          data={items}
          keyExtractor={(i) => String(i.product.id)}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />

        <View style={styles.footer}>
          <View style={styles.seatSelector}>
            <TouchableOpacity style={styles.seatBtn} onPress={() => setShowRowPicker(true)}>
              <Text>{seatRow}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.seatBtn} onPress={() => setShowNumberPicker(true)}>
              <Text>{seatNumber}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.total}>{convertRates(totalEUR, currency)}</Text>
        </View>

        <View style={styles.payRow}>
          <TouchableOpacity
            style={styles.payBtn}
            onPress={() => handlePayment('Efectivo')}
            disabled={loadingMethod !== null}
          >
            {loadingMethod === 'Efectivo' ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.payTxt}>Efectivo</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.payBtn}
            onPress={() => handlePayment('Tarjeta')}
            disabled={loadingMethod !== null}
          >
            {loadingMethod === 'Tarjeta' ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.payTxt}>Tarjeta</Text>
            )}
          </TouchableOpacity>
        </View>

        <PickerModal
          visible={showRowPicker}
          title="Fila"
          items={ROWS.map((r) => ({ key: r, label: r }))}
          selectedKey={seatRow}
          onSelect={(key) => {
            setSeatRow(key);
            setShowRowPicker(false);
          }}
          onClose={() => setShowRowPicker(false)}
        />

        <PickerModal
          visible={showNumberPicker}
          title="Número"
          items={NUMBERS.map((n) => ({ key: n, label: n }))}
          selectedKey={seatNumber}
          onSelect={(key) => {
            setSeatNumber(key);
            setShowNumberPicker(false);
          }}
          onClose={() => setShowNumberPicker(false)}
        />

        <ProductQuantityModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          product={selectedItem ? selectedItem.product : null}
          quantity={
            selectedItem
              ? items.find((i) => i.product.id === selectedItem.product.id)?.quantity || 1
              : 1
          }
          currency={currency}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#ccc' },
  headerTitle: { fontSize: 20, fontWeight: '700' },
  subTitle: { color: '#666', marginTop: 4 },
  list: { padding: 16 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 8,
  },
  image: { width: 48, height: 48, borderRadius: 6, marginRight: 12 },
  title: { fontSize: 14, fontWeight: '500', marginBottom: 2 },
  price: { fontSize: 14, color: '#3b82f6' },
  qty: { fontWeight: '600', fontSize: 14, marginLeft: 8 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
  deleteBox: {
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
  },
  deleteText: { color: '#fff', fontWeight: '600' },
  seatSelector: { flexDirection: 'row', gap: 8 },
  seatBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 6,
  },
  total: { fontSize: 18, fontWeight: '700' },
  payRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  payBtn: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payTxt: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default TicketScreen;
