import React, { useState } from 'react'
import './Items.css'

function Items() {
    const [count, setCount] = useState(1)

    return (
        <>
            <section className="items-display-container-main row-sb">
                <div className="item-card-container">
                    <div className="item-image-container">
                        <img className='product-image' src="https://img.freepik.com/premium-photo/box-sweet-sweet-treats-with-sign-that-says-bangles-bottom_1166688-7784.jpg?w=360" alt="image-name" />
                        <img className='product-image-hide' src="https://ashasweetcenter.com/cdn/shop/articles/IMG_3378_4727e19c-d225-4e8e-aae6-29df5cab768b.jpg?v=1752060410" alt="product-image-hide" />
                    </div>
                    <div className="item-details-container">
                        <h2 className='item-name'>Mysure Pak</h2>
                        <span>₹ 260</span>
                        <div className="item-list-container row-sb">
                            <div className="item-count-container row-sb">
                                <button onClick={() => setCount(c => Math.max(1, c - 1))}>-</button>
                                <p>{count}</p>
                                <button onClick={() => setCount(c => c + 1)}>+</button>
                            </div>
                            <div className="item-add-container">
                                <button className='item-add-btn'>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Items