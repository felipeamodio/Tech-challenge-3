import styled from 'styled-components';

export const Container = styled.div`
  background: #0B2545;
  min-height: 100vh;
  padding: 20px;
  color: #fff; 
  font-family: Arial, sans-serif;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
`;

export const Title = styled.h1`
  color: #FFC300;
  text-align: center;
`;

export const CreateButton = styled.button`
  position: absolute;
  right: 20px;
  background: #FFC300;
  color: #000;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #FFD700;
  }
`;

export const SearchInput = styled.input`
  display: block;
  margin: 0 auto 40px;
  padding: 10px;
  width: 80%;
  max-width: 400px;
  border: 2px solid #FFC300;
  border-radius: 5px;
  background: #FFFFFF;
  color: #333;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #FFD700; 
  }
`;

export const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const CardContainer = styled.div`
  background: #1B3A61;
  border: 2px solid #FFC300;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }
`;

export const CardTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
  color: #FFC300;
`;

export const CardAuthor = styled.p`
  font-size: 14px;
  margin-bottom: 0;
`;

export const DetailContent = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Button = styled.button`
  background: #FFC300;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background: #FFD700;
  }
`;

export const EditForm = styled.form`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  input, textarea {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
    color: #000;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalContent = styled.div`
  background: #1B3A61;
  border: 2px solid #FFC300;
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  color: #fff;
`;

export const ModalTitle = styled.h2`
  color: #FFC300;
  margin-bottom: 20px;
  text-align: center;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #000;
`;

export const ModalTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  height: 80px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #000;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;