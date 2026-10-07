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

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [channel, setChannel] = useState('whatsapp');
  const [occasion, setOccasion] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

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

  async function handleEnquirySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (trayItems.length === 0) return;

    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        full_name: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        preferred_channel: channel,
        occasion: occasion.trim() || undefined,
        message: message.trim() || undefined,
        marketing_consent: consent,
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
      setError(err?.message || 'Failed to submit enquiry. Please try again or reach out on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setSubmittedRef(null);
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
          <div className="p-6 border-b border-sera-taupe/20 flex items-center justify-between bg-white/50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-sera-espresso" />
              <h2 className="font-serif text-lg text-sera-espresso font-normal">
                Bespoke Enquiry Tray
              </h2>
              <span className="text-xs text-sera-taupe font-mono">({totalTrayCount})</span>
            </div>
            <button
              onClick={closeTray}
              className="text-sera-taupe hover:text-sera-espresso p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {submittedRef ? (
              /* Success Confirmation */
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-700">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-sera-taupe font-semibold block">
                  Enquiry Registered
                </span>
                <h3 className="font-serif text-2xl text-sera-espresso">
                  Thank You, {fullName || 'Valued Client'}
                </h3>
                <p className="text-xs text-sera-espresso/80 max-w-xs mx-auto leading-relaxed">
                  Your bespoke selection has been shared with our senior jewellery stylist. We will reach out shortly.
                </p>
                <div className="bg-white/80 border border-sera-taupe/30 rounded-sm p-4 max-w-xs mx-auto">
                  <span className="text-[10px] uppercase tracking-wider text-sera-taupe block">
                    Your VIP Enquiry Reference:
                  </span>
                  <span className="font-mono text-base font-bold text-sera-espresso block mt-1">
                    {submittedRef}
                  </span>
                </div>

                <div className="pt-4 space-y-2">
                  <a
                    href={`https://wa.me/919999999999?text=Hello%20SÉRA%20Concierge,%20my%20enquiry%20reference%20is%20${submittedRef}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 bg-emerald-700 text-white px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-semibold hover:bg-emerald-800 transition-colors w-full justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Track on WhatsApp Now</span>
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
              /* Empty Tray */
              <div className="text-center py-16 space-y-3 text-sera-taupe">
                <ShoppingBag className="w-10 h-10 mx-auto opacity-30 text-sera-espresso" />
                <h3 className="font-serif text-base text-sera-espresso">Your tray is currently empty</h3>
                <p className="text-xs max-w-xs mx-auto">
                  Discover our curated fine jewellery creations and add pieces here to request custom quotes or consultations.
                </p>
                <button
                  onClick={closeTray}
                  className="mt-3 inline-flex items-center space-x-1.5 border border-sera-espresso text-sera-espresso px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-sera-beige/40 transition-colors"
                >
                  <span>Explore Boutique</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ) : (
              /* Tray Items List + Lead Capture */
              <>
                {/* Items */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-widest text-sera-taupe font-semibold block">
                    Selected Pieces ({totalTrayCount})
                  </span>
                  <div className="divide-y divide-sera-taupe/15 bg-white/70 border border-sera-taupe/30 rounded-sm">
                    {trayItems.map((item) => (
                      <div key={item.product.id} className="p-3.5 flex items-start justify-between gap-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-sera-beige/30 rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center">
                            {item.product.image_url ? (
                              <img
                                src={item.product.image_url}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-[10px] text-sera-taupe font-mono">SÉRA</span>
                            )}
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-sera-espresso leading-snug">
                              {item.product.name}
                            </h4>
                            <p className="text-[10px] text-sera-taupe font-mono mt-0.5">
                              {item.product.sku}
                            </p>
                            <p className="text-xs font-mono font-medium text-sera-espresso mt-1">
                              {formatPrice(item.product.price_paise)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <button
                            onClick={() => removeFromTray(item.product.id)}
                            className="text-sera-taupe hover:text-rose-600 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div className="flex items-center border border-sera-taupe/30 rounded-sm bg-white">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 text-sera-taupe hover:text-sera-espresso"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="px-2 text-xs font-mono text-sera-espresso font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 text-sera-taupe hover:text-sera-espresso"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 px-1">
                    <span className="text-sera-taupe uppercase tracking-wider">Estimated Value</span>
                    <span className="font-mono font-semibold text-sera-espresso text-sm">
                      {formatPrice(totalTrayPaise)}
                    </span>
                  </div>
                </div>

                {/* Lead Capture Form */}
                <form id="enquiry-form" onSubmit={handleEnquirySubmit} className="space-y-4 pt-2 border-t border-sera-taupe/20">
                  <span className="text-[10px] uppercase tracking-widest text-sera-taupe font-semibold block">
                    Concierge Consultation Details
                  </span>

                  {error && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-sm flex items-start space-x-2 text-xs text-rose-700">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-sera-espresso font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full px-3 py-2 text-xs bg-white border border-sera-taupe/40 rounded-sm focus:outline-none focus:border-sera-espresso"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-sera-espresso font-semibold mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs bg-white border border-sera-taupe/40 rounded-sm focus:outline-none focus:border-sera-espresso font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-sera-espresso font-semibold mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="client@luxury.in"
                        className="w-full px-3 py-2 text-xs bg-white border border-sera-taupe/40 rounded-sm focus:outline-none focus:border-sera-espresso"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-sera-espresso font-semibold mb-1">
                        Channel
                      </label>
                      <select
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-sera-taupe/40 rounded-sm focus:outline-none focus:border-sera-espresso"
                      >
                        <option value="whatsapp">WhatsApp</option>
                        <option value="phone">Phone Call</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-sera-espresso font-semibold mb-1">
                      Occasion / Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. Need by next Friday for an engagement ceremony, custom chain length..."
                      className="w-full px-3 py-2 text-xs bg-white border border-sera-taupe/40 rounded-sm focus:outline-none focus:border-sera-espresso resize-none"
                    />
                  </div>

                  <div className="flex items-center space-x-2 text-[11px] text-sera-taupe">
                    <ShieldCheck className="w-3.5 h-3.5 text-sera-champagne flex-shrink-0" />
                    <span>Your details are kept private and never shared with third parties.</span>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer Submit Button */}
          {!submittedRef && trayItems.length > 0 && (
            <div className="p-6 border-t border-sera-taupe/20 bg-white/50">
              <button
                type="submit"
                form="enquiry-form"
                disabled={submitting}
                className="w-full bg-sera-espresso text-sera-ivory py-3 rounded-sm text-xs uppercase tracking-widest font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center space-x-2 shadow-sm"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Request Concierge Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
