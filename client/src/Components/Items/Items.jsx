import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCartData } from '../../Redux/cart.redux'
import './Items.css'

function Items({ data, category }) {   // 👈 accept category as prop
    const [counts, setCounts] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()     // 👈 called at top level, not inside handler

    const getCount = (index) => counts[index] ?? 1

    const updateCount = (index, delta, e) => {
        e.stopPropagation()            // 👈 prevent card click when clicking +/-
        setCounts(prev => ({
            ...prev,
            [index]: Math.max(1, (prev[index] ?? 1) + delta)
        }))
    }

    const handleCart = (value, index, e) => {
        e.stopPropagation()            // 👈 prevent card click when clicking Add to Cart
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

    const handleItem = (id) => {
        navigate(`/${category}/${id}`)  // 👈 e.g. /sweets/kaju-katli
    }

    return (
        <>
            <section className="items-display-container-main row-sb">
                {data && data.map((value, index) => (
                    <div
                        key={index}
                        className="item-card-container"
                        onClick={() => handleItem(value._id)}   // 👈 navigate on card click
                    >
                        <div className="item-image-container">
                            <img className='product-image' src={value.productImages[0]} alt="image-name" />
                            <img className='product-image-hide' src={value.productImages[1]} alt="product-image-hide" />
                        </div>
                        <div className="item-details-container">
                            <h2 className='item-name'>{value.productName}</h2>
                            <span>₹ {value.productPrice[0].price}</span>
                            <div className="item-list-container row-sb">
                                <div className="item-count-container row-sb">
                                    <button onClick={(e) => updateCount(index, -1, e)}>-</button>
                                    <p>{getCount(index)}</p>
                                    <button onClick={(e) => updateCount(index, +1, e)}>+</button>
                                </div>
                                <div className="item-add-container">
                                    <button
                                        className='item-add-btn'
                                        onClick={(e) => handleCart(value, index, e)}
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