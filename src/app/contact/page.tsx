'use client';

import React, { useState } from 'react';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import { MessageCircle, Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [hp, setHp] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _hp: hp,
        }),
      });

      const data = await res.json();
      if (res.ok && data.ok) {
        setSuccessMsg(data.data?.message || 'Thank you. Our concierge team will reach out shortly.');
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        setErrorMsg(data?.error?.message || 'Failed to submit message. Please try WhatsApp.');
      }
    } catch {
      setErrorMsg('Network error. Please try reaching us via WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-sera-ivory text-sera-espresso flex flex-col font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />

      <main className="flex-1 py-16 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[10px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-2">
            Private Client Relations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal">
            Connect With Concierge
          </h1>
          <p className="text-xs sm:text-sm text-sera-taupe mt-3 leading-relaxed">
            Whether inquiring about bespoke sizing, wedding suites, or piece availability, our team is at your disposal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Direct Channels */}
          <div className="space-y-6">
            <div className="p-6 bg-white border border-sera-taupe/20 rounded-sm space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold block">
                Instant Assistance
              </span>
              <h3 className="font-serif text-lg text-sera-espresso">WhatsApp Stylist</h3>
              <p className="text-xs text-sera-taupe leading-relaxed">
                Connect directly with our head stylist for fast recommendations and sizing assistance.
              </p>
              <a
                href="https://wa.me/?text=Hello%20SÉRA%20Concierge,%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-amber-900 hover:text-amber-950 pt-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Open WhatsApp</span>
              </a>
            </div>

            <div className="p-6 bg-white border border-sera-taupe/20 rounded-sm space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold block">
                Private Journal
              </span>
              <h3 className="font-serif text-lg text-sera-espresso">Email Client Care</h3>
              <p className="text-xs text-sera-taupe leading-relaxed">
                For formal enquiries, partnerships, and bespoke orders.
              </p>
              <a
                href="mailto:concierge@serabysimran.com"
                className="inline-flex items-center space-x-2 text-xs font-semibold text-sera-espresso hover:underline pt-2 font-mono"
              >
                <Mail className="w-4 h-4 text-sera-taupe" />
                <span>concierge@serabysimran.com</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 bg-white border border-sera-taupe/20 p-8 rounded-sm shadow-sm">
            <h3 className="font-serif text-xl text-sera-espresso mb-4">Send a Message</h3>

            {successMsg ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-lg text-sera-espresso">Message Received</h4>
                <p className="text-xs text-sera-taupe max-w-sm mx-auto">{successMsg}</p>
                <button
                  onClick={() => setSuccessMsg(null)}
                  className="mt-4 px-4 py-2 border border-sera-taupe/30 text-xs font-semibold uppercase tracking-wider"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <input
                  type="text"
                  name="_hp"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full bg-sera-ivory/40 border border-sera-taupe/30 px-3 py-2.5 rounded-sm focus:outline-none focus:border-sera-espresso"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-sera-ivory/40 border border-sera-taupe/30 px-3 py-2.5 rounded-sm focus:outline-none focus:border-sera-espresso"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold block mb-1">
                      Phone Number (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-sera-ivory/40 border border-sera-taupe/30 px-3 py-2.5 rounded-sm focus:outline-none focus:border-sera-espresso font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold block mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bespoke Sizing / Custom Suite"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-sera-ivory/40 border border-sera-taupe/30 px-3 py-2.5 rounded-sm focus:outline-none focus:border-sera-espresso"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-sera-taupe font-semibold block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-sera-ivory/40 border border-sera-taupe/30 px-3 py-2.5 rounded-sm focus:outline-none focus:border-sera-espresso"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-sm text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-sera-espresso text-sera-ivory rounded-sm text-xs uppercase tracking-widest font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-sera-champagne" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-sera-champagne" />
                      <span>Transmit Message to Concierge</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <EnquiryTrayDrawer />
      <BoutiqueFooter />
    </div>
  );
}
