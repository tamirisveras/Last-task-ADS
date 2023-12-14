import axios from 'axios';



const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});


export const login = async (credentials) => {
    try {
        const { data } = await api.post('/auth/login', credentials);
        return data;
    } catch (error) {
        throw error;
    }
};

export const registrar = async (dadosUsuario, token) => {
    try {
        const { data } = await api.post('/usuarios', dadosUsuario, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
};

export const verificarToken = async (token) => {
    try {
        console.log("verificando")
        const response = await api.post('/auth/verifyToken', null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data.valid)
        return response.data.valid;
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        return false;
    }
};

export const criarAluno = async (aluno, token) => {
    try {
        const { data } = await api.post('/alunos', aluno, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const buscarAlunos = async (token) => {
    try {
        const { data } = await api.get('/alunos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const buscarAlunoPorId = async (id, token) => {
    try {
        const { data } = await api.get(`/alunos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const editarAluno = async (id, aluno, token) => {
    try {
        const { data } = await api.put(`/alunos/${id}`, aluno, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const removerAluno = async (id, token) => {
    try {
        const { data } = await api.delete(`/alunos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const criarCurso = async (curso, token) => {
    try {
        const { data } = await api.post('/cursos', curso, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const buscarCursos = async (token) => {
    try {
        const { data } = await api.get('/cursos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const buscarCursoPorId = async (id, token) => {
    try {
        const { data } = await api.get(`/cursos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const editarCurso = async (id, curso, token) => {
    try {
        const { data } = await api.put(`/cursos/${id}`, curso, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const removerCurso = async (id, token) => {
    try {
        const { data } = await api.delete(`/cursos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const buscarAlunosPorCurso = async (id, token) => {
    try {
        const { data } = await api.get(`/alunoscurso/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export default api;