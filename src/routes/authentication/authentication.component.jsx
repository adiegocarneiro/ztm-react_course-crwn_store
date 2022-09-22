import { useEffect, useContext } from 'react';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { UserContext } from '../../contexts/user.context';
import { Navigate } from 'react-router-dom';
import {AuthenticationContainer} from './authentication.styles.jsx';

const Authentication = ()=>{
  const { currentUser } = useContext(UserContext)

  return(
    <AuthenticationContainer>
      {
        currentUser ?
        <Navigate to='/'/>
        :
        <>
          <SignInForm />
          <SignUpForm />
        </>
      }
        
    </AuthenticationContainer>
  )
}

export default Authentication;