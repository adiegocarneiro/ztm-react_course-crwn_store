import { useReducer, createContext } from 'react';
import { createAction } from '../utils/reducer/reducer.util'

export const CART_ACTION_TYPES = {
  TOGGLE_CART_OPEN: 'TOGGLE_CART_OPEN',
  UPDATE_CART_COUNT: 'UPDATE_CART_COUNT',
  UPDATE_CART_TOTAL: 'UPDATE_CART_TOTAL',
  UPDATE_CART_ITEMS: 'UPDATE_CART_ITEMS'
}

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

const cartReducer = (state, action) => {
  const { type, payload } = action
  
  switch(type){
    case CART_ACTION_TYPES.UPDATE_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cart reducer.`)
  }
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

const INITIAL_CART_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

export const CartProvider = ({children}) => {
  const [ { isCartOpen, cartItems, cartCount, cartTotal }, dispatch ] = useReducer(cartReducer, INITIAL_CART_STATE)

  const updateCartReducer = ( newCartItems ) => {
    const newCartCount = newCartItems.reduce((total,currentItem)=>{
      return total + currentItem.quantity;
    },0)

    const newCartTotal = newCartItems.reduce((total,currentItem)=>{
      return total + currentItem.quantity * currentItem.price;
    },0)

    dispatch(createAction(CART_ACTION_TYPES.UPDATE_CART_ITEMS, {
      cartItems: newCartItems, 
      cartCount: newCartCount, 
      cartTotal: newCartTotal
    }))
  }

  const addItemToCart = ( productToAdd ) => {
    const newCartItems = addCartItem(cartItems,productToAdd)
    updateCartReducer(newCartItems)
  }

  const removeItemFromCart = ( cartItemToRemove ) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    updateCartReducer(newCartItems)
  }

  const deleteItemFromCart = ( cartItemToDelete ) =>{
    const newCartItems = deleteCartItem(cartItems, cartItemToDelete)
    updateCartReducer(newCartItems)
  }

  const setIsCartOpen = () => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, !isCartOpen))
  }
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

