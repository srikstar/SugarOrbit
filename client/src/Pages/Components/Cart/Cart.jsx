import React from 'react'

import './Cart.css'

function Cart({ close }) {

    const handleClose = () => {
        close(false)
    }

    const handleBackdrop = (e) =>{
        e.stopPropagation()
    }

    return (
        <>
            <section className="cart-main-container" onClick={handleClose}>
                <div className="cart-content-div row" onClick={(e) => handleBackdrop(e)}>
                    <div className="cart-heading-container row-sb">
                        <h1>Order Cart</h1>
                        <span onClick={handleClose}>✖</span>
                    </div>
                    <div className="cart-items-container">

                        <div className="cart-item-max row-top">
                            <div className="item">

                            </div>
                            <div className="item">

                            </div>
                            <div className="item">

                            </div>
                            <div className="item">

                            </div>
                            <div className="item">

                            </div>
                            <div className="item">

                            </div>
                            <div className="item">

                            </div>
                        </div>

                    </div>

                    <div className="cart-cost-container row">
                        <div className="cart-total-container row-sb">
                            <h4>Total <br /><p>Exc of Tax</p></h4>
                            <h4>$600</h4>
                        </div>

                        <div className="cart-checkout-container-btn">
                            <button className="checkout-btn">
                                <p>Proceed →</p>
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Cart