import { useState } from "react";
import "./Product.css";
import Footer from "../Footer/Footer";

const IMAGES = [
    "https://img.freepik.com/premium-photo/box-sweet-sweet-treats-with-sign-that-says-bangles-bottom_1166688-7784.jpg?w=360",
    "https://ashasweetcenter.com/cdn/shop/articles/IMG_3378_4727e19c-d225-4e8e-aae6-29df5cab768b.jpg?v=1752060410",
    "https://ashasweetcenter.com/cdn/shop/articles/IMG_3378_4727e19c-d225-4e8e-aae6-29df5cab768b.jpg?v=1752060410"
];

const ACCORDION_DATA = [
    {
        id: "details",
        title: "Product Details",
        content:
            "Each batch of Motichoor Laddu is handcrafted using fine besan, pure ghee, and fragrant cardamom. Prepared fresh to order using time-honoured techniques passed down through generations.",
    },
    {
        id: "shipping",
        title: "Shipping & Returns",
        content:
            "Delivered within 5-7 business days across India in our signature gift-ready packaging. Returns accepted within 3 days of delivery if the product is damaged.",
    },
    {
        id: "faq",
        title: "FAQs",
        content:
            "How should I store these? Keep in a cool, dry place, away from direct sunlight. Shelf life is 60 days from the date of packing. For bulk orders, please contact us directly.",
    },
];

const REVIEWS = [
    {
        stars: 5,
        text: "Absolutely divine — the ghee fragrance alone is worth it. Ordered for Diwali and the whole family was impressed.",
        author: "Sneha P.",
        date: "November 2024",
    },
    {
        stars: 4,
        text: "Good quality and beautifully packaged. The laddus were soft and not overly sweet. Will order again.",
        author: "Madhuri K.",
        date: "October 2024",
    },
    {
        stars: 5,
        text: "Best Motichoor Laddu I've had outside of Jaipur. The texture is perfect — melt in your mouth.",
        author: "Arjun S.",
        date: "September 2024",
    },
    {
        stars: 5,
        text: "Best Motichoor Laddu I've had outside of Jaipur. The texture is perfect — melt in your mouth.",
        author: "Arjun S.",
        date: "September 2024",
    }
];

const RELATED_PRODUCTS = [
    {
        name: "Besan Laddu",
        price: "₹210",
        weight: "250g",
        badge: "Bestseller",
        img: "https://ashasweetcenter.com/cdn/shop/articles/IMG_3378_4727e19c-d225-4e8e-aae6-29df5cab768b.jpg?v=1752060410"
    },
    {
        name: "Kaju Katli",
        price: "₹380",
        weight: "250g",
        badge: "Premium",
        img: "https://ashasweetcenter.com/cdn/shop/articles/IMG_3378_4727e19c-d225-4e8e-aae6-29df5cab768b.jpg?v=1752060410"
    },
    {
        name: "Coconut Laddu",
        price: "₹190",
        weight: "250g",
        badge: null,
        img: "https://ashasweetcenter.com/cdn/shop/articles/IMG_3378_4727e19c-d225-4e8e-aae6-29df5cab768b.jpg?v=1752060410"
    },
    {
        name: "Gulab Jamun",
        price: "₹160",
        weight: "500ml",
        badge: "Fresh Daily",
        img: "https://ashasweetcenter.com/cdn/shop/articles/IMG_3378_4727e19c-d225-4e8e-aae6-29df5cab768b.jpg?v=1752060410"
    },
];

export default function Product() {
    const [activeImg, setActiveImg] = useState(0);
    const [weight, setWeight] = useState("200g");
    const [quantity, setQuantity] = useState(1);
    const [activeAcc, setActiveAcc] = useState(null);

    return (
        <>
            <div className="main-section">
                <div className="pp-root row">
                    <div className="pp-breadcrumb div-80">
                        Home / All Products / <span>Motichoor Laddu</span>
                    </div>

                    <div className="pp-main div-80">
                        {/* Images */}
                        <div className="pp-images">
                            <div className="pp-main-img-wrap">
                                <div className="pp-badge">Freshly Made</div>
                                <img src={IMAGES[activeImg]} alt="Motichoor Laddu" />
                            </div>

                            <div className="pp-thumbs">
                                {IMAGES.map((src, i) => (
                                    <div
                                        key={i}
                                        className={`pp-thumb ${activeImg === i ? "active" : ""}`}
                                        onClick={() => setActiveImg(i)}
                                    >
                                        <img src={src} alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="pp-info">
                            <h1 className="pp-title">
                                Motichoor<br />Laddu
                            </h1>

                            <div className="pp-rating">
                                <span className="pp-stars">★★★★★</span>
                                <span className="pp-rating-text">
                                    4.9 · 44 verified reviews
                                </span>
                            </div>

                            <div className="pp-price-row">
                                <span className="pp-price">₹230</span>
                            </div>

                            <p className="pp-shipping">
                                Price inclusive of shipping &amp; taxes
                            </p>

                            {/* Weight */}
                            <p className="pp-label">Weight</p>
                            <div className="pp-weight-btns">
                                {["250g", "500g", "1 KG"].map((w) => (
                                    <button
                                        key={w}
                                        className={`pp-weight-btn ${weight === w ? "active" : ""
                                            }`}
                                        onClick={() => setWeight(w)}
                                    >
                                        {w}
                                    </button>
                                ))}
                            </div>

                            {/* Quantity */}
                            <p className="pp-label">Quantity</p>
                            <div className="pp-qty-row">
                                <div className="pp-qty-ctrl">
                                    <button
                                        className="pp-qty-btn"
                                        onClick={() =>
                                            setQuantity((q) => Math.max(1, q - 1))
                                        }
                                    >
                                        −
                                    </button>
                                    <span className="pp-qty-num">{quantity}</span>
                                    <button
                                        className="pp-qty-btn"
                                        onClick={() => setQuantity((q) => q + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button className="pp-cta">Add to Cart</button>
                            <button className="pp-cta-alt">Buy Now</button>

                            {/* Features */}
                            <div className="pp-features">
                                <div className="pp-feat">
                                    <span className="pp-feat-icon">🫙</span>
                                    <span className="pp-feat-label">Freshly Made</span>
                                    <span>to order</span>
                                </div>
                                <div className="pp-feat">
                                    <span className="pp-feat-icon">📅</span>
                                    <span className="pp-feat-label">60 Days</span>
                                    <span>shelf life</span>
                                </div>
                                <div className="pp-feat">
                                    <span className="pp-feat-icon">🎁</span>
                                    <span className="pp-feat-label">Premium</span>
                                    <span>packaging</span>
                                </div>
                            </div>

                            {/* Accordion */}
                            <div className="pp-accordion">
                                {ACCORDION_DATA.map(({ id, title, content }) => (
                                    <div className="pp-acc-item" key={id}>
                                        <div
                                            className="pp-acc-head"
                                            onClick={() =>
                                                setActiveAcc(
                                                    activeAcc === id ? null : id
                                                )
                                            }
                                        >
                                            <span>{title}</span>
                                            <span
                                                className={`pp-acc-icon ${activeAcc === id ? "open" : ""
                                                    }`}
                                            >
                                                +
                                            </span>
                                        </div>

                                        {activeAcc === id && (
                                            <div className="pp-acc-body">
                                                {content}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pp-ymal">
                        <div className="pp-ymal-inner div-80">
                            <div className="pp-ymal-header">
                                <h2 className="pp-ymal-title">You May Also Like</h2>
                            </div>

                            <div className="pp-ymal-grid">
                                {RELATED_PRODUCTS.map((p, i) => (
                                    <div className="pp-ymal-card" key={i}>
                                        <div className="pp-ymal-img-wrap">
                                            {p.badge && (
                                                <span className="pp-ymal-badge">{p.badge}</span>
                                            )}
                                            <img src={p.img} alt={p.name} />
                                        </div>
                                        <div className="pp-ymal-info">
                                            <span className="pp-ymal-name">{p.name}</span>
                                            <span className="pp-ymal-weight">{p.weight}</span>
                                            <div className="pp-ymal-bottom">
                                                <span className="pp-ymal-price">{p.price}</span>
                                                <button className="pp-ymal-btn">Add +</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="pp-reviews div-80">
                        <div className="pp-reviews-inner">
                            <div className="pp-reviews-header">
                                <h2 className="pp-reviews-title">
                                    Customer Reviews
                                </h2>
                                <span className="pp-reviews-count">
                                    44 reviews · 4.9 avg
                                </span>
                            </div>

                            <div className="pp-review-grid">
                                {REVIEWS.map((r, i) => (
                                    <div className="pp-review-card" key={i}>
                                        <div className="pp-review-stars">
                                            {"★".repeat(r.stars)}
                                            {"☆".repeat(5 - r.stars)}
                                        </div>
                                        <p className="pp-review-text">
                                            {r.text}
                                        </p>
                                        <span className="pp-review-author">
                                            {r.author} · {r.date}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>



            <Footer />
        </>
    );
}