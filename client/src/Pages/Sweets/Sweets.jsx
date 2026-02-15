import React, { useEffect, useState, useRef } from 'react'
import './Sweets.css'
import Footer from '../../Components/Footer/Footer'
import Items from '../../Components/Items/Items'

function Sweets() {

  const [page, setPage] = useState(1)
  const filterMenuRef = useRef(null)
  const [priceFilter, setPriceFilter] = useState({
    isOpen: false,
    minPrice: 0,
    maxPrice: 860
  })
  const [productTypeFilter, setProductTypeFilter] = useState({
    isOpen: false,
    selected: []
  })

  const productTypes = [
    { name: 'Ganesh Chaturithi' },
    { name: 'Sweets Chikki' },
    { name: 'Sweets Dryfruits' },
    { name: 'Sweets Ghee' },
    { name: 'Sweets Laddus' }
  ]

  useEffect(() => {
    if (page >= 2) {
      document.title = `Sugar Orbit | Sweets - Page ${page}`
    }
    else document.title = `Sugar Orbit | Sweets`
  }, [page])


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setPriceFilter(prev => ({ ...prev, isOpen: false }))
        setProductTypeFilter(prev => ({ ...prev, isOpen: false }))
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNextPage = () => {
    setPage(prev => prev + 1)
  }

  const togglePriceFilter = () => {
    setPriceFilter(prev => ({ ...prev, isOpen: !prev.isOpen }))
    setProductTypeFilter(prev => ({ ...prev, isOpen: false }))
  }

  const toggleProductTypeFilter = () => {
    setProductTypeFilter(prev => ({ ...prev, isOpen: !prev.isOpen }))
    setPriceFilter(prev => ({ ...prev, isOpen: false }))
  }

  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value)
    if (type === 'min') {
      setPriceFilter(prev => ({ ...prev, minPrice: value }))
    } else {
      setPriceFilter(prev => ({ ...prev, maxPrice: value }))
    }
  }

  const handleProductTypeToggle = (productName) => {
    setProductTypeFilter(prev => {
      const isSelected = prev.selected.includes(productName)
      const newSelected = isSelected
        ? prev.selected.filter(item => item !== productName)
        : [...prev.selected, productName]
      return { ...prev, selected: newSelected }
    })
  }

  const resetPriceFilter = () => {
    setPriceFilter(prev => ({ ...prev, minPrice: 0, maxPrice: 860 }))
  }

  const resetProductTypeFilter = () => {
    setProductTypeFilter(prev => ({ ...prev, selected: [] }))
  }

  const removeFilter = (type) => {
    if (type === 'price') {
      resetPriceFilter()
    } else if (type === 'productType') {
      resetProductTypeFilter()
    }
  }

  const removeAllFilters = () => {
    resetPriceFilter()
    resetProductTypeFilter()
  }

  const hasActiveFilters = priceFilter.minPrice > 0 || priceFilter.maxPrice < 860 || productTypeFilter.selected.length > 0

  return (
    <>
      <div className="main-section">

        <section className="category-main-container row">
          <div className="div-80">
            <section className="category-header-section">
              <h1 onClick={handleNextPage}>Sweets</h1>
              <div className="para">
                <p>At Sugar Orbit, our sweets are crafted to perfection using premium ingredients and time-tested recipes. Each bite offers rich flavor, balanced sweetness, and a melt-in-your-mouth texture. 🍩✨</p>
              </div>

              <div className="badges-container-main row-sb">
                <div className="badges-container column">
                  <img className='badge-icon' src="./package.svg" alt="package" />
                  <h5>National Shipping</h5>
                </div>
                <div className="badges-container column">
                  <img className='badge-icon' src="./oil.svg" alt="package" />
                  <h5>No Palm Oil</h5>
                </div>
                <div className="badges-container column">
                  <img className='badge-icon' src="./time.svg" alt="package" />
                  <h5>15 Days Shelf Life</h5>
                </div>
                <div className="badges-container column">
                  <img className='badge-icon' src="./preservatives.svg" alt="package" />
                  <h5>No Preservatives</h5>
                </div>
              </div>
            </section>
            <section className="product-filter-container" ref={filterMenuRef}>
              <div className="filter-header row-fs">
                <span className="filter-label">Filter:</span>

                {/* Price Filter */}
                <div className="filter-dropdown-wrapper">
                  <button
                    className="filter-btn"
                    onClick={togglePriceFilter}
                  >
                    <span>Price</span>
                    <span className='filter-arrow' style={{ transform: priceFilter.isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>↓</span>
                  </button>

                  {priceFilter.isOpen && (
                    <div className="filter-dropdown-menu price-filter-menu">
                      <div className="price-filter-content">
                        <p className="max-price-text">The highest price is Rs. 860.00</p>

                        <div className="price-inputs-container">
                          <div className="price-input-group">
                            <span className="input-label">From</span>
                            <input
                              type="number"
                              value={priceFilter.minPrice}
                              onChange={(e) => handlePriceChange(e, 'min')}
                              placeholder="From"
                              className="price-input"
                            />

                          </div>

                          <div className="price-input-group">
                            <span className="input-label">To</span>
                            <input
                              type="number"
                              value={priceFilter.maxPrice}
                              onChange={(e) => handlePriceChange(e, 'max')}
                              placeholder="To"
                              className="price-input"
                            />

                          </div>
                        </div>

                        <button className="reset-btn" onClick={resetPriceFilter}>Reset</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Type Filter */}
                <div className="filter-dropdown-wrapper">
                  <button
                    className="filter-btn"
                    onClick={toggleProductTypeFilter}
                  >
                    <span>Product Type</span>
                    <span className='filter-arrow' style={{ transform: productTypeFilter.isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>↓</span>
                  </button>

                  {productTypeFilter.isOpen && (
                    <div className="filter-dropdown-menu product-type-menu">
                      <div className="product-type-content">
                        <div className="selected-count">
                          <p>{productTypeFilter.selected.length} selected</p>
                        </div>

                        <div className="product-list">
                          {productTypes.map((product) => (
                            <label
                              key={product.name}
                              className={`product-checkbox-item ${product.count === 0 ? 'disabled' : ''}`}
                            >
                              <input
                                type="checkbox"
                                checked={productTypeFilter.selected.includes(product.name)}
                                onChange={() => handleProductTypeToggle(product.name)}
                                disabled={product.count === 0}
                              />
                              <span className="checkbox-custom"></span>
                              <span className="product-name">{product.name}</span>
                            </label>
                          ))}
                        </div>

                        <button className="reset-btn" onClick={resetProductTypeFilter}>Reset</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {hasActiveFilters && (
                <div className="active-filters-container row-fs">
                  {productTypeFilter.selected.map((item) => (
                    <div key={item} className="filter-tag">
                      <span className="tag-label">Product Type:</span>
                      <span className="tag-value">{item}</span>
                      <button
                        className="tag-close"
                        onClick={(e) => {
                          e.stopPropagation()
                          setProductTypeFilter(prev => ({
                            ...prev,
                            selected: prev.selected.filter(i => i !== item)
                          }))
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  {(priceFilter.minPrice > 0 || priceFilter.maxPrice < 860) && (
                    <div className="filter-tag">
                      <span className="tag-label">Price:</span>
                      <span className="tag-value">₹{priceFilter.minPrice} - ₹{priceFilter.maxPrice}</span>
                      <button
                        className="tag-close"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFilter('price')
                        }}
                      >
                        ×
                      </button>
                    </div>
                  )}

                  <button
                    className="remove-all-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeAllFilters()
                    }}
                  >
                    Remove all
                  </button>
                </div>
              )}
            </section>

            <section className="product-items-container">
              <Items />
            </section>
          </div>
        </section>

      </div>

      <Footer />
    </>
  )
}

export default Sweets