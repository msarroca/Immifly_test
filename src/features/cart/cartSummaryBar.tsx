import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { calculateTotalEUR } from '@helpers/index';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@models/index';
import { useAppSelector, useAppDispatch } from '@app/store';
import { CURRENCIES, SALE_TYPES } from '@constants/sales';
import { setCurrency, setSaleType } from '@features/sales/sales.slice';
import { convertRates } from '@helpers/index';
import { SaleType, Currency } from '@models/index';
import PickerModal from '@components/PickerModal';
import { PATH } from '@constants/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Products'>;

const CartSummaryBar = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();

  const { items } = useAppSelector((state) => state.cart);
  const { currency, saleType } = useAppSelector((state) => state.sales);
  const [isCurrencyModal, setCurrencyModal] = useState(false);
  const [isSaleModal, setSaleModal] = useState(false);

  if (items.length === 0) return null;

  const totalEUR = calculateTotalEUR(items);
  const currentCurrency = CURRENCIES?.find((c) => c.key === currency);
  const currentSale = SALE_TYPES.find((s) => s.key === saleType);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={[styles.container, styles.row]}>
        <Text style={styles.total} testID="total">
          {convertRates(totalEUR, currency)}
        </Text>

        <TouchableOpacity style={styles.pickerButton} onPress={() => setCurrencyModal(true)}>
          <Text style={styles.pickerTxt}>{currentCurrency?.label}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pickerButton} onPress={() => setSaleModal(true)}>
          <Text style={styles.pickerTxt}>{currentSale?.label}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(PATH.TicketScreen)}
          testID="pay-button"
        >
          <Text style={styles.buttonTxt}>Pagar</Text>
        </TouchableOpacity>
      </View>

      <PickerModal
        visible={isCurrencyModal}
        title="Seleccionar moneda"
        items={CURRENCIES}
        selectedKey={currency}
        onSelect={(key) => {
          dispatch(setCurrency(key as Currency));
          setCurrencyModal(false);
        }}
        onClose={() => setCurrencyModal(false)}
      />

      <PickerModal
        visible={isSaleModal}
        title="Seleccionar tipo de venta"
        items={SALE_TYPES}
        selectedKey={saleType}
        onSelect={(key) => {
          dispatch(setSaleType(key as SaleType));
          setSaleModal(false);
        }}
        onClose={() => setSaleModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 80,
    minHeight: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  total: {
    fontSize: 18,
    fontWeight: '700',
  },
  pickerButton: {
    flex: 1,
    height: 40,
    marginHorizontal: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  pickerTxt: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonTxt: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

export default CartSummaryBar;
