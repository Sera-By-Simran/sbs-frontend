'use client';

import React, { useState } from 'react';
import { useTray } from '@/context/TrayContext';
import { api } from '@/lib/api/client';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  MessageCircle,
  Loader2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Tag,
} from 'lucide-react';

export const EnquiryTrayDrawer: React.FC = () => {
  const {
    trayItems,
    isTrayOpen,
    closeTray,
    removeFromTray,
    updateQuantity,
    clearTray,
    totalTrayCount,
    totalTrayPaise,
  } = useTray();

  // Mode: 'cart' | 'checkout'
  const [drawerStep, setDrawerStep] = useState<'cart' | 'checkout'>('cart');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Form State (Checkout)
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!isTrayOpen) return null;

  function formatPrice(paise: number) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(paise / 100);
  }

  function handleApplyCoupon() {
    if (couponCode.trim().toUpperCase() === 'SERA10') {
      setCouponApplied(true);
      setCouponDiscount(Math.round(totalTrayPaise * 0.1));
    } else if (couponCode.trim()) {
      alert('Invalid or expired coupon code.');
    }
  }

  const finalTotalPaise = Math.max(0, totalTrayPaise - couponDiscount);

  async function handleCheckoutSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (trayItems.length === 0) return;

    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        full_name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        preferred_channel: 'whatsapp' as const,
        occasion: `Address: ${address}, ${city} - ${pincode}`,
        message: couponApplied ? `Coupon Applied: ${couponCode.toUpperCase()}` : undefined,
        _hp: honeypot,
        items: trayItems.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          customer_note: item.note,
        })),
      };

      const res = await api.submitEnquiry(payload);
      if (res.success) {
        setSubmittedRef(res.data.reference);
        clearTray();
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to submit order. Please reach out to concierge.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setSubmittedRef(null);
    setDrawerStep('cart');
    closeTray();
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        onClick={closeTray}
        className="absolute inset-0 bg-sera-espresso/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-sera-ivory shadow-2xl flex flex-col justify-between border-l border-sera-taupe/30">
          {/* Header */}
          <div className="p-5 border-b border-sera-taupe/20 flex items-center justify-between bg-white/60">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-sera-espresso" />
              <h2 className="font-serif text-lg text-sera-espresso font-normal">
                {drawerStep === 'cart' ? `Your Cart (${totalTrayCount})` : 'Checkout'}
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              {drawerStep === 'cart' && trayItems.length > 0 && (
                <button
                  onClick={clearTray}
                  className="text-[11px] text-sera-taupe hover:text-rose-700 underline uppercase tracking-wider"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={closeTray}
                className="text-sera-taupe hover:text-sera-espresso p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {submittedRef ? (
              /* Success Confirmation */
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-sera-taupe font-semibold block">
                  Order Request Received
                </span>
                <h3 className="font-serif text-2xl text-sera-espresso">
                  Thank You, {fullName || 'Valued Client'}
                </h3>
                <p className="text-xs text-sera-espresso/80 max-w-xs mx-auto leading-relaxed">
                  Your bespoke selection has been routed to our concierge team. We are preparing your payment link and insured dispatch.
                </p>
                <div className="bg-white/80 border border-sera-taupe/30 rounded-sm p-4 max-w-xs mx-auto">
                  <span className="text-[10px] uppercase tracking-wider text-sera-taupe block">
                    Your Order Reference:
                  </span>
                  <span className="font-mono text-base font-bold text-sera-espresso block mt-1">
                    {submittedRef}
                  </span>
                </div>

                <div className="pt-4 space-y-2">
                  <a
                    href={`https://wa.me/919999999999?text=Hello%20SÉRA%20Concierge,%20my%20order%20reference%20is%20${submittedRef}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 bg-emerald-700 text-white px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold hover:bg-emerald-800 transition-colors w-full justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Confirm Instantly via WhatsApp</span>
                  </a>
                  <button
                    onClick={handleReset}
                    className="w-full text-xs text-sera-espresso/70 hover:text-sera-espresso py-2"
                  >
                    Continue Browsing Boutique
                  </button>
                </div>
              </div>
            ) : trayItems.length === 0 ? (
              /* Empty Cart */
              <div className="text-center py-16 space-y-3 text-sera-taupe">
                <ShoppingBag className="w-10 h-10 mx-auto opacity-30 text-sera-espresso" />
                <h3 className="font-serif text-base text-sera-espresso">Your Cart Is Empty</h3>
                <p className="text-xs max-w-xs mx-auto">
                  Discover our curated fine jewellery creations and add pieces here.
                </p>
                <button
                  onClick={closeTray}
                  className="mt-3 inline-flex items-center space-x-1.5 border border-sera-espresso text-sera-espresso px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-sera-beige/40 transition-colors"
                >
                  <span>Explore Boutique</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ) : drawerStep === 'cart' ? (
              /* Step 1: Cart Items + Coupon + Subtotal (Board 05 Left) */
              <>
                <div className="space-y-3">
                  <div className="divide-y divide-sera-taupe/15 bg-white/70 border border-sera-taupe/20 rounded-sm">
                    {trayItems.map((item) => (
                      <div key={item.product.id} className="p-3.5 flex items-center justify-between gap-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-14 h-14 bg-sera-beige/30 rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center border border-sera-taupe/20">
                            {item.product.image_url ? (
                              <img
                                src={item.product.image_url}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-[10px] text-sera-taupe font-serif">SÉRA</span>
                            )}
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-sera-espresso leading-snug">
                              {item.product.name}
                            </h4>
                            <p className="text-xs font-mono font-medium text-sera-espresso mt-1">
                              {formatPrice(item.product.price_paise)}
                            </p>
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2 mt-2 bg-white border border-sera-taupe/30 px-2 py-0.5 rounded-xs w-fit">
                              <button
                                onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="text-sera-taupe hover:text-sera-espresso p-0.5"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="font-mono text-xs font-semibold px-1">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="text-sera-taupe hover:text-sera-espresso p-0.5"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromTray(item.product.id)}
                          className="text-sera-taupe hover:text-rose-700 p-1.5"
                          title="Remove piece"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Apply Coupon Code (Board 05) */}
                <div className="pt-2">
                  <label className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold block mb-1">
                    Apply Coupon Code
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Enter coupon (e.g. SERA10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-white border border-sera-taupe/30 px-3 py-2 text-xs font-mono uppercase rounded-l-sm focus:outline-none focus:border-sera-espresso"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="bg-sera-espresso text-sera-ivory px-4 py-2 text-xs uppercase font-semibold rounded-r-sm hover:opacity-90"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-[11px] text-emerald-700 mt-1 flex items-center space-x-1">
                      <Tag className="w-3 h-3" />
                      <span>SERA10 applied (10% VIP Courtesy Discount)</span>
                    </p>
                  )}
                </div>

                {/* Order Summary Breakdown */}
                <div className="p-4 bg-white/70 border border-sera-taupe/20 rounded-sm space-y-2 text-xs">
                  <div className="flex justify-between text-sera-taupe">
                    <span>Subtotal</span>
                    <span className="font-mono text-sera-espresso">{formatPrice(totalTrayPaise)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount</span>
                      <span className="font-mono">- {formatPrice(couponDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sera-taupe">
                    <span>Shipping</span>
                    <span className="text-[11px] text-emerald-700 font-semibold">Complimentary</span>
                  </div>
                  <div className="border-t border-sera-taupe/20 pt-2 flex justify-between font-semibold text-sm text-sera-espresso">
                    <span>Total</span>
                    <span className="font-mono text-base font-bold">{formatPrice(finalTotalPaise)}</span>
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={() => setDrawerStep('checkout')}
                  className="w-full bg-sera-espresso text-sera-ivory py-3.5 rounded-sm text-xs uppercase tracking-widest font-semibold hover:opacity-90 flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-sera-champagne" />
                </button>
              </>
            ) : (
              /* Step 2: Checkout Form (Board 05 Right) */
              <form onSubmit={handleCheckoutSubmit} className="space-y-5 text-xs">
                {/* Stepper indicator */}
                <div className="flex items-center justify-between text-[10px] uppercase font-semibold text-sera-taupe pb-2 border-b border-sera-taupe/20">
                  <span className="text-sera-espresso font-bold">1. Information</span>
                  <span>→</span>
                  <span className="text-sera-espresso font-bold">2. Shipping</span>
                  <span>→</span>
                  <span>3. Payment</span>
                </div>

                <input
                  type="text"
                  name="_hp"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Contact Information */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold block">
                    Contact Information
                  </span>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-sera-taupe/30 px-3 py-2.5 rounded-sm focus:outline-none focus:border-sera-espresso"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="Phone (WhatsApp) *"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-sera-taupe/30 px-3 py-2.5 rounded-sm focus:outline-none focus:border-sera-espresso font-mono"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-sera-taupe/30 px-3 py-2.5 rounded-sm focus:outline-none focus:border-sera-espresso"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-3 pt-2 border-t border-sera-taupe/20">
                  <span className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold block">
                    Shipping Address
                  </span>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="House / Street / Apartment *"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white border border-sera-taupe/30 px-3 py-2.5 rounded-sm focus:outline-none focus:border-sera-espresso"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="City *"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-sera-taupe/30 px-3 py-2.5 rounded-sm focus:outline-none focus:border-sera-espresso"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Pincode *"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-white border border-sera-taupe/30 px-3 py-2.5 rounded-sm focus:outline-none focus:border-sera-espresso font-mono"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-sm text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-sera-espresso text-sera-ivory py-3.5 rounded-sm text-xs uppercase tracking-widest font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center space-x-2 shadow-sm"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-sera-champagne" />
                        <span>Confirming Order...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue to Payment ({formatPrice(finalTotalPaise)})</span>
                        <ArrowRight className="w-4 h-4 text-sera-champagne" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setDrawerStep('cart')}
                    className="w-full text-xs text-sera-taupe hover:text-sera-espresso py-1 font-semibold uppercase tracking-wider"
                  >
                    ← Back to Cart
                  </button>
                </div>

                {/* Payment Badges (Board 06) */}
                <div className="pt-3 border-t border-sera-taupe/20 text-center">
                  <span className="text-[10px] text-sera-taupe uppercase tracking-wider block mb-2 font-semibold">
                    Encrypted 100% Safe Checkout
                  </span>
                  <div className="flex items-center justify-center space-x-3 text-xs font-mono font-bold text-sera-espresso/70">
                    <span className="px-2 py-1 bg-white border border-sera-taupe/20 rounded-xs">UPI</span>
                    <span className="px-2 py-1 bg-white border border-sera-taupe/20 rounded-xs">VISA</span>
                    <span className="px-2 py-1 bg-white border border-sera-taupe/20 rounded-xs">Mastercard</span>
                    <span className="px-2 py-1 bg-white border border-sera-taupe/20 rounded-xs">RuPay</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
