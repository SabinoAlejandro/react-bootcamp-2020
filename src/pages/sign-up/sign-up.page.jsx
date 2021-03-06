import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import FormInput from '../../components/form-input';
import CustomButton from '../../components/custom-button';

import { auth, createUserProfileDocument } from '../../utils/js/firebase';

import {
  SignUpContainer,
  Main,
  Header,
  Body,
  ButtonsBarContainer,
} from './sign-up.styles';

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUpPage() {
  const history = useHistory();
  const [state, setState] = useState(initialState);
  const { displayName, email, password, confirmPassword } = state;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.log("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, { displayName });

      setState({
        ...state,
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      history.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <SignUpContainer>
      <Main>
        <Header>
          <h1>Sign up</h1>
        </Header>
        <Body>
          <form onSubmit={handleSubmit}>
            <FormInput
              type='text'
              name='displayName'
              value={displayName}
              handleChange={handleChange}
              label='Display Name'
              required
            />
            <FormInput
              name='email'
              type='email'
              handleChange={handleChange}
              value={email}
              label='Email'
              required
            />
            <FormInput
              name='password'
              type='password'
              value={password}
              handleChange={handleChange}
              label='Password'
              required
            />
            <FormInput
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              handleChange={handleChange}
              label='Confirm Password'
              required
            />
            <ButtonsBarContainer>
              <CustomButton type='submit'> Create account </CustomButton>
            </ButtonsBarContainer>
          </form>
        </Body>
      </Main>
    </SignUpContainer>
  );
}

export default SignUpPage;
