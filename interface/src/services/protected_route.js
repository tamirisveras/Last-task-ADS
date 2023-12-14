import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { verificarToken } from './auth_service';


const Carregando = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <h1>Carregando...</h1>
                </div>
            </div>
        </div>
    );
};

const cookies = new Cookies();

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const verifyToken = async () => {
            try {
                const token = cookies.get('jwt');
                if (!token) {
                    navigate('/', { replace: true });
                    return;
                }
                const valido = await verificarToken(token);
                if (!valido) {
                    navigate('/', { replace: true });
                }
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
                navigate('/', { replace: true });
            } finally {
                setIsLoading(false);
            }
        };
        verifyToken();
    }, [navigate]);
    if (isLoading) {
        return <Carregando />;
    }
    return children;
};
export default ProtectedRoute;