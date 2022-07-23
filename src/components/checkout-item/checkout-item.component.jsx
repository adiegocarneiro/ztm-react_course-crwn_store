import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem}) =>{
    const { name, imageUrl, price, quantity } = cartItem;
    const {addItemToCart,removeItemFromCart, deleteItemFromCart} = useContext(CartContext);
    
    const handleDeleteItem = () =>{
        deleteItemFromCart(cartItem);
    }

    const handleIncreaseItem = () =>{
        addItemToCart(cartItem);
    }

    const handleDecreaseItem = () =>{
        removeItemFromCart(cartItem);
    }

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name}/>
            </div>
            <span className='name'>{name}</span>

            <span className='quantity'>
                <div onClick={handleDecreaseItem} className="arrow">
                    &#10094;
                </div>
                <span className="value">
                    {quantity}
                </span>
                <div onClick={handleIncreaseItem} className="arrow">
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div onClick={handleDeleteItem} className='remove-button'>
                &#10005;
            </div>
        </div>
    )
}

export default CheckoutItem;