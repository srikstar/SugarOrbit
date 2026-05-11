import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getProduct } from "../../API/product.api.js"
import { setProduct } from '../../Redux/product.redux.js'
import { setCartData } from '../../Redux/cart.redux.js'
import { useDispatch, useSelector } from "react-redux"
import "./Product.css"
import Footer from "../Footer/Footer"

export default function Product() {
    const { id, category } = useParams()
    const [activeImg, setActiveImg] = useState(0)
    const [weight, setWeight] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [activeAcc, setActiveAcc] = useState(null)

    const dispatch = useDispatch()
    const product = useSelector(state => state.product)

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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProduct({ category, id })
                dispatch(setProduct(data?.sweet))
                setWeight(data?.sweet?.productPrice[0]?.size)  // ← was data?.product
            } catch (error) {
                console.log(error)
            }
        }
        fetchProduct()
    }, [id, category])

    useEffect(() => {
        if (product?.productName) {
            document.title = `Sugar Orbit | ${product.productName}`
        }
    }, [product?.productName])

    const handleAddToCart = () => {
        dispatch(setCartData({
            _id: product._id,
            productName: product.productName,
            productImages: product.productImages,
            selectedSize: weight,
            price: selectedPrice,
            quantity: quantity
        }));
    };

    if (!product || !product.productName) return <div>Loading...</div>

    const selectedPrice = product.productPrice.find(p => p.size === weight)?.price

    return (
        <>
            <div className="main-section">
                <div className="pp-root row">
                    <div className="pp-breadcrumb div-80">
                        Home / {category} / <span>{product.productName}</span>
                    </div>

                    <div className="pp-main div-80">
                        <div className="pp-images">
                            <div className="pp-main-img-wrap">
                                <img src={product.productImages[activeImg]} alt={product.productName} />
                            </div>
                            <div className="pp-thumbs">
                                {product.productImages.map((src, i) => (
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

                        <div className="pp-info">
                            <h1 className="pp-title">{product.productName}</h1>
                            <p>{product.productDescription}</p>

                            <div className="pp-price-row">
                                <span className="pp-price">₹ {selectedPrice}</span>
                            </div>

                            <p className="pp-label">Weight</p>
                            <div className="pp-weight-btns">
                                {product.productPrice.map(({ size }) => (
                                    <button
                                        key={size}
                                        className={`pp-weight-btn ${weight === size ? "active" : ""}`}
                                        onClick={() => setWeight(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                            <p className="pp-label">Quantity</p>
                            <div className="pp-qty-row">
                                <div className="pp-qty-ctrl">
                                    <button className="pp-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                                    <span className="pp-qty-num">{quantity}</span>
                                    <button className="pp-qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
                                </div>
                            </div>

                            <button className="pp-cta" onClick={handleAddToCart}>Add to Cart</button>
                            <button className="pp-cta-alt">Buy Now</button>

                            <div className="pp-accordion">
                                {[
                                    { id: "details", title: "Product Details", content: product.productDetails },
                                    { id: "shipping", title: "Shipping & Returns", content: product.shippingInfo },
                                    { id: "faq", title: "FAQs", content: product.faqContent },
                                ].map(({ id, title, content }) => (
                                    <div className="pp-acc-item" key={id}>
                                        <div className="pp-acc-head" onClick={() => setActiveAcc(activeAcc === id ? null : id)}>
                                            <span>{title}</span>
                                            <span className={`pp-acc-icon ${activeAcc === id ? "open" : ""}`}>+</span>
                                        </div>
                                        {activeAcc === id && <div className="pp-acc-body">{content}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pp-ymal">
                <div className="pp-ymal-inner div-80">
                    <h2 className="pp-ymal-title">You May Also Like</h2>

                    <div className="pp-ymal-grid">
                        {RELATED_PRODUCTS.map((p, i) => (
                            <div className="pp-ymal-card" key={i}>
                                <div className="pp-ymal-img-wrap">
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

                    <div className="pp-reviews">
                        <div className="pp-reviews-inner">
                            <div className="pp-reviews-header">
                                <h2 className="pp-reviews-title">Customer Reviews</h2>
                                <span className="pp-reviews-count">4.8 avg</span>
                            </div>

                            <div className="pp-review-grid">
                                {REVIEWS.map((r, i) => (
                                    <div className="pp-review-card" key={i}>
                                        <div className="pp-review-stars">
                                            {"★".repeat(r.stars)}
                                            {"☆".repeat(5 - r.stars)}
                                        </div>
                                        <p className="pp-review-text">{r.text}</p>
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
    )
}