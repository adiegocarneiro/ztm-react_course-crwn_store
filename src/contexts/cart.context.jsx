import { useEffect } from 'react';
import { useState, createContext } from 'react';

const addCartItem = (cartItems,productToAdd) => {

    const existingCartItem = cartItems.find((cartItem)=>cartItem.id === productToAdd.id);
    
    if(existingCartItem){
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
                ? {...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, {...productToAdd, quantity:1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find if exists
    const existingCartItem = cartItems.find((cartItem)=>cartItem.id === cartItemToRemove.id);

    //check quantity === 1 ? remove : return matching item with reduced quantity
    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem)=>cartItem.id !== cartItemToRemove.id);
    }

    return cartItems.map((cartItem) => 
        cartItem.id === cartItemToRemove.id 
            ? {...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
}

const deleteCartItem = (cartItems, cartItemToDelete)=>{
    return cartItems.filter((item)=>item.id !== cartItemToDelete.id);
}

export const CartContext = createContext({
    isCartOpen:false,
    cartItems:[],
    cartCount:0,
    cartTotal:0,
    setIsCartOpen:()=>{},
    addItemToCart:()=>{},
    removeItemFromCart:()=>{},
    deleteItemFromCart:()=>{},
})

export const CartProvider = ({children}) => {
    const [ isCartOpen, setIsCartOpen ] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [ cartCount, setCartCount ] = useState(0);
    const [ cartTotal, setCartTotal ] = useState(0);

    const addItemToCart = ( productToAdd ) => {
        setCartItems(addCartItem(cartItems,productToAdd))
    }

    const removeItemFromCart = ( cartItemToRemove ) => {
        setCartItems(removeCartItem(cartItems,cartItemToRemove))
    }

    const deleteItemFromCart = ( cartItemToDelete ) =>{
        setCartItems(deleteCartItem(cartItems,cartItemToDelete));
    }

    useEffect(()=>{
        const newCartCount = cartItems.reduce((total,currentItem)=>{
            return total + currentItem.quantity;
        },0)
        setCartCount(newCartCount);
    },[cartItems])

    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total,currentItem)=>{
            return total + currentItem.quantity * currentItem.price;
        },0)
        setCartTotal(newCartTotal);
    },[cartItems])

    const values = {
        isCartOpen, 
        cartItems, 
        cartCount, 
        cartTotal,
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        deleteItemFromCart,
    }

    return(
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    )
}

