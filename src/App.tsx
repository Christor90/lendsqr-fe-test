import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import { Users } from './pages/Users/Users';
import { Header } from './components/common/Header/Header';
import { Sidebar } from './components/common/Sidebar/Sidebar';
import styles from './App.module.scss';
import { UserDetails } from './pages/UserDetails/UserDetails';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route - No Header/Sidebar */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes - With Header/Sidebar */}
        <Route
          path="/*"
          element={
            <div className={styles.appLayout}>
              <Header />
              <div className={styles.contentWrapper}>
                <Sidebar />
                <main className={styles.mainContent}>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/users/:userId" element={<UserDetails />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
