import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCartData } from '../../Redux/cart.redux'
import './Items.css'

function Items({ data }) {
    const [counts, setCounts] = useState({})
    const dispatch = useDispatch() 

    const getCount = (index) => counts[index] ?? 1

    const updateCount = (index, delta) => {
        setCounts(prev => ({
            ...prev,
            [index]: Math.max(1, (prev[index] ?? 1) + delta)
        }))
    }

    const handleCart = (value, index) => { 
        const cartItem = {
            _id: value._id,
            productName: value.productName,
            selectedSize: value.productPrice[0].size,
            price: value.productPrice[0].price,
            productImages: value.productImages,
            quantity: getCount(index)
        }
        dispatch(setCartData(cartItem))
    }

    return (
        <>
            <section className="items-display-container-main row-sb">
                {data && data.map((value, index) => (
                    <div key={index} className="item-card-container">
                        <div className="item-image-container">
                            <img className='product-image' src={value.productImages[0]} alt="image-name" />
                            <img className='product-image-hide' src={value.productImages[1]} alt="product-image-hide" />
                        </div>
                        <div className="item-details-container">
                            <h2 className='item-name'>{value.productName}</h2>
                            <span>₹ {value.productPrice[0].price}</span>
                            <div className="item-list-container row-sb">
                                <div className="item-count-container row-sb">
                                    <button onClick={() => updateCount(index, -1)}>-</button>
                                    <p>{getCount(index)}</p>
                                    <button onClick={() => updateCount(index, +1)}>+</button>
                                </div>
                                <div className="item-add-container">
                                    <button 
                                        className='item-add-btn'
                                        onClick={() => handleCart(value, index)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    )
}

export default Items