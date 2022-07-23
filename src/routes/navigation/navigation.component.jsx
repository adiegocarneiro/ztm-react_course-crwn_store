import { useContext } from 'react';
import { Outlet, Link } from "react-router-dom"
import { NavigationContainer, LogoContainer, NavLink, NavLinksContainer } from './navigation.styles.jsx';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from '../../utils/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () =>{
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    
    return(
    <>
        <NavigationContainer>
            <LogoContainer to="/">
                <div>
                    <CrwnLogo className='logo'/>
                </div>
            </LogoContainer>
            <NavLinksContainer>
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                {
                    currentUser ? 
                    (
                        <NavLink 
                            as='span'
                            className='nav-link'
                            onClick={signOutUser}
                        >
                            SIGN OUT
                        </NavLink>
                    ) 
                    :
                    (
                        <NavLink to='/authentication'>
                            SIGN IN
                        </NavLink>
                    )
                }
                <CartIcon/>
            </NavLinksContainer>
            {
                isCartOpen && <CartDropdown />
            }
        </NavigationContainer>
        <Outlet />
    </>
    )
}

export default Navigation;