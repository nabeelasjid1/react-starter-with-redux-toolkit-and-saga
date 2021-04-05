/* eslint-disable */
import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import VerifyView from 'src/views/auth/verifyView';
import ForgotPasswordView from 'src/views/auth/ForgotPasswordView';
import ResetPasswordView from 'src/views/auth/ResetPasswordView';
import LandingPageView from 'src/views/auth/LandingPageView';
import SuccessView from 'src/views/auth/SuccessView';

import SettingsView from 'src/views/settings/SettingsView';
import SitesView from 'src/views/sites';
import InviteUsers from 'src/views/invites'
import { Constants } from './utils'


const siteMangerRotues = [
  { path: '/', element: <SuccessView /> },
  { path: 'account', element: <AccountView /> },
  { path: 'customers', element: <CustomerListView /> },
  { path: 'dashboard', element: <DashboardView /> },
  { path: 'products', element: <ProductListView /> },
  { path: 'settings', element: <SettingsView /> },
  { path: 'sites', element: <SitesView /> },
  { path: 'inviteusers', element: <InviteUsers /> },
  { path: '*', element: <Navigate to="/404" /> }
];


const adminRotues = [
  { path: 'account', element: <AccountView /> },
  { path: 'customers', element: <CustomerListView /> },
  { path: 'dashboard', element: <DashboardView /> },
  { path: 'products', element: <ProductListView /> },
  { path: 'settings', element: <SettingsView /> },
  { path: 'sites', element: <SitesView /> },
  { path: 'inviteusers', element: <InviteUsers /> },
  { path: '*', element: <Navigate to="/404" /> }
];

const userRotues = [
  { path: 'account', element: <AccountView /> },
  { path: 'customers', element: <CustomerListView /> },
  { path: 'dashboard', element: <DashboardView /> },
  { path: 'products', element: <ProductListView /> },
  { path: 'settings', element: <SettingsView /> },
  { path: 'sites', element: <SitesView /> },
  { path: 'inviteusers', element: <InviteUsers /> },
  { path: '*', element: <Navigate to="/404" /> }
];




const routes = (token, user) => {
  const role = user?.role ? user.role : null;
  const { roles } = Constants.roles;


  return [
    {
      path: 'app',
      element: token ? <DashboardLayout /> : <Navigate to="/login" />,
      children: siteMangerRotues,
    },
    {
      path: '/',
      element: !token ? <MainLayout /> : <Navigate to="/app" />,
      children: [
        { path: 'login', element: <LoginView /> },
        { path: 'register', element: <RegisterView /> },
        { path: 'verify', element: <VerifyView /> },
        { path: 'landing/:token', element: <LandingPageView /> },
        { path: 'success', element: <SuccessView /> },
        { path: 'forgotPassword', element: <ForgotPasswordView /> },
        { path: 'resetPassword', element: <ResetPasswordView /> },
        { path: '404', element: <NotFoundView /> },
        { path: '/', element: <Navigate to="/app/sites" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    }
  ];

}
export { routes };
