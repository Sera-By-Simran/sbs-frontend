'use client';

import React, { useState } from 'react';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import { Truck, Search, Loader2, CheckCircle2, Clock, PackageCheck, AlertCircle, ExternalLink } from 'lucide-react';

export default function TrackOrderPage() {
  const [reference, setReference] = useState('');
  const [phone, setPhone] = useState('');
  const [hp, setHp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<any | null>(null);

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    if (!reference.trim()) return;

    setLoading(true);
    setError(null);
    setOrderData(null);

    try {
      const res = await fetch('/api/track-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference: reference.trim(),
          phone: phone.trim() || undefined,
          _hp: hp,
        }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setOrderData(data.data.order);
      } else {
        setError(data?.error?.message || 'Unable to locate order with this reference.');
      }
    } catch {
      setError('Connection error. Please try again or contact concierge.');
    } finally {
      setLoading(false);
    }
  }

  function formatPrice(paise: number) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(paise / 100);
  }

  const milestones = [
    { key: 'customer_confirmed', label: 'Order Confirmed' },
    { key: 'sourced', label: 'Artisan Sourcing' },
    { key: 'qc_passed', label: 'Quality Verification' },
    { key: 'packed', label: 'Signature Packaging' },
    { key: 'dispatched', label: 'Dispatched' },
    { key: 'delivered', label: 'Delivered' },
  ];

  function isMilestoneDone(mKey: string, currentStatus: string) {
    const orderIndex = milestones.findIndex((m) => m.key === mKey);
    const currentIndex = milestones.findIndex((m) => m.key === currentStatus);
    if (currentIndex === -1) return false;
    return orderIndex <= currentIndex;
  }

  return (
    <div className="min-h-screen bg-sera-ivory text-sera-espresso flex flex-col font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />

      <main className="flex-1 py-14 px-6 lg:px-12 max-w-container mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-2">
            Private Client Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-sera-taupe mt-3 leading-relaxed">
            Follow the bespoke journey of your demi-fine jewellery piece from artisanal finishing to insured doorstep arrival.
          </p>
        </div>

        {/* Lookup Box */}
        <div className="max-w-md mx-auto bg-white border border-sera-taupe/20 p-6 rounded-sm shadow-sm mb-12">
          <form onSubmit={handleTrack} className="space-y-4">
            <input
              type="text"
              name="_hp"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold block mb-1">
                Order Reference *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SRA-O-001001"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="w-full bg-sera-ivory/50 border border-sera-taupe/30 px-3 py-2.5 text-xs font-mono uppercase rounded-sm focus:outline-none focus:border-sera-espresso"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold block mb-1">
                Phone Number (Last 4 digits or full phone)
              </label>
              <input
                type="text"
                placeholder="e.g. 9876"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-sera-ivory/50 border border-sera-taupe/30 px-3 py-2.5 text-xs font-mono rounded-sm focus:outline-none focus:border-sera-espresso"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-sera-espresso text-sera-ivory rounded-sm text-xs uppercase tracking-widest font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-sera-champagne" />
                  <span>Locating Order...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5 text-sera-champagne" />
                  <span>Verify & Track</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-sm text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Order Details Output */}
        {orderData && (
          <div className="max-w-2xl mx-auto bg-white border border-sera-taupe/20 rounded-sm p-6 sm:p-8 space-y-8 animate-in fade-in duration-200 shadow-sm">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-sera-taupe/20 gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-sera-taupe font-semibold block">
                  Reference Confirmed
                </span>
                <h3 className="font-serif text-2xl text-sera-espresso mt-0.5">
                  {orderData.reference}
                </h3>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-sm text-xs uppercase font-semibold tracking-wider">
                {orderData.status.replace(/_/g, ' ')}
              </span>
            </div>

            {/* Milestones Timeline */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-sera-taupe font-semibold block mb-4">
                Fulfilment Timeline
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {milestones.map((m) => {
                  const done = isMilestoneDone(m.key, orderData.status);
                  return (
                    <div
                      key={m.key}
                      className={`p-3 rounded-sm border flex items-center space-x-2.5 ${
                        done
                          ? 'border-emerald-200 bg-emerald-50/60 text-emerald-900'
                          : 'border-sera-taupe/20 bg-sera-ivory/30 text-sera-taupe'
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-sera-taupe/40 flex-shrink-0" />
                      )}
                      <span className="font-medium text-[11px]">{m.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipment Dispatch Card if present */}
            {orderData.shipment && (
              <div className="p-4 bg-sera-ivory border border-sera-taupe/30 rounded-sm space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sera-espresso flex items-center space-x-1.5">
                    <Truck className="w-4 h-4 text-amber-800" />
                    <span>Courier: {orderData.shipment.carrier}</span>
                  </span>
                  <span className="font-mono text-[11px] text-sera-taupe">
                    AWB: {orderData.shipment.tracking_no}
                  </span>
                </div>
                {orderData.shipment.tracking_url && (
                  <a
                    href={orderData.shipment.tracking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-sera-espresso font-semibold underline text-[11px] hover:text-amber-800"
                  >
                    <span>View Live Carrier Telemetry</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}

            {/* Pieces Snapshot */}
            <div>
              <span className="text-[10px] uppercase tracking-widest text-sera-taupe font-semibold block mb-3">
                Order Pieces
              </span>
              <div className="space-y-2">
                {orderData.items?.map((item: any) => (
                  <div
                    key={item.id}
                    className="p-3 bg-sera-ivory/30 border border-sera-taupe/15 rounded-sm flex items-center justify-between text-xs"
                  >
                    <div>
                      <h4 className="font-serif font-medium text-sera-espresso">{item.name_snapshot}</h4>
                      <span className="text-[10px] font-mono text-sera-taupe">{item.sku_snapshot}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-medium">{formatPrice(item.unit_price_paise)}</span>
                      <span className="text-[10px] text-sera-taupe block">Qty: {item.quantity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <EnquiryTrayDrawer />
      <BoutiqueFooter />
    </div>
  );
}
