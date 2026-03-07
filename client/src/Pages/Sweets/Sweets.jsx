import React, { useEffect, useRef, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSweets } from '../../API/sweets.api'
import { setSweetData } from '../../Redux/sweets.redux'
import Items from '../../Components/Items/Items'
import Footer from '../../Components/Footer/Footer'
import '../Sweets/Sweets.css'

const CATEGORY_META = {
  sweets: {
    label: 'Sweets',
    description: 'At Sugar Orbit, our sweets are crafted with authentic ghee and the finest ingredients, keeping alive the rich traditions of Indian mithai. Each piece is a celebration of flavor, texture, and heritage — made fresh with no preservatives. 🪔✨'
  },
  namkeens: {
    label: 'Namkeens',
    description: 'At Sugar Orbit, our namkeens are crafted with the perfect blend of tradition and taste, using high-quality ingredients and authentic spice mixes. Each crunchy bite delivers bold flavors, balanced seasoning, and a satisfying crispness that keeps you coming back for more. 🌶️✨'
  },
  chocolates: {
    label: 'Chocolates',
    description: 'At Sugar Orbit, our chocolates are pure indulgence — crafted with premium cocoa and infused with Indian-inspired flavors. Every bite is a smooth, rich experience that bridges classic confectionery with a homegrown twist. 🍫✨'
  },
}

const PRODUCT_TYPES = [
  'Ganesh Chaturithi',
  'Sweets Chikki',
  'Sweets Dryfruits',
  'Sweets Ghee',
  'Sweets Laddus'
]


function Sweets() {
  const { category } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const filterMenuRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const [pagination, setPagination] = useState({
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
    total: 0
  })

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)

  const [priceFilter, setPriceFilter] = useState({
    isOpen: false,
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 860
  })

  const [productTypeFilter, setProductTypeFilter] = useState({
    isOpen: false,
    selected: searchParams.getAll('type') || []
  })

  const meta = CATEGORY_META[category] || { label: category, description: '' }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await getSweets({
        low: priceFilter.minPrice,
        high: priceFilter.maxPrice,
        type: productTypeFilter.selected,
        page
      })
      if (result?.data) {
        dispatch(setSweetData(result.data))
        setPagination(result.pagination)
      }
      setLoading(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    fetchData()
  }, [priceFilter.minPrice, priceFilter.maxPrice, productTypeFilter.selected, page])

  useEffect(() => {
    setPage(1)
  }, [priceFilter.minPrice, priceFilter.maxPrice, productTypeFilter.selected])

  useEffect(() => {
    const params = new URLSearchParams()
    if (priceFilter.minPrice > 0) params.set('minPrice', priceFilter.minPrice)
    if (priceFilter.maxPrice < 860) params.set('maxPrice', priceFilter.maxPrice)
    if (page > 1) params.set('page', page)
    productTypeFilter.selected.forEach(t => params.append('type', t))
    setSearchParams(params, { replace: true })
  }, [priceFilter.minPrice, priceFilter.maxPrice, productTypeFilter.selected, page])

  useEffect(() => {
    document.title = page > 1
      ? `Sugar Orbit | ${meta.label} - Page ${page}`
      : `Sugar Orbit | ${meta.label}`
  }, [category, page])

  useEffect(() => {
    const handler = (e) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(e.target)) {
        setPriceFilter(p => ({ ...p, isOpen: false }))
        setProductTypeFilter(p => ({ ...p, isOpen: false }))
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const togglePriceFilter = () => {
    setPriceFilter(p => ({ ...p, isOpen: !p.isOpen }))
    setProductTypeFilter(p => ({ ...p, isOpen: false }))
  }

  const toggleProductTypeFilter = () => {
    setProductTypeFilter(p => ({ ...p, isOpen: !p.isOpen }))
    setPriceFilter(p => ({ ...p, isOpen: false }))
  }

  const resetPriceFilter = () => setPriceFilter(p => ({ ...p, minPrice: 0, maxPrice: 860 }))
  const resetTypeFilter = () => setProductTypeFilter(p => ({ ...p, selected: [] }))

  const hasActiveFilters =
    priceFilter.minPrice > 0 ||
    priceFilter.maxPrice < 860 ||
    productTypeFilter.selected.length > 0

  const sweets = useSelector(state => state.sweets)

  return (
    <>
      <div className="main-section">
        <section className="category-main-container row">
          <div className="div-80">
            <section className="category-header-section">
              <h1>Sweets</h1>
              <div className="para"><p>At Sugar Orbit, our sweets are crafted with authentic ghee and the finest ingredients, keeping alive the rich traditions of Indian mithai. Each piece is a celebration of flavor, texture, and heritage — made fresh with no preservatives. 🪔✨'</p></div>
              <div className="badges-container-main row-sb">
                <div className="badges-container column">
                  <img className='badge-icon' src="/package.svg" alt="package" />
                  <h5>National Shipping</h5>
                </div>
                <div className="badges-container column">
                  <img className='badge-icon' src="/oil.svg" alt="oil" />
                  <h5>No Palm Oil</h5>
                </div>
                <div className="badges-container column">
                  <img className='badge-icon' src="/time.svg" alt="time" />
                  <h5>15 Days Shelf Life</h5>
                </div>
                <div className="badges-container column">
                  <img className='badge-icon' src="/preservatives.svg" alt="preservatives" />
                  <h5>No Preservatives</h5>
                </div>
              </div>
            </section>

            <section className="product-filter-container" ref={filterMenuRef}>
              <div className="filter-header row-fs">
                <span className="filter-label">Filter:</span>

                <div className="filter-dropdown-wrapper">
                  <button className="filter-btn" onClick={togglePriceFilter}>
                    <span>Price</span>
                    <span className='filter-arrow' style={{ transform: priceFilter.isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>↓</span>
                  </button>
                  {priceFilter.isOpen && (
                    <div className="filter-dropdown-menu">
                      <div className="price-filter-content">
                        <p className="max-price-text">The highest price is ₹860</p>
                        <div className="price-inputs-container">
                          <div className="price-input-group">
                            <span>From</span>
                            <input type="number" className="price-input" value={priceFilter.minPrice}
                              onChange={e => setPriceFilter(p => ({ ...p, minPrice: Number(e.target.value) }))} />
                          </div>
                          <div className="price-input-group">
                            <span>To</span>
                            <input type="number" className="price-input" value={priceFilter.maxPrice}
                              onChange={e => setPriceFilter(p => ({ ...p, maxPrice: Number(e.target.value) }))} />
                          </div>
                        </div>
                        <button className="reset-btn" onClick={resetPriceFilter}>Reset</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="filter-dropdown-wrapper">
                  <button className="filter-btn" onClick={toggleProductTypeFilter}>
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
                          {PRODUCT_TYPES.map(name => (
                            <label key={name} className="product-checkbox-item">
                              <input type="checkbox"
                                checked={productTypeFilter.selected.includes(name)}
                                onChange={() => setProductTypeFilter(p => ({
                                  ...p,
                                  selected: p.selected.includes(name)
                                    ? p.selected.filter(i => i !== name)
                                    : [...p.selected, name]
                                }))} />
                              <span className="checkbox-custom" />
                              <span className="product-name">{name}</span>
                            </label>
                          ))}
                        </div>
                        <button className="reset-btn" onClick={resetTypeFilter}>Reset</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {hasActiveFilters && (
                <div className="active-filters-container row-fs">
                  {productTypeFilter.selected.map(item => (
                    <div key={item} className="filter-tag">
                      <span className="tag-label">Type:</span>
                      <span className="tag-value">{item}</span>
                      <button className="tag-close"
                        onClick={() => setProductTypeFilter(p => ({ ...p, selected: p.selected.filter(i => i !== item) }))}>
                        ×
                      </button>
                    </div>
                  ))}
                  {(priceFilter.minPrice > 0 || priceFilter.maxPrice < 860) && (
                    <div className="filter-tag">
                      <span className="tag-label">Price:</span>
                      <span className="tag-value">₹{priceFilter.minPrice} – ₹{priceFilter.maxPrice}</span>
                      <button className="tag-close" onClick={resetPriceFilter}>×</button>
                    </div>
                  )}
                  <button className="remove-all-btn" onClick={() => { resetPriceFilter(); resetTypeFilter() }}>
                    Remove all
                  </button>
                </div>
              )}
            </section>

            <section className="product-items-container">
              <Items data={sweets} loading={loading} />
            </section>
          </div>
        </section>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <section className="pagination-container">
            <button
              className="page-btn"
              onClick={() => setPage(p => p - 1)}
              disabled={!pagination.hasPrev}
            >
              ← Prev
            </button>

            <div className="page-numbers">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === pagination.totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...')
                  acc.push(p)
                  return acc
                }, [])
                .map((p, idx) =>
                  p === '...'
                    ? <span key={`ellipsis-${idx}`} className="page-ellipsis">…</span>
                    : <button
                      key={p}
                      className={`page-num-btn ${p === page ? 'active' : ''}`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                )}
            </div>

            <button
              className="page-btn"
              onClick={() => setPage(p => p + 1)}
              disabled={!pagination.hasNext}
            >
              Next →
            </button>
          </section>
        )}
      </div>
      <Footer />
    </>
  )
}

export default Sweets