import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { FormButtons, SignUpContainer } from './sign-up-form.styles.jsx';

const defaultFormFields = {
    displayName: '',
    email: '',
    password:'',
    confirmPassword:''
}

const SignUpForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const handleChange = (event)=>{
        const { name, value } = event.target;
        setFormFields({...formFields, [name]:value})
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(password !== confirmPassword){
            alert('Passwords do not match');
            return;
        }
        createAuthUserWithEmailAndPassword(email,password)
            .then((value)=>{
                const { user } = value;
                createUserDocumentFromAuth(user,{displayName});
                resetFormFields();
        })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    return(
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your e-mail and password</span>
            <form onSubmit={handleSubmit} >
                <div className='form-fields'>
                <FormInput
                    label='Display name'
                    type='text' 
                    name='displayName' 
                    onChange={handleChange} 
                    required value={displayName}
                />
                <FormInput 
                    label='email'
                    type='email' 
                    name='email' 
                    onChange={handleChange} 
                    required value={email}
                />
                <FormInput 
                    label='Password'
                    type='password' 
                    name='password' 
                    onChange={handleChange} 
                    required value={password}
                />
                <FormInput 
                    label='Confirm password'
                    type='password' 
                    name='confirmPassword' 
                    onChange={handleChange} 
                    required value={confirmPassword}
                />
                </div>
                <FormButtons>
                    <Button  type='submit'>Submit</Button>
                </FormButtons>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;