import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Aquí se pueden agregar más rutas según sea necesario */}
      {/* <Route path="/estudiantes" element={<Estudiantes />} /> */}
      {/* <Route path="/profesores" element={<Profesores />} /> */}
      {/* <Route path="/cursos" element={<Cursos />} /> */}
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
}

export default App;
