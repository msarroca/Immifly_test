import React from 'react';
import { Modal, Pressable, Text, View, StyleSheet } from 'react-native';

type Item = { key: string; label: string };

type PickerModalProps = {
  visible: boolean;
  title: string;
  items: readonly Item[];
  selectedKey: string;
  onSelect: (key: string) => void;
  onClose: () => void;
};

const PickerModal = ({
  visible,
  title,
  items,
  selectedKey,
  onSelect,
  onClose,
}: PickerModalProps) => {
  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.actionSheetContainer}>
          <View style={styles.actionSheet}>
            <Text style={styles.modalTitle}>{title}</Text>

            {items.map((item) => (
              <Pressable
                key={item.key}
                style={({ pressed }) => [
                  styles.modalOption,
                  { backgroundColor: pressed ? '#eee' : '#fff' },
                ]}
                onPress={() => onSelect(item.key)}
              >
                <Text
                  style={[styles.modalOptionText, item.key === selectedKey && styles.selectedText]}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}

            <Pressable style={styles.cancelOption} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  actionSheetContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: 'transparent',
  },
  actionSheet: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#007AFF',
  },
  selectedText: {
    fontWeight: '700',
    color: '#000',
  },
  cancelOption: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 15,
  },
  cancelText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#007AFF',
  },
});

export default PickerModal;
