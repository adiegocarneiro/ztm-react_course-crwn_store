import styled from "styled-components";

export const BaseButton = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  border: 1px solid black;
  transition:250ms;
  
  &:hover {
    background-color: white;
    color: black;
    box-shadow: 0px 10px 10px rgba(0.5,0.5,0.5,0.1)
  }
`

export const GoogleSignInButton = styled(BaseButton)`
  border: none;
  background-color: #4285f4;
  color: white;
  width:100%;

  &:hover {
    background-color: #619eff;
    border: none;
  }
`

export const InvertedButton = styled(BaseButton)`
  background-color: white;
  color: black;
  
  &:hover {
    background-color: black;
    color: white;  
  }
`
  