import { useState, createContext } from 'react';

const addCartItem = (cartItems,productToAdd) => {

    const existingCartItem = cartItems.find((cartItem)=>cartItem.id === productToAdd.id);
    
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            {...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem )
    }

    return [...cartItems, {...productToAdd, quantity:1}]
}

export const CartContext = createContext({
    isCartOpen:false,
    cartItems:[],
    setIsCartOpen:()=>{},
    addItemToCart:()=>{}
})

export const CartProvider = ({children}) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);

    const addItemToCart = ( productToAdd ) => {
        setCartItems(addCartItem(cartItems,productToAdd))
    }

    const values = {isCartOpen, cartItems, setIsCartOpen , addItemToCart}

    return(
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    )
}

