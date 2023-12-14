// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Alunos from '../pages/students';
import Cursos from '../pages/courses';
import Register from '../pages/register';
import Login from '../pages/login';
import ProtectedRoute from '../services/protected_route';

const App = () => {
    return (
        <Router>
            <Routes>
                    <Route path="/alunos" element={<ProtectedRoute><Alunos/></ProtectedRoute>} />
                    <Route path="/cursos" element={<ProtectedRoute><Cursos/></ProtectedRoute>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/" element={<Login/>} />
            </Routes>
        </Router>
    );
};

export default App;