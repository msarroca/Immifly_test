# 🛒 Immfly Test - React Native Challenge

This project is the solution to the **Immfly technical test**.  
It is a **React Native (0.81)** application built with **TypeScript** that simulates a shopping flow: product selection, cart management, and final payment.


### This app runs on Anroid an IOS. 

---

## 🚀 Tech Stack

- **React Native 0.81**
- **TypeScript**
- **Redux Toolkit** for global state management
- **React Navigation** (native stack) for navigation
- **React Native Gesture Handler** for gestures (swipe to delete)
- **Reactotron** for Redux and network debugging
- **Jest + React Native Testing Library** for testing
- **Prettier + ESLint** for linting and code formatting

---

## 📂 Project Structure

```
src/
 ├── app/              # Store and global configuration
 ├── components/       # Reusable components (e.g. PickerModal, ProductQuantityModal)
 ├── constants/        # Global constants (Currencies, SaleTypes, etc.)
 ├── features/         # Features with slices and thunks
 │    ├── cart/        # Cart state and logic
 │    ├── products/    # Products state and logic
 │    └── sales/       # Sales state, currency, payment
 ├── models/           # Global app types
 ├── screens/          # Main screens (Products, Ticket)
 ├── helpers           # Helpers and utilities
 ├── models/           # Typescript types
```

---

## 📱 Features

### Screen 1: Products
- Displays a product list fetched.
- Add products to cart.
- Increase / decrease product quantities.
- Remove products from cart.
- **CartSummaryBar** (bottom modal) that:
  - Shows total in current currency.
  - Allows switching between EUR/USD/GBP.
  - "Pay" button → navigates to Ticket screen.

### Screen 2: Ticket
- Displays selected products.
- **Swipe gesture** to remove products.
- Tap on product → open modal to change quantity.
- Row & seat picker using **PickerModal**.
- Real-time total calculation.
- Payment buttons:
  - **Cash**
  - **Card**
- Both simulate a payment by dispatching the `processPayment` thunk which always returns `200 OK`.

---

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd Immfly_test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install iOS pods:
   ```bash
   cd ios && pod install && cd ..
   ```

---

## ▶️ Run the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

---

## 🧪 Testing

The project includes integration tests with **Jest + React Native Testing Library**:

```bash
npm test
```

### Example test implemented:
  1. ProductsScreen.
  2. TicketScreen.

---

## 👨‍💻 Author

**Marc Sarroca Díaz**  
Frontend & Mobile Developer  
[LinkedIn](https://www.linkedin.com/in/marcsarroca-diaz/) | [GitHub](https://github.com/)

---
