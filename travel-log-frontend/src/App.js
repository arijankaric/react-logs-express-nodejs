// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/Shared/PrivateRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TravelLogsPage from './pages/TravelLogsPage';
import JourneyPlansPage from './pages/JourneyPlansPage';
import Navbar from './components/Shared/Navbar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/journey-plans" element={<JourneyPlansPage />} />
            <Route path="/travel-logs" element={<TravelLogsPage />} />
          </Route>
      
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* <Route
            path="/travel-logs"
            element={
              // <PrivateRoute>
                <TravelLogsPage />
              // </PrivateRoute>
            }
          />
          <Route
            path="/journey-plans"
            element={
              <PrivateRoute>
                <JourneyPlansPage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
    </LocalizationProvider>
  );
}

export default App;
