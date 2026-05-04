import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getProduct } from "../../API/product.api.js"
import { setProduct } from '../../Redux/product.redux.js'
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
    const product = useSelector(state => state.product)  // 👈 from Redux, no local state needed

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProduct({ category, id })
                console.log(data)
                dispatch(setProduct(data?.product))          // 👈 store in Redux
                setWeight(data?.product?.productPrice[0]?.size)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProduct()
    }, [id, category])

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

                            <button className="pp-cta">Add to Cart</button>
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
            <Footer />
        </>
    )
}