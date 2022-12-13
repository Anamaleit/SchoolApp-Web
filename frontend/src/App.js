import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/Home'
import Nilai from './pages/Nilai'
import Absensi from './pages/Absensi'
import StatusPembayaran from './pages/StatusPembayaran'
import Keterangan from './pages/Keterangan'
import Navbar from './components/Navbar';
import Login from './pages/Login'
import Signup from './pages/Signup'
import Raw from './pages/Raw'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element= {user ? <Home/> : <Navigate to="/login"/>}
            />
            <Route
              path="/Nilai"
              element= {user ? <Nilai/> : <Navigate to="/Nilai"/>}
            />
            <Route
              path="/Absensi"
              element= {user ? <Absensi/> : <Navigate to="/Absensi"/>}
            />
            <Route
              path="/StatusPembayaran"
              element= {user ? <StatusPembayaran/> : <Navigate to="/StatusPembayaran"/>}
            />
            <Route
              path="/Keterangan"
              element= {user ? <Keterangan/> : <Navigate to="/Keterangan"/>}
            />
            <Route
              path="/login"
              element={!user ? <Login/> : <Navigate to="/"/>}
            />
            <Route
              path="/signup"
              element={!user ? <Signup/> : <Navigate to="/"/>}
            />
            <Route
              path="/raw"
              element={user ? <Raw/> : <Navigate to="/raw"/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
