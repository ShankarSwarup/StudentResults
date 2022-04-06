import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from "react-dom";
import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
import Form from './pages/Form';
import Excel from './pages/Excel';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form" element={<Form />} />
        <Route path="excel" element={<Excel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App