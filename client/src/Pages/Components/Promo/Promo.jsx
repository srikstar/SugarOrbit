import React from 'react'
import './Promo.css'

function Promo() {
    const promo_codes = [
        'Use code SAVE10 at checkout to enjoy an instant 10% off your order.',
        'Use code WELCOME15 and get 15% off on your first purchase today.'
    ]

    return (
        <section className="promo-main-container">
            <div className="promo-track">
                <div className="promo-slider">
                    {promo_codes && promo_codes.map((promo, index) => (
                        <div key={index} className="promo row">{promo}</div>
                    ))}
                </div>
                <div className="promo-slider">
                    {promo_codes && promo_codes.map((promo, index) => (
                        <div key={index} className="promo row">{promo}</div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Promo
