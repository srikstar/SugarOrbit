import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import './ItemsCarousel.css';

function ItemsCarousel({ items, title, description }) {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(true);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleScrollLeft = () => {
        scrollRef.current?.scrollBy({
            left: -400,
            behavior: 'smooth'
        });
    };

    const handleScrollRight = () => {
        scrollRef.current?.scrollBy({
            left: 400,
            behavior: 'smooth'
        });
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    return (
        <div className="home-section-two-container">
            <div className="item-title-view-all-container row-sb">
                <h3>{title}</h3>
                <Link to='/' className='view-all-link'>View All →</Link>
            </div>

            <div className="home-para-one">
                <p>{description}</p>
            </div>
            <div className="items-scroll-wrapper">
                {showLeftButton && (
                    <button className="scroll-button scroll-left row" onClick={handleScrollLeft}>
                        ←
                    </button>
                )}

                <div
                    className={`items-display-main-container column ${isDragging ? 'dragging' : ''}`}
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onScroll={handleScroll}
                >
                    <div className="item-display-max">
                        {items.map((item, i) => (
                            <div className="item-display-container" key={i}>
                                <span className="order-count">{item.orders}k orders</span>

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="item-image"
                                    draggable="false"
                                />

                                <h4>{item.name}</h4>
                                <p>{item.description}</p>

                                <div className="item-size-container row-fs">
                                    {item.weight.map((w, index) => (
                                        <div
                                            key={index}
                                            className={`item-size row ${index !== 0 ? 'item-size-n' : ''}`}
                                        >
                                            <span>{w}</span>
                                        </div>
                                    ))}
                                </div>

                                <button className="item-add-btn">Add to cart</button>
                            </div>
                        ))}
                    </div>
                </div>

                {showRightButton && (
                    <button className="scroll-button scroll-right" onClick={handleScrollRight}>
                        →
                    </button>
                )}
            </div>
        </div>
    );
}

export default ItemsCarousel;