import styled from 'styled-components';

export const SignInContainer = styled.div`
  display: flex;
  min-height: 100vh;
  min-width: 100vw;
  background: #fff;
`;
export const Main = styled.div`
  width: 340px;
  margin: 15vh auto auto auto;
  top: 20vh;
`;
export const Header = styled.div`
  margin-bottom: 20px;
  text-align: center;
  text-shadow: none;

  h1 {
    font-size: 24px;
    font-weight: 300;
    letter-spacing: -0.5px;
  }
`;
export const Body = styled.div`
  border: 1px solid #eaecef;
  border-radius: 5px;
  background-color: #f9f9f9;
  padding: 20px;
`;
export const ButtonsBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
export const NewUserContainer = styled.div`
  text-align: center;
  margin-top: 25px;
  border: 1px solid #eaecef;
  border-radius: 5px;
  padding: 10px 20px;
`;
