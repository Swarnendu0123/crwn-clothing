import { createContext, useEffect, useState } from "react";

const getCartItem = (cartItems, productToAdd) => {
    //find if the product already exists in the cart
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    //if it exists, increase the quantity by 1
    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id ?
                { ...cartItem, quantity: cartItem.quantity + 1 }
                :
                cartItem)
    }
    //if it doesn't exist, add the product to the cart with a quantity of 1
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const getCartItemDecrement = (cartItems, productToDecrement) => {
    //find if the product already exists in the cart
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToDecrement.id);
    //if it exists, decrease the quantity by 1
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToDecrement.id)
    }
    return cartItems.map(cartItem =>
        cartItem.id === productToDecrement.id ?
            { ...cartItem, quantity: cartItem.quantity - 1 }
            :
            cartItem)
}

const clearCartItem = (cartItems, productToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        const newCartItems = getCartItem(cartItems, productToAdd);
        setCartItems(newCartItems)
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = getCartItemDecrement(cartItems, productToRemove)
        setCartItems(newCartItems)
    }
    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear)
        setCartItems(newCartItems)
    }

    useEffect(() => {
        setCartCount(cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0))
    }, [cartItems])

    useEffect(() => {
        setCartTotal(cartItems.reduce((acc, cartItem) => acc + cartItem.quantity * cartItem.price, 0))
    }, [cartItems])

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartCount: cartCount,
        cartTotal: cartTotal
    }
    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}