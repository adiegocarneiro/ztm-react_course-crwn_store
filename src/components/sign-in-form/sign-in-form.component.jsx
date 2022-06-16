import { useState } from 'react';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import { 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword 
} from '../../utils/firebase.utils';

const defaultFormFields = {
    email: '',
    password:'',
}

const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password} = formFields;

    const handleChange = (event)=>{
        const { name, value } = event.target;
        setFormFields({...formFields, [name]:value})
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        signInAuthUserWithEmailAndPassword(email,password)
            .then((value)=>{
                if(value){
                    resetFormFields();
                }
            })
            .catch((err)=>{
                const { code } = err;
                switch(code){
                    case 'auth/wrong-password':
                        alert('incorrect password for email');
                        break;
                    case 'auth/user-not-found':
                        alert('no user associated with this email');
                        break;
                    default:
                        console.log(err);
                }
            })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        signInWithGooglePopup();
        resetFormFields();
    }

    return(
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your e-mail and password</span>
            <form onSubmit={handleSubmit} >
                <FormInput
                    label='email'
                    type='email' 
                    name='email' 
                    onChange={handleChange} 
                    required value={email}
                />
                <FormInput 
                    label='password'
                    type='password' 
                    name='password' 
                    onChange={handleChange} 
                    required value={password}
                />
                <div className='form-buttons'>
                    <Button 
                        type='submit'
                    >
                        SIGN IN
                    </Button>
                </div>
            </form>
            <div className='form-buttons-google'>
                <h2>
                    Or sign in with your Google account
                </h2>
                <Button 
                    buttonType='google' 
                    onClick={signInWithGoogle}
                    type='button'
                >
                    GOOGLE SIGN IN
                </Button>
            </div>
        </div>
    )
}

export default SignInForm;