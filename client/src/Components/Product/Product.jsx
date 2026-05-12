import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getProduct } from "../../API/product.api.js"
import { setProduct } from '../../Redux/product.redux.js'
import { setCartData } from '../../Redux/cart.redux.js'
import { setHomeSweetData, setHomeNamkeenData, setHomeChocolateData } from '../../Redux/home.js'
import { homeSweets, homeNamkeens, homeChocolates } from '../../API/home.api'
import { useDispatch, useSelector } from "react-redux"
import "./Product.css"
import Footer from "../Footer/Footer"

export default function Product() {
    const { id, category } = useParams()
    const navigate = useNavigate()
    const [activeImg, setActiveImg] = useState(0)
    const [weight, setWeight] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [activeAcc, setActiveAcc] = useState(null)
    const dispatch = useDispatch()
    const product = useSelector(state => state.product)
    const homeData = useSelector(state => state.home)

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
            text: "Fresh, authentic taste and premium quality ingredients. Packaging was elegant and delivery was quick.",
            author: "Ritika M.",
            date: "August 2024",
        }
    ];

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                if (category === 'sweets') {
                    const response = await homeSweets()
                    dispatch(setHomeSweetData(response?.data || []))
                } else if (category === 'namkeens') {
                    const response = await homeNamkeens()
                    dispatch(setHomeNamkeenData(response?.data || []))
                } else if (category === 'chocolates') { // Added chocolates
                    const response = await homeChocolates()
                    dispatch(setHomeChocolateData(response?.data || []))
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchHomeData()
    }, [category, dispatch])

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProduct({ category, id })
                const product = data?.sweet || data?.namkeens || data?.chocolate
                if (product) {
                    dispatch(setProduct(product))
                    setWeight(product?.productPrice?.[0]?.size || "")
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchProduct()
    }, [id, category, dispatch])


    useEffect(() => {
        if (product?.productName) {
            document.title = `Sugar Orbit | ${product.productName}`
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [product?.productName])

    const selectedPrice =
        product?.productPrice?.find(p => p.size === weight)?.price || 0

    const handleAddToCart = () => {
        dispatch(setCartData({
            _id: product._id,
            productName: product.productName,
            productImages: product.productImages,
            selectedSize: weight,
            price: selectedPrice,
            quantity: quantity
        }))
    }

    if (!product || !product.productName) {
        return <div>Loading...</div>
    }

    const relatedProducts =
        category === "sweets"
            ? homeData?.sweets || []
            : category === "namkeens"
                ? homeData?.namkeens || []
                : category === "chocolates" // Added chocolates
                    ? homeData?.chocolates || []
                    : []

    const filteredRelated = Array.isArray(relatedProducts)
        ? relatedProducts
            .filter(p => p._id !== product._id)
            .slice(0, 4)
        : []

    return (
        <>
            <div className="main-section">
                <div className="pp-root row">
                    <div className="pp-breadcrumb div-80">
                        <span
                            onClick={() => navigate("/")}
                            style={{ cursor: "pointer" }}
                        >
                            Home
                        </span>
                        {" / "}
                        <span
                            onClick={() => navigate(`/${category}`)}
                            style={{ cursor: "pointer", textTransform: "capitalize" }}
                        >
                            {category?.toUpperCase()}
                        </span>
                        {" / "}
                        <span>{product.productName}</span>

                    </div>
                    <div className="pp-main div-80">
                        <div className="pp-images">
                            <div className="pp-main-img-wrap">
                                <img
                                    src={product.productImages?.[activeImg]}
                                    alt={product.productName}
                                />
                            </div>
                            <div className="pp-thumbs">
                                {product.productImages?.map((src, i) => (
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
                            <h1 className="pp-title">
                                {product.productName}
                            </h1>
                            <p>{product.productDescription}</p>
                            <div className="pp-price-row">
                                <span className="pp-price">
                                    ₹ {selectedPrice}
                                </span>
                            </div>
                            <p className="pp-label">Weight</p>
                            <div className="pp-weight-btns">
                                {product.productPrice?.map(({ size }) => (
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
                                    <button
                                        className="pp-qty-btn"
                                        onClick={() =>
                                            setQuantity(q => Math.max(1, q - 1))
                                        }
                                    >
                                        −
                                    </button>
                                    <span className="pp-qty-num">
                                        {quantity}
                                    </span>
                                    <button
                                        className="pp-qty-btn"
                                        onClick={() => setQuantity(q => q + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                className="pp-cta"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>

                            <button className="pp-cta-alt">
                                Buy Now
                            </button>

                            <div className="pp-accordion">

                                {[
                                    {
                                        id: "details",
                                        title: "Product Details",
                                        content: product.productDetails
                                    },
                                    {
                                        id: "shipping",
                                        title: "Shipping & Returns",
                                        content: product.shippingInfo
                                    },
                                    {
                                        id: "faq",
                                        title: "FAQs",
                                        content: product.faqContent
                                    },
                                ].map(({ id, title, content }) => (
                                    <div className="pp-acc-item" key={id}>

                                        <div
                                            className="pp-acc-head"
                                            onClick={() =>
                                                setActiveAcc(
                                                    activeAcc === id
                                                        ? null
                                                        : id
                                                )
                                            }
                                        >
                                            <span>{title}</span>
                                            <span
                                                className={`pp-acc-icon ${activeAcc === id ? "open" : ""}`}
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
                </div>
            </div>

            <div className="pp-ymal">
                <div className="pp-ymal-inner div-80">
                    <h2 className="pp-ymal-title">
                        You May Also Like
                    </h2>
                    <div className="pp-ymal-grid">
                        {filteredRelated.length > 0 ? (
                            filteredRelated.map((p) => {

                                const relatedPrice =
                                    p.productPrice?.[0]?.price || 0

                                const relatedWeight =
                                    p.productPrice?.[0]?.size || ""

                                return (
                                    <div
                                        className="pp-ymal-card"
                                        key={p._id}
                                        onClick={() =>
                                            navigate(`/${category}/${p._id}`)
                                        }
                                        style={{ cursor: "pointer" }}
                                    >

                                        <div className="pp-ymal-img-wrap">
                                            <img
                                                src={p.productImages?.[0]}
                                                alt={p.productName}
                                            />
                                        </div>

                                        <div className="pp-ymal-info">

                                            <span className="pp-ymal-name">
                                                {p.productName}
                                            </span>

                                            <span className="pp-ymal-weight">
                                                {relatedWeight}
                                            </span>

                                            <div className="pp-ymal-bottom">

                                                <span className="pp-ymal-price">
                                                    ₹{relatedPrice}
                                                </span>

                                                <button
                                                    className="pp-ymal-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation()

                                                        dispatch(setCartData({
                                                            _id: p._id,
                                                            productName: p.productName,
                                                            productImages: p.productImages,
                                                            selectedSize: relatedWeight,
                                                            price: relatedPrice,
                                                            quantity: 1
                                                        }))
                                                    }}
                                                >
                                                    Add +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <p>No related products found.</p>
                        )}
                    </div>

                    <div className="pp-reviews">
                        <div className="pp-reviews-inner">
                            <div className="pp-reviews-header">
                                <h2 className="pp-reviews-title">
                                    Customer Reviews
                                </h2>
                                <span className="pp-reviews-count">
                                    4.8 avg
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
    )
}