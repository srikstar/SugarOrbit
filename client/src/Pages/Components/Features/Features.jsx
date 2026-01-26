import React, { useRef, useState } from 'react'
import './Features.css'

function Features() {
    const featuresRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - featuresRef.current.offsetLeft);
        setScrollLeft(featuresRef.current.scrollLeft);
        featuresRef.current.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (featuresRef.current) {
            featuresRef.current.style.cursor = 'grab';
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - featuresRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        featuresRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            if (featuresRef.current) {
                featuresRef.current.style.cursor = 'grab';
            }
        }
    }

    const features = [
        {
            id: 1,
            icon: (
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="12" r="3" />
                </svg>
            ),
            title: 'Sulphur-Free Process'
        },
        {
            id: 2,
            icon: (
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
            ),
            title: 'Trans Fat-Free Oil'
        },
        {
            id: 3,
            icon: (
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                    <path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
            ),
            title: '100% Vegetarian'
        },
        {
            id: 4,
            icon: (
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="11" rx="7" ry="9" />
                    <path d="M12 2v9" />
                </svg>
            ),
            title: 'Eggless'
        },
        {
            id: 5,
            icon: (
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="13" rx="9" ry="4" />
                    <path d="M12 17c-4.97 0-9-1.79-9-4v-2c0-2.21 4.03-4 9-4s9 1.79 9 4v2c0 2.21-4.03 4-9 4z" />
                    <path d="M12 3v4" />
                </svg>
            ),
            title: 'Freshly Baked'
        },
        {
            id: 6,
            icon: (
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            ),
            title: 'Handcrafted'
        }
    ];


    return (
        <>
            <div className="home-section-six-container row-sb">
                <section className="features-section">
                    <div className="features-container">
                        <div
                            className="features-grid row-sb"
                            ref={featuresRef}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            {features.map((feature) => (
                                <div key={feature.id} className="feature-item">
                                    <div className="feature-icon row">
                                        {feature.icon}
                                    </div>
                                    <h3 className="feature-title">{feature.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Features