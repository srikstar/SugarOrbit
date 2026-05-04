import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { increaseQuantity, decreaseQuantity, removeItem } from '../../Redux/cart.redux.js'
import './Cart.css'

function CartItem({ item, onRemove, onIncrease, onDecrease }) {
  return (
    <div className="cart-item">
      <img src={item.productImages?.[0]} alt={item.productName} className="cart-item-image" />
      <div className="cart-item-details column-s">
        <div className="cart-item-header row-sb div">
          <span className="cart-item-name">{item.productName}</span>
          <button className="cart-item-remove" onClick={() => onRemove(item)}>✕</button>
        </div>
        <span className="cart-item-meta">Weight: {item.selectedSize}</span>
        <div className="cart-item-footer row-sb div">
          <span className="cart-item-price">₹ {item.price}</span>
          <div className="qty-control row">
            <button className="qty-btn" onClick={() => onDecrease(item)}>−</button>
            <span className="qty-value">{item.quantity}</span>
            <button className="qty-btn" onClick={() => onIncrease(item)}>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Cart({ onClose, isOpen }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector(state => state.cart)  // 👈 from Redux

  const handleCheckout = () => navigate("/checkout")
  const handleRemove   = (item) => dispatch(removeItem(item))
  const handleIncrease = (item) => dispatch(increaseQuantity(item))
  const handleDecrease = (item) => dispatch(decreaseQuantity(item))

  const total      = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
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
              <React.Fragment key={`${item._id}-${item.selectedSize}`}>
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
          <button className="checkout-btn div" onClick={() => { onClose(); handleCheckout() }}>
            Checkout
          </button>
        </div>

      </div>
    </div>
  )
}

export default Cart