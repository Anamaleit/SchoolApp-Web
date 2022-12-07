import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Nilai from './pages/Nilai'
import Absensi from './pages/Absensi'
import StatusPembayaran from './pages/StatusPembayaran'
import Keterangan from './pages/Keterangan'
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element= {<Home />}
            />
            <Route
              path="/Nilai"
              element= {<Nilai />}
            />
            <Route
              path="/Absensi"
              element= {<Absensi />}
            />
            <Route
              path="/StatusPembayaran"
              element= {<StatusPembayaran />}
            />
            <Route
              path="/Keterangan"
              element= {<Keterangan />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;