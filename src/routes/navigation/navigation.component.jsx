import { useContext } from 'react';
import { Outlet, Link } from "react-router-dom"
import './navigation.styles.scss';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from '../../utils/firebase.utils';

const Navigation = () =>{
    const { currentUser } = useContext(UserContext);
    
    return(
    <>
        <div className='navigation'>
            <Link className="logo-container" to="/">
                <div>
                    <CrwnLogo className='logo'/>
                </div>
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'>
                    SHOP
                </Link>
                {
                    currentUser ? 
                    (
                        <span 
                            className='nav-link'
                            onClick={signOutUser}
                        >
                            SIGN OUT
                        </span>
                    ) 
                    :
                    (
                        <Link className="nav-link" to='/authentication'>
                            SIGN IN
                        </Link>
                    )
                }
            </div>
        </div>
        <Outlet />
    </>
    )
}

export default Navigation;