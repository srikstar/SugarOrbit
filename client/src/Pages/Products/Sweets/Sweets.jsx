import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux'

import './Sweets.css';
import Collection from '../Collections/Collection';
import Footer from '../../Components/Footer/Footer';
import { sweets } from '../../../APIs/Products';

import { setSweetsData } from '../../../Redux/sweets.js'
 

function Sweets() {

    const dispatch = useDispatch()
    // const { sweet } = useSelector(state => state.sweets)

    // ✅ FIX 1: Move all useState hooks to the top
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [priceOpen, setPriceOpen] = useState(false);
    const [priceFrom, setPriceFrom] = useState(0);
    const [priceTo, setPriceTo] = useState(860); // MAX_PRICE constant
    const [priceApplied, setPriceApplied] = useState(false);

    const productTypeRef = useRef(null);
    const priceRangeRef = useRef(null);

    const MAX_PRICE = 860; // Define constant AFTER hooks

    // ✅ FIX 2: Fetch data with proper dependencies
    useEffect(() => {
        const fetchSweets = async () => {
            try {
                const response = await sweets()
                console.log(response)
                dispatch(setSweetsData([response]))
            } catch (error) {
                console.log(error)
            }
        }
        fetchSweets()
    }, [dispatch]) // ✅ Add dispatch to dependency array

    // ✅ FIX 3: Clean up click-outside handler with correct dependencies
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (productTypeRef.current && !productTypeRef.current.contains(event.target)) {
                setOpen(false);
            }
            if (priceRangeRef.current && !priceRangeRef.current.contains(event.target)) {
                setPriceOpen(false);
                // Apply price filter when closing
                if (priceFrom !== 0 || priceTo !== MAX_PRICE) {
                    setPriceApplied(true);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [priceFrom, priceTo]); // ✅ Removed MAX_PRICE - it's a constant

    const OPTIONS = [
        { label: "Ganesh Chaturthi", count: 3 },
        { label: "Sweets-Chikkis", count: 5 },
        { label: "Sweets-Dryfruits", count: 3 },
        { label: "sweets-Ghee", count: 6 },
        { label: "Sweets-Laddus", count: 4 },
        { label: "Sweets-Milk", count: 2 },
        { label: "Sweets-Tag", count: 21 },
        { label: "winterSpecialCollection", count: 1 },
    ];

    const toggleOption = (label) => {
        setSelected((prev) =>
            prev.includes(label)
                ? prev.filter((i) => i !== label)
                : [...prev, label]
        );
    };

    const removeProductType = (label) => {
        setSelected((prev) => prev.filter((i) => i !== label));
    };

    const removePriceFilter = () => {
        setPriceFrom(0);
        setPriceTo(MAX_PRICE);
        setPriceApplied(false);
    };

    const removeAllFilters = () => {
        setSelected([]);
        setPriceFrom(0);
        setPriceTo(MAX_PRICE);
        setPriceApplied(false);
    };

    const hasActiveFilters = selected.length > 0 || priceApplied;

    return (
        <section className="main-container row">
            <div className="div-90">
                <div className="product-container-one">
                    <h1>Sweets</h1>
                    <div className="home-para-one">
                        <p>From our kitchens to homes across India, Sugar Orbit brings together time-honoured flavours and quiet indulgence. Discover familiar favourites and regional delicacies, prepared with pure ghee, fine nuts, and thoughtful care—perfect for moments worth savouring.</p>
                    </div>

                    <h3><img className='filter' src="./filter.svg" alt="filter-icon" /> Filter : </h3>
                    <div className="filter-item-container row-fs">
                        <div className="filter-wrapper" ref={productTypeRef}>
                            <div
                                className="filter-trigger"
                                onClick={() => setOpen(!open)}
                            >
                                <p>Product Type</p>
                                <p className="arrow">↓</p>
                            </div>

                            {open && (
                                <div className="filter-dropdown">
                                    <div className="filter-header">
                                        <span>{selected.length} selected</span>
                                        <button onClick={() => setSelected([])}>
                                            Reset
                                        </button>
                                    </div>

                                    {OPTIONS.map((opt) => (
                                        <label key={opt.label} className="filter-option">
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(opt.label)}
                                                onChange={() => toggleOption(opt.label)}
                                            />
                                            <span>
                                                {opt.label} ({opt.count})
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="filter-wrapper" ref={priceRangeRef}>
                            <div
                                className="filter-trigger"
                                onClick={() => setPriceOpen(!priceOpen)}
                            >
                                <p>Price Range</p>
                                <p className="arrow">↓</p>
                            </div>

                            {priceOpen && (
                                <div className="filter-dropdown filter-dropdown-range">
                                    <div className="filter-header">
                                        <span>The highest price is Rs. {MAX_PRICE}.00</span>
                                        <button onClick={() => {
                                            setPriceFrom(0);
                                            setPriceTo(MAX_PRICE);
                                        }}>
                                            Reset
                                        </button>
                                    </div>

                                    <div className="price-input-row">
                                        <div className="price-box row-sb">
                                            <div>
                                                <span className="rupee">From</span>
                                                <div className="price-input">
                                                    <input
                                                        type="number"
                                                        value={priceFrom}
                                                        max={priceTo}
                                                        onChange={(e) => setPriceFrom(Number(e.target.value))}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <span className="rupee">To</span>
                                                <div className="price-input">
                                                    <input
                                                        type="number"
                                                        value={priceTo}
                                                        min={priceFrom}
                                                        max={MAX_PRICE}
                                                        onChange={(e) => setPriceTo(Number(e.target.value))}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {hasActiveFilters && (
                        <div className="active-filters-container">
                            {priceApplied && (
                                <div className="filter-chip">
                                    <span>Rs. {priceFrom}.00 - Rs. {priceTo}.00</span>
                                    <button
                                        className="filter-chip-remove"
                                        onClick={removePriceFilter}
                                    >
                                        ×
                                    </button>
                                </div>
                            )}

                            {selected.map((item) => (
                                <div key={item} className="filter-chip">
                                    <span>Product Type: {item}</span>
                                    <button
                                        className="filter-chip-remove"
                                        onClick={() => removeProductType(item)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}

                            <button
                                className="remove-all-btn"
                                onClick={removeAllFilters}
                            >
                                Remove all
                            </button>
                        </div>
                    )}

                </div>

                <Collection />
            </div>
            <Footer />
        </section>
    );
}

export default Sweets;