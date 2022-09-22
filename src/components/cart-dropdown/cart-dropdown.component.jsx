import {EmptyMessage, CartDropdownContainer, CartItems } from './cart-dropdown.styles';
import Button from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () =>{
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckoutButtonClick = () =>{
        navigate('/checkout')
    }

    return(
        <CartDropdownContainer>
            <CartItems>
            {
                cartItems.length > 0 ? (
                    cartItems.map((cartItem)=>
                        <CartItem key={cartItem.id} cartItem={cartItem}/>
                    )
                ) : (
                    <EmptyMessage>
                        No items yet
                    </EmptyMessage>
                )
            }
            </CartItems>
            
            <Button onClick={handleCheckoutButtonClick}>CHECKOUT</Button>
            
        </CartDropdownContainer>
    )
}

export default CartDropdown;