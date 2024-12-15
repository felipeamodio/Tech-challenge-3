import styled from 'styled-components';

export const Container = styled.div`
  background: #0B2545; /* azul escuro */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff; 
  font-family: Arial, sans-serif;
`;

export const LoginBox = styled.div`
  background: #1B3A61;
  border: 2px solid #FFC300;
  border-radius: 10px;
  padding: 30px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  text-align: center;
`;

export const Title = styled.h1`
  color: #FFC300;
  margin-bottom: 20px;
  font-size: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 2px solid #FFC300;
  border-radius: 5px;
  font-size: 16px;
  color: #000;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #FFD700;
  }
`;

export const Button = styled.button`
  background: #FFC300;
  color: #000;
  border: none;
  padding: 10px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #FFD700;
  }
`;