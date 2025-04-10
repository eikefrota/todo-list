import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login.jsx';
import Cadastro from './components/Cadastro/Cadastro.jsx';
import Tarefas from './components/Tarefas/Tarefas.jsx';
import Inicio from './components/Inicio/Inicio.jsx';

function App() {
  return (
    <Router>
      <ToastContainer position="top-center" autoClose={1500} />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/tarefas" element={<Tarefas />} />
      </Routes>
    </Router>
  );
}

export default App;