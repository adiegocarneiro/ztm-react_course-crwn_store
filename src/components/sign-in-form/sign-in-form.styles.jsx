import styled from 'styled-components';

export const SignInContainer = styled.div`
    display:flex;
    flex-direction: column;
    width:380px;
    justify-content: space-between;
    border: 1px solid rgb(223, 223, 223);
    padding:16px;
    border-radius:8px;
    
    h2 {
        margin: 16px, 0;
    }
`

export const FormButtons = styled.div`
    display:flex;
    justify-content: flex-end;
`

export const FormButtonsGoogle = styled.div`
    margin-top:16px;
    border-top: 2px solid rgb(219, 219, 219);
    justify-content: flex-end;
`
