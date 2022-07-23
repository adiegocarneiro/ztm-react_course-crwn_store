import { useContext } from 'react';
import { 
    ProductCardContainer,
    ProductCardFooter,
    ProductName,
    ProductPrice 
} from './product-card.styles.jsx'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ( {product} ) =>{
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    const handleAddClick = ()=>{
        addItemToCart(product);
    }

    return(
        <ProductCardContainer>
            <img src={imageUrl} alt={name}/>
            <ProductCardFooter>
                <ProductName>{name}</ProductName>
                <ProductPrice>{price}</ProductPrice>
            </ProductCardFooter>
            <Button buttonType={ BUTTON_TYPE_CLASSES.inverted } onClick={handleAddClick}>Add to cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard;