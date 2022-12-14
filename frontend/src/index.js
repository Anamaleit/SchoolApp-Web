import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AnnouncementsContextProvider } from './context/AnnouncementContext';
import { AuthContextProvider } from './context/AuthContext';
import { StudentsContextProvider } from './context/StudentContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AnnouncementsContextProvider>
        <StudentsContextProvider>
          <App/>
        </StudentsContextProvider>
      </AnnouncementsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
