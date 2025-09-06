import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import OrderListGenerator from './pages/order-list-generator';
import SettingsCustomization from './pages/settings-customization';
import CustomItemCreator from './pages/custom-item-creator';
import ItemDetailsEditor from './pages/item-details-editor';
import ReportsAnalytics from './pages/reports-analytics';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CustomItemCreator />} />
        <Route path="/order-list-generator" element={<OrderListGenerator />} />
        <Route path="/settings-customization" element={<SettingsCustomization />} />
        <Route path="/custom-item-creator" element={<CustomItemCreator />} />
        <Route path="/item-details-editor" element={<ItemDetailsEditor />} />
        <Route path="/reports-analytics" element={<ReportsAnalytics />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
