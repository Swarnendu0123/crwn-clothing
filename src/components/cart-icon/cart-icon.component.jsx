import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import { CartContext } from "../../contexts/cart.context";


const CartIcon = () => {

    const { isCartOpen, setIsCartOpen } = useContext(CartContext);
    const { cartItems } = useContext(CartContext);
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    return (
        <div className="cart-icon-container" onClick={toggleCart}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">
                {cartItems.reduce((acc, cartItems) =>
                    acc + cartItems.quantity, 0)}
            </span>
        </div>
    )
}

export default CartIcon;