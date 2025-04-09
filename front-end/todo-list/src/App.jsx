import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Cadastro from './components/Cadastro/Cadastro.jsx';
import Tarefas from './components/Tarefas/Tarefas.jsx';
import Inicio from './components/Inicio/Inicio.jsx';

function App() {
  return (
    <Router>
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