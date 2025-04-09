import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login.jsx';
import Cadastro from './components/Cadastro/Cadastro.jsx';
import Tarefas from './components/Tarefas/Tarefas.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tarefas />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;