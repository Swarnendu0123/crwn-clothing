import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./cart-dropdown.styles.scss";
import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {

    const { cartItems, setIsCartOpen } = useContext(CartContext)

    const ButtonType = cartItems.length === 0 ? "disabled" : "inverted"

    const navigate = useNavigate();
    const goToCheckOutHandler = () => {
        navigate("/checkout");
        setIsCartOpen(false);
    }

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items" >
                {cartItems.length ? (
                    cartItems.map(cartItem =>
                        <CartItem cartItem={cartItem} key={cartItem.id} />)
                ) :
                    <span className="empty-message">Your cart is empty</span>
                }
            </div>
            <Button
                buttonType={ButtonType}
                onClick={goToCheckOutHandler}
            >
                GO TO CHECKOUT
            </Button>
        </div>
    )
}

export default CartDropdown;