import React, { useState, useEffect } from 'react'
import './Profile.css'

const initialProfile = {
  name: 'Srikanth',
  email: 'srikanth.reddy.n@outlook.com',
  phone: '7892438902',
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
            { name: 'Kaju Katli', size: '200g', quantity: 1 },
          ],
        },
        {
          orderId: '1089',
          status: 'DELIVERED',
          total: 580.0,
          orderedOn: '10 Dec, 01:45 pm',
          items: [
            { name: 'Besan Laddu', size: '250g', quantity: 3 },
            { name: 'Mysore Pak', size: '200g', quantity: 1 },
          ],
        },
      ]),
      600
    )
  )

const STATUS_COLORS = {
  PICKEDUP: { bg: '#e8f5e9', text: '#2e7d32', border: '#2e7d32' },
  DELIVERED: { bg: '#e3f2fd', text: '#1565c0', border: '#1565c0' },
  CANCELLED: { bg: '#fce4ec', text: '#b71c1c', border: '#b71c1c' },
  PENDING: { bg: '#fff8e1', text: '#f57f17', border: '#f57f17' },
}

function OrderCard({ order }) {
  const statusStyle =
    STATUS_COLORS[order.status] || STATUS_COLORS.PENDING

  return (
    <div className="profile-order-card">
      <div className="profile-order-card-header">
        <span className="profile-order-id">
          Order #{order.orderId}
        </span>

        <span
          className="profile-order-status"
          style={{
            background: statusStyle.bg,
            color: statusStyle.text,
            border: `1px solid ${statusStyle.border}`,
          }}
        >
          {order.status}
        </span>

        <span className="profile-order-total">
          ₹{order.total.toFixed(2)}
        </span>
      </div>

      <div className="profile-order-card-section">
        <span className="profile-order-card-label">
          ITEMS
        </span>
        {order.items.map((item, i) => (
          <p key={i} className="profile-order-card-item">
            {item.name} ({item.size}) × {item.quantity}
          </p>
        ))}
      </div>

      <div className="profile-order-card-section">
        <span className="profile-order-card-label">
          ORDERED ON
        </span>
        <p className="profile-order-card-date">
          {order.orderedOn}
        </p>
      </div>
    </div>
  )
}

function Profile({ onClose, isOpen }) {
  const [profile, setProfile] = useState(initialProfile)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(initialProfile)
  const [ordersOpen, setOrdersOpen] = useState(true)
  const [addressOpen, setAddressOpen] = useState(false)
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)

  useEffect(() => {
    if (!isOpen || orders.length > 0) return

    let ignore = false

    const loadOrders = async () => {
      setOrdersLoading(true)

      try {
        const data = await fetchOrders()
        if (!ignore) {
          setOrders(data)
        }
      } finally {
        if (!ignore) {
          setOrdersLoading(false)
        }
      }
    }

    loadOrders()

    return () => {
      ignore = true
    }
  }, [isOpen, orders.length])

  const handleEdit = () => {
    setDraft(profile)
    setEditing(true)
  }

  const handleSave = () => {
    setProfile(draft)
    setEditing(false)
  }

  const handleCancel = () => {
    setEditing(false)
    setDraft(profile)
  }

  return (
    <div
      className={`profile-main-container ${isOpen ? 'profile-open' : ''
        }`}
      onClick={onClose}
    >
      <div
        className="profile-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="profile-header row-sb div">
          <span className="profile-title">Profile</span>
          <button
            className="profile-close-btn row"
            onClick={onClose}
          >
            ✕ Close
          </button>
        </div>

        <div className="profile-divider" />

        {/* Body */}
        <div className="profile-body">
          {/* Info */}
          <div className="profile-info-section div">
            <div className="profile-info-top">
              {editing ? (
                <>
                  <button
                    className="profile-action-btn save"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="profile-action-btn cancel"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  className="profile-action-btn edit"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
            </div>

            <div className="profile-field">
              <span className="profile-field-label">
                Name
              </span>
              {editing ? (
                <input
                  className="profile-field-input"
                  value={draft.name}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      name: e.target.value,
                    })
                  }
                />
              ) : (
                <span className="profile-field-value">
                  {profile.name}
                </span>
              )}
            </div>

            <div className="profile-field">
              <span className="profile-field-label">
                Email
              </span>
              {editing ? (
                <input
                  className="profile-field-input"
                  value={draft.email}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      email: e.target.value,
                    })
                  }
                />
              ) : (
                <span className="profile-field-value">
                  {profile.email}
                </span>
              )}
            </div>

            <div className="profile-field">
              <span className="profile-field-label">
                Ph No
              </span>
              <span className="profile-field-value profile-field-static">
                {profile.phone}
              </span>
            </div>
          </div>

          <div className="profile-divider" />

          {/* Orders */}
          <div className="profile-section">
            <button
              className="profile-section-toggle"
              onClick={() =>
                setOrdersOpen((o) => !o)
              }
            >
              <span className="profile-section-title">
                Orders
              </span>
              <span className="profile-section-icon">
                {ordersOpen ? '−' : '+'}
              </span>
            </button>

            {ordersOpen && (
              <div className="profile-orders-list">
                {ordersLoading ? (
                  <div className="profile-empty">
                    Loading orders…
                  </div>
                ) : orders.length === 0 ? (
                  <div className="profile-empty">
                    No orders yet.
                  </div>
                ) : (
                  orders.map((order, index) => (
                    <React.Fragment
                      key={order.orderId}
                    >
                      <OrderCard order={order} />
                      {index <
                        orders.length - 1 && (
                          <div className="profile-divider" />
                        )}
                    </React.Fragment>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="profile-divider" />

          {/* Address */}
          <div className="profile-section">
            <button
              className="profile-section-toggle"
              onClick={() =>
                setAddressOpen((o) => !o)
              }
            >
              <span className="profile-section-title">
                Address
              </span>
              <span className="profile-section-icon">
                {addressOpen ? '−' : '+'}
              </span>
            </button>

            {addressOpen && (
              <div className="profile-address-body">
                <div className="profile-empty">
                  No address saved.
                </div>
              </div>
            )}
          </div>

          <div className="profile-divider" />
        </div>

        {/* Footer */}
        <div className="profile-footer div">
          <button className="profile-logout-btn">
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile