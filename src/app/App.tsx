import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '@pages/HomePage';
import CatalogPage from '@pages/CatalogPage';
import ProductPage from '@pages/ProductPage';
import CartPage from '@pages/CartPage';
import CheckoutPage from '@pages/CheckoutPage';
import PolicyPage from '@pages/PolicyPage';
import AppHeader from '@shared/ui/AppHeader';
import AppFooter from '@shared/ui/AppFooter';
import CartDrawer from '@widgets/CartDrawer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <AppFooter />
      <CartDrawer />
    </div>
  );
};

export default App;