import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles'

// Exemplo simples: se usuário = "professor" e senha = "123" então login dá certo.
function LoginPage({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === 'professor' && pass === '123') {
      onLogin('fake-token');
      navigate('/');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <S.Container>
      <S.LoginBox>
        <S.Title>Login</S.Title>
        <S.Form onSubmit={handleSubmit}>
          <S.Input
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <S.Input
            placeholder="Senha"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <S.Button type="submit">Entrar</S.Button>
        </S.Form>
      </S.LoginBox>
    </S.Container>
  );
}

export default LoginPage;
