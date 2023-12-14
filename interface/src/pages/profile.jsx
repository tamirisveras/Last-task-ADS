import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Aqui você deve implementar a lógica para obter os dados do usuário logado
    // Pode ser do estado global, cookies, local storage, etc.

    // Exemplo: obtendo dados do local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Certifique-se de que esta dependência está vazia se você só quiser executar isso uma vez

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      {user ? (
        <div>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Adicione mais campos conforme necessário */}
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default ProfilePage;
