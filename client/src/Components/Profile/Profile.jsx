import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../FirebaseConfig'
import { clearUserData, setUserData } from '../../Redux/user.redux'
import { clearAuthData } from '../../Redux/user.auth'

import './Profile.css'
import { editUser } from '../../API/user.api'

// ─── constants ───────────────────────────────────────────────────────────────

const initialProfile = { name: '', email: '', phone: '' }

const emptyAddress = {
  building: '',
  street:   '',
  city:     '',
  state:    '',
  pincode:  '',
  country:  'India',
}

const fetchOrders = () =>
  new Promise((resolve) =>
    setTimeout(() =>
      resolve([
        {
          orderId: '1106',
          status: 'PICKEDUP',
          total: 235.16,
          orderedOn: '15 Dec, 06:12 pm',
          items: [
            { name: 'Motichoor Laddu', size: '200g', quantity: 2 },
            { name: 'Kaju Katli',      size: '200g', quantity: 1 },
          ],
        },
        {
          orderId: '1089',
          status: 'DELIVERED',
          total: 580.0,
          orderedOn: '10 Dec, 01:45 pm',
          items: [
            { name: 'Besan Laddu', size: '250g', quantity: 3 },
            { name: 'Mysore Pak',  size: '200g', quantity: 1 },
          ],
        },
      ]),
      600
    )
  )

const STATUS_COLORS = {
  PICKEDUP:  { bg: '#e8f5e9', text: '#2e7d32', border: '#2e7d32' },
  DELIVERED: { bg: '#e3f2fd', text: '#1565c0', border: '#1565c0' },
  CANCELLED: { bg: '#fce4ec', text: '#b71c1c', border: '#b71c1c' },
  PENDING:   { bg: '#fff8e1', text: '#f57f17', border: '#f57f17' },
}

// ─── OrderCard ────────────────────────────────────────────────────────────────

function OrderCard({ order }) {
  const s = STATUS_COLORS[order.status] || STATUS_COLORS.PENDING
  return (
    <div className="profile-order-card">
      <div className="profile-order-card-header">
        <span className="profile-order-id">Order #{order.orderId}</span>
        <span className="profile-order-status"
          style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}>
          {order.status}
        </span>
        <span className="profile-order-total">₹{order.total.toFixed(2)}</span>
      </div>
      <div className="profile-order-card-section">
        <span className="profile-order-card-label">ITEMS</span>
        {order.items.map((item, i) => (
          <p key={i} className="profile-order-card-item">
            {item.name} ({item.size}) × {item.quantity}
          </p>
        ))}
      </div>
      <div className="profile-order-card-section">
        <span className="profile-order-card-label">ORDERED ON</span>
        <p className="profile-order-card-date">{order.orderedOn}</p>
      </div>
    </div>
  )
}

// ─── Profile ──────────────────────────────────────────────────────────────────

function Profile({ onClose, isOpen }) {
  // profile
  const [profile, setProfile] = useState(initialProfile)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft]     = useState(initialProfile)

  // address
  const [addressOpen,    setAddressOpen]    = useState(false)
  const [editingAddress, setEditingAddress] = useState(false)
  const [addressDraft,   setAddressDraft]   = useState(emptyAddress)
  const [addressLoading, setAddressLoading] = useState(false)
  const [addressError,   setAddressError]   = useState('')

  // orders
  const [ordersOpen,    setOrdersOpen]    = useState(true)
  const [orders,        setOrders]        = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)

  const dispatch = useDispatch()
  const authData = useSelector((state) => state.auth.data)
  const userData = useSelector((state) => state.user.data)

  // address from Redux (object with sub-fields)
  const savedAddress = userData?.address || emptyAddress
  const hasAddress   = !!(savedAddress.city || savedAddress.street || savedAddress.building)

  // format address for display
  const formatAddress = (a) => {
    const parts = [a.building, a.street, a.city, a.state, a.pincode, a.country].filter(Boolean)
    return parts.join(', ')
  }

  // ── seed profile from Redux ───────────────────────────────────────────────
  useEffect(() => {
    if (userData) {
      setProfile({
        name:  userData.name    || '',
        email: userData.email   || '',
        phone: userData.phoneno || authData?.phone || '',
      })
    }
  }, [userData])

  // ── fetch orders when panel opens ─────────────────────────────────────────
  useEffect(() => {
    if (!isOpen || orders.length > 0) return
    let ignore = false
    const load = async () => {
      setOrdersLoading(true)
      try {
        const data = await fetchOrders()
        if (!ignore) setOrders(data)
      } finally {
        if (!ignore) setOrdersLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [isOpen, orders.length])

  // ── profile handlers ──────────────────────────────────────────────────────
  const handleEdit   = () => { setDraft(profile); setEditing(true) }
  const handleCancel = () => { setEditing(false); setDraft(profile) }

  const handleSave = async () => {
    try {
      const response = await editUser({ name: draft.name, email: draft.email, phoneno: authData?.phone })
      if (response?.isSuccess) {
        setProfile(draft)
        dispatch(setUserData({ ...userData, name: draft.name, email: draft.email }))
        setEditing(false)
      } else {
        console.log(response?.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // ── address handlers ──────────────────────────────────────────────────────
  const handleAddressEdit = () => {
    setAddressDraft(hasAddress ? { ...emptyAddress, ...savedAddress } : emptyAddress)
    setAddressError('')
    setEditingAddress(true)
  }

  const handleAddressCancel = () => { setEditingAddress(false); setAddressError('') }

  const handleAddressSave = async () => {
    if (!addressDraft.city.trim()) return setAddressError('City is required.')
    if (addressDraft.pincode && !/^[1-9][0-9]{5}$/.test(addressDraft.pincode.trim())) {
      return setAddressError('Enter a valid 6-digit pincode.')
    }

    setAddressLoading(true)
    setAddressError('')
    try {
      const response = await editUser({ address: addressDraft, phoneno: authData?.phone })
      if (response?.isSuccess) {
        dispatch(setUserData({ ...userData, address: addressDraft }))
        setEditingAddress(false)
      } else {
        setAddressError(response?.message || 'Failed to save address.')
      }
    } catch {
      setAddressError('Something went wrong. Please try again.')
    } finally {
      setAddressLoading(false)
    }
  }

  const setField = (key, val) => setAddressDraft((prev) => ({ ...prev, [key]: val }))

  // ── logout ────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    await signOut(auth)
    dispatch(clearUserData())
    dispatch(clearAuthData())
    onClose()
  }

  return (
    <div
      className={`profile-main-container ${isOpen ? 'profile-open' : ''}`}
      onClick={onClose}
    >
      <div className="profile-panel" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="profile-header row-sb div">
          <span className="profile-title">Profile</span>
          <button className="profile-close-btn row" onClick={onClose}>✕ Close</button>
        </div>

        <div className="profile-divider" />

        <div className="profile-body">

          {/* ── Info ─────────────────────────────────────────────────────── */}
          <div className="profile-info-section div">
            <div className="profile-info-top">
              {editing ? (
                <>
                  <button className="profile-action-btn save"   onClick={handleSave}>Save</button>
                  <button className="profile-action-btn cancel" onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <button className="profile-action-btn edit" onClick={handleEdit}>Edit</button>
              )}
            </div>

            <div className="profile-field">
              <span className="profile-field-label">Name</span>
              {editing
                ? <input className="profile-field-input" value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
                : <span className="profile-field-value">{profile.name || '—'}</span>}
            </div>

            <div className="profile-field">
              <span className="profile-field-label">Email</span>
              {editing
                ? <input className="profile-field-input" value={draft.email}
                    onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
                : <span className="profile-field-value">{profile.email || '—'}</span>}
            </div>

            <div className="profile-field">
              <span className="profile-field-label">Ph No</span>
              <span className="profile-field-value profile-field-static">{profile.phone || '—'}</span>
            </div>
          </div>

          <div className="profile-divider" />

          {/* ── Address ──────────────────────────────────────────────────── */}
          <div className="profile-section">
            <button className="profile-section-toggle" onClick={() => setAddressOpen((o) => !o)}>
              <span className="profile-section-title">Address</span>
              <span className="profile-section-icon">{addressOpen ? '−' : '+'}</span>
            </button>

            {addressOpen && (
              <div className="profile-address-body">

                {/* display */}
                {!editingAddress && (
                  <div style={{ padding: '12px 24px' }}>
                    {hasAddress ? (
                      <>
                        {savedAddress.building && (
                          <p className="profile-field-value" style={{ margin: '2px 0' }}>
                            {savedAddress.building}
                          </p>
                        )}
                        {savedAddress.street && (
                          <p className="profile-field-value" style={{ margin: '2px 0' }}>
                            {savedAddress.street}
                          </p>
                        )}
                        <p className="profile-field-value" style={{ margin: '2px 0' }}>
                          {[savedAddress.city, savedAddress.state].filter(Boolean).join(', ')}
                          {savedAddress.pincode ? ` – ${savedAddress.pincode}` : ''}
                        </p>
                        <p className="profile-field-value" style={{ margin: '2px 0 12px' }}>
                          {savedAddress.country || 'India'}
                        </p>
                      </>
                    ) : (
                      <p className="profile-field-value"
                        style={{ color: '#aaa', fontStyle: 'italic', marginBottom: '12px' }}>
                        No address saved.
                      </p>
                    )}
                    <button className="profile-action-btn save" onClick={handleAddressEdit}>
                      {hasAddress ? 'Edit Address' : 'Add Address'}
                    </button>
                  </div>
                )}

                {/* edit form */}
                {editingAddress && (
                  <div style={{ padding: '12px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

                    <div className="profile-field" style={{ flexDirection: 'column', gap: '4px' }}>
                      <label className="profile-field-label">Flat / House No., Building</label>
                      <input
                        className="profile-field-input"
                        placeholder="e.g. Flat 4B, Orchid Towers"
                        value={addressDraft.building}
                        onChange={(e) => setField('building', e.target.value)}
                        maxLength={100}
                      />
                    </div>

                    <div className="profile-field" style={{ flexDirection: 'column', gap: '4px' }}>
                      <label className="profile-field-label">Street / Area / Locality</label>
                      <input
                        className="profile-field-input"
                        placeholder="e.g. MG Road, Koramangala"
                        value={addressDraft.street}
                        onChange={(e) => setField('street', e.target.value)}
                        maxLength={100}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div className="profile-field" style={{ flexDirection: 'column', gap: '4px' }}>
                        <label className="profile-field-label">City *</label>
                        <input
                          className="profile-field-input"
                          placeholder="e.g. Bengaluru"
                          value={addressDraft.city}
                          onChange={(e) => setField('city', e.target.value)}
                          maxLength={50}
                        />
                      </div>
                      <div className="profile-field" style={{ flexDirection: 'column', gap: '4px' }}>
                        <label className="profile-field-label">State</label>
                        <input
                          className="profile-field-input"
                          placeholder="e.g. Karnataka"
                          value={addressDraft.state}
                          onChange={(e) => setField('state', e.target.value)}
                          maxLength={50}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div className="profile-field" style={{ flexDirection: 'column', gap: '4px' }}>
                        <label className="profile-field-label">Pincode</label>
                        <input
                          className="profile-field-input"
                          placeholder="e.g. 560001"
                          value={addressDraft.pincode}
                          onChange={(e) => setField('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                          inputMode="numeric"
                          maxLength={6}
                        />
                      </div>
                      <div className="profile-field" style={{ flexDirection: 'column', gap: '4px' }}>
                        <label className="profile-field-label">Country</label>
                        <input
                          className="profile-field-input"
                          value={addressDraft.country}
                          onChange={(e) => setField('country', e.target.value)}
                          maxLength={50}
                        />
                      </div>
                    </div>

                    {addressError && (
                      <p style={{ fontSize: '0.85rem', color: '#e05555', margin: 0 }}>{addressError}</p>
                    )}

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        className="profile-action-btn save"
                        onClick={handleAddressSave}
                        disabled={addressLoading}
                      >
                        {addressLoading ? 'Saving…' : 'Save'}
                      </button>
                      <button
                        className="profile-action-btn cancel"
                        onClick={handleAddressCancel}
                        disabled={addressLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="profile-divider" />

          {/* ── Orders ───────────────────────────────────────────────────── */}
          <div className="profile-section">
            <button className="profile-section-toggle" onClick={() => setOrdersOpen((o) => !o)}>
              <span className="profile-section-title">Orders</span>
              <span className="profile-section-icon">{ordersOpen ? '−' : '+'}</span>
            </button>

            {ordersOpen && (
              <div className="profile-orders-list">
                {ordersLoading ? (
                  <div className="profile-empty">Loading orders…</div>
                ) : orders.length === 0 ? (
                  <div className="profile-empty">No orders yet.</div>
                ) : (
                  orders.map((order, index) => (
                    <React.Fragment key={order.orderId}>
                      <OrderCard order={order} />
                      {index < orders.length - 1 && <div className="profile-divider" />}
                    </React.Fragment>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="profile-divider" />
        </div>

        {/* Footer */}
        <div className="profile-footer div">
          <button className="profile-logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </div>
    </div>
  )
}

export default Profile