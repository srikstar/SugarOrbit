import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Cart.css'

const initialCartItems = [
  {
    id: 1,
    name: 'Motichoor Laddu',
    size: '200g',
    price: 230,
    quantity: 2,
    image: "https://ashasweetcenter.com/cdn/shop/articles/IMG_3378_4727e19c-d225-4e8e-aae6-29df5cab768b.jpg?v=1752060410"
  },
  {
    id: 2,
    name: 'Kaju Katli',
    size: '200g',
    price: 370,
    quantity: 1,
    image: "https://ashasweetcenter.com/cdn/shop/articles/IMG_3378_4727e19c-d225-4e8e-aae6-29df5cab768b.jpg?v=1752060410"
  },
  {
    id: 3,
    name: 'Besan Laddu',
    size: '250g',
    price: 210,
    quantity: 1,
    image: "https://ashasweetcenter.com/cdn/shop/articles/IMG_3378_4727e19c-d225-4e8e-aae6-29df5cab768b.jpg?v=1752060410"
  },
  {
    id: 3,
    name: 'Besan Laddu',
    size: '250g',
    price: 210,
    quantity: 1,
    image: "https://ashasweetcenter.com/cdn/shop/articles/IMG_3378_4727e19c-d225-4e8e-aae6-29df5cab768b.jpg?v=1752060410"
  },
  {
    id: 3,
    name: 'Besan Laddu',
    size: '250g',
    price: 210,
    quantity: 1,
    image: "https://ashasweetcenter.com/cdn/shop/articles/IMG_3378_4727e19c-d225-4e8e-aae6-29df5cab768b.jpg?v=1752060410"
  },
  {
    id: 3,
    name: 'Besan Laddu',
    size: '250g',
    price: 210,
    quantity: 1,
    image: "https://ashasweetcenter.com/cdn/shop/articles/IMG_3378_4727e19c-d225-4e8e-aae6-29df5cab768b.jpg?v=1752060410"
  }
]



function CartItem({ item, onRemove, onIncrease, onDecrease }) {


  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details column-s">
        <div className="cart-item-header row-sb div">
          <span className="cart-item-name">{item.name}</span>
          <button className="cart-item-remove" onClick={() => onRemove(item.id)}>✕</button>
        </div>
        <span className="cart-item-meta">Weight: {item.size}</span>
        <div className="cart-item-footer row-sb div">
          <span className="cart-item-price">₹ {item.price}</span>
          <div className="qty-control row">
            <button className="qty-btn" onClick={() => onDecrease(item.id)}>−</button>
            <span className="qty-value">{item.quantity}</span>
            <button className="qty-btn" onClick={() => onIncrease(item.id)}>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Cart({ onClose, isOpen }) {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const navigate = useNavigate()

  const handleCheckout = () => {
    navigate("/checkout")
  }

  const handleRemove = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleIncrease = (id) => {
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    )
  }

  const handleDecrease = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
          : item
      )
    )
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className={`cart-main-container ${isOpen ? 'cart-open' : ''}`} onClick={onClose}>
      <div className="card-container column-s" onClick={(e) => e.stopPropagation()}>

        <div className="cart-header row-sb div">
          <span className="cart-title">Cart</span>
          <button className="cart-close-btn row" onClick={onClose}>
            <span>✕</span> Close
          </button>
        </div>

        <div className="cart-subheader row-fs div">
          <span className="cart-count">{totalItems} Items</span>
          <span className="cart-hold-text">It's in the bag. We'll hold it for an hour</span>
        </div>

        <div className="cart-divider" />

        <div className="cart-items-wrapper div">
          {cartItems.length === 0 ? (
            <div className="cart-empty column">
              <span>Your cart is empty.</span>
            </div>
          ) : (
            cartItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <CartItem
                  item={item}
                  onRemove={handleRemove}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />
                {index < cartItems.length - 1 && <div className="cart-divider" />}
              </React.Fragment>
            ))
          )}
        </div>

        <div className="cart-footer div">
          <div className="cart-divider" />
          <div className="cart-total row-sb">
            <span className="cart-total-label">Total</span>
            <span className="cart-total-value">₹ {total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn div" onClick={() => {
            onClose();
            handleCheckout();
          }}>Checkout</button>
        </div>

      </div>
    </div>
  )
}

export default Cart