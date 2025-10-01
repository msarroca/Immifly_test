import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch } from '@app/store';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '@features/cart/cart.slice';
import { convertRates } from '@helpers/index';
import { Currency } from '@models/index';

type Props = {
  visible: boolean;
  onClose: () => void;
  product: any | null;
  quantity: number;
  currency: Currency;
};

const ProductQuantityModal = ({ visible, onClose, product, quantity, currency }: Props) => {
  const dispatch = useAppDispatch();

  if (!product) return null;

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitle}>{product.title}</Text>
          <Text style={styles.modalLabel}>Cantidad:</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => {
                if (quantity > 1) {
                  dispatch(decreaseQuantity(product.id));
                }
              }}
            >
              <Text style={styles.qtyBtnTxt}>-</Text>
            </TouchableOpacity>

            <Text style={styles.qtyValue}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => dispatch(increaseQuantity(product.id))}
            >
              <Text style={styles.qtyBtnTxt}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalPrice}>{convertRates(product.price * quantity, currency)}</Text>
          <View style={styles.modalBtnRow}>
            <TouchableOpacity
              style={[styles.payBtn, { flex: 1, marginRight: 8, backgroundColor: 'tomato' }]}
              onPress={() => {
                dispatch(removeFromCart(product.id));
                onClose();
              }}
            >
              <Text style={styles.payTxt}>Eliminar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.payBtn, { flex: 1, marginLeft: 8, backgroundColor: 'gray' }]}
              onPress={onClose}
            >
              <Text style={styles.payTxt}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  modalLabel: { marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnTxt: { fontSize: 20, color: '#fff', fontWeight: '700' },
  qtyValue: { marginHorizontal: 16, fontSize: 18, fontWeight: '600' },
  modalPrice: { fontSize: 16, fontWeight: '600', color: '#3b82f6', marginBottom: 16 },
  modalBtnRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 8,
  },
  payBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payTxt: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default ProductQuantityModal;
