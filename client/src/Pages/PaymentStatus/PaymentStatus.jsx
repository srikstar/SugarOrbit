import React from "react";
import "./PaymentStatus.css";

const PaymentStatus = ({
    paymentSuccess = true,
    orderId = "ORD-2024-001",
    orderItems = [
        {
            "id": "1",
            "name": "Mysore Pak",
            "variant": "Classic · 250g",
            "price": 225,
            "quantity": 1,
            "emoji": "🍬"
        }, {
            "id": "1",
            "name": "Mysore Pak",
            "variant": "Classic · 250g",
            "price": 225,
            "quantity": 1,
            "emoji": "🍬"
        }
    ],
    deliveryAddress = {
        name: "John Doe",
        address: "123 Main Street",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001",
        phone: "+91 9876543210",
    },
    subtotal = 225,
    shipping = 100,
    paymentMethod = "UPI"
}) => {
    const total = subtotal + shipping;

    return (
        <div className="main-section">


            <div className="ps-wrapper">
                <div className="ps-card">

                    <div className="ps-header">
                        {paymentSuccess ? (
                            <>
                                <div className="ps-success-icon-large">✓</div>
                                <h1 className="ps-title">Payment successful!</h1>
                            </>
                        ) : (
                            <>
                                <div className="ps-error-icon-large">✕</div>
                                <h1 className="ps-title ps-error-title">Payment Failed</h1>
                                <p className="ps-subtitle">Something went wrong. Please try again.</p>
                            </>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="ps-content">

                        {/* Left - Item & Details */}
                        <div className="ps-col ps-col-left">
                            {/* Items List */}
                            <div className="ps-items-ordered">
                                <h4 className="ps-items-title">Items Ordered</h4>
                                <div className="ps-items-compact">
                                    {orderItems.map((item) => (
                                        <div className="ps-item-row" key={item.id}>
                                            <div className="ps-item-left">
                                                <span className="ps-item-emoji">{item.emoji}</span>
                                                <div className="ps-item-info-compact">
                                                    <span className="ps-item-name-compact">{item.name}</span>
                                                    <span className="ps-item-variant-compact">{item.variant}</span>
                                                </div>
                                            </div>
                                            <span className="ps-item-qty-compact">×{item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="ps-details-grid">
                                <div className="ps-detail-row">
                                    <span className="ps-detail-label">Transaction Date</span>
                                    <span className="ps-detail-value">Tuesday, 13 Aug 2024</span>
                                </div>
                                <div className="ps-detail-row">
                                    <span className="ps-detail-label">Payment Method</span>
                                    <span className="ps-detail-value">{paymentMethod} ending with 1234</span>
                                </div>
                                <div className="ps-detail-row">
                                    <span className="ps-detail-label">Subtotal</span>
                                    <span className="ps-detail-value">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="ps-detail-row">
                                    <span className="ps-detail-label">Tax</span>
                                    <span className="ps-detail-value">Included</span>
                                </div>
                                <div className="ps-detail-row">
                                    <span className="ps-detail-label">Shipping</span>
                                    <span className="ps-detail-value">₹{shipping.toFixed(2)}</span>
                                </div>
                                <div className="ps-detail-row">
                                    <span className="ps-detail-label">Total</span>
                                    <span className="ps-detail-value">₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right - Summary */}
                        <div className="ps-col ps-col-right">
                            <div className="ps-address-section">
                                <h4 className="ps-address-title">Delivery Address</h4>
                                <div className="ps-address-details">
                                    <div className="ps-addr-line">
                                        <span className="ps-addr-label">Name:</span>
                                        <span className="ps-addr-value">{deliveryAddress.name}</span>
                                    </div>
                                    <div className="ps-addr-line">
                                        <span className="ps-addr-label">Email:</span>
                                        <span className="ps-addr-value">{deliveryAddress.email}</span>
                                    </div>
                                    <div className="ps-addr-line">
                                        <span className="ps-addr-label">Phone:</span>
                                        <span className="ps-addr-value">{deliveryAddress.phone}</span>
                                    </div>
                                    <div className="ps-addr-line">
                                        <span className="ps-addr-label">Address:</span>
                                        <span className="ps-addr-value">{deliveryAddress.address}</span>
                                    </div>
                                    <div className="ps-addr-line">
                                        <span className="ps-addr-label">City:</span>
                                        <span className="ps-addr-value">{deliveryAddress.city}</span>
                                    </div>
                                    <div className="ps-addr-line">
                                        <span className="ps-addr-label">State:</span>
                                        <span className="ps-addr-value">{deliveryAddress.state}</span>
                                    </div>
                                    <div className="ps-addr-line">
                                        <span className="ps-addr-label">PIN Code:</span>
                                        <span className="ps-addr-value">{deliveryAddress.pincode}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentStatus;