'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { MessageCircle, Gem, Sparkles, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';

export const BoutiqueFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, _hp: hp, source: 'footer' }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus('success');
        setFeedback(data.data?.message || 'Enrolled in SÉRA Private Client Journal.');
        setEmail('');
      } else {
        setStatus('error');
        setFeedback(data?.error?.message || 'Subscription failed. Please retry.');
      }
    } catch {
      setStatus('error');
      setFeedback('Network error. Please try again.');
    }
  }

  return (
    <footer className="bg-sera-espresso text-sera-ivory font-sans border-t border-sera-taupe/20">
      {/* Upper Concierge Bar */}
      <div className="border-b border-sera-taupe/20 py-10 px-6 lg:px-12">
        <div className="max-w-container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-sera-champagne font-semibold block mb-1">
              Private Concierge Consultation
            </span>
            <h3 className="font-serif text-2xl font-normal text-sera-ivory">
              Personalised Styling & Custom Inquiries
            </h3>
            <p className="text-xs text-sera-taupe/90 mt-1 max-w-md">
              Connect with our styling team for sizing guidance, gift curation, and bespoke order requests.
            </p>
          </div>

          <a
            href="https://wa.me/?text=Hello%20SÉRA%20Concierge,%20I%20would%20like%20to%20enquire%20about%20your%20jewellery%20collection."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-sera-champagne text-sera-espresso px-6 py-3 rounded-sm text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="py-14 px-6 lg:px-12 max-w-container mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand & Newsletter Column */}
        <div className="md:col-span-2 space-y-4">
          <BrandLogo variant="footer" priority={false} />
          <p className="text-xs text-sera-taupe leading-relaxed mt-3 max-w-sm">
            SÉRA BY SIMRAN is a luxury demi-fine boutique crafting timeless, conscious jewellery designed for the modern woman who embraces quiet opulence.
          </p>

          {/* Newsletter Box */}
          <div className="pt-2">
            <span className="text-[10px] uppercase tracking-widest text-sera-champagne font-semibold block mb-2">
              SÉRA Private Client Journal
            </span>
            <form onSubmit={handleNewsletter} className="relative max-w-sm">
              <input
                type="text"
                name="_hp"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              <div className="flex">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border border-sera-taupe/30 text-sera-ivory placeholder-sera-taupe/60 text-xs px-3.5 py-2.5 rounded-l-sm focus:outline-none focus:border-sera-champagne w-full"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-sera-champagne text-sera-espresso px-4 py-2.5 rounded-r-sm text-xs uppercase font-semibold tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center flex-shrink-0"
                >
                  {status === 'loading' ? '...' : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {feedback && (
                <p className={`text-[11px] mt-1.5 ${status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {feedback}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Boutiques & Collections */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-sera-champagne font-semibold mb-4">
            Catalogue
          </h4>
          <ul className="space-y-2 text-xs text-sera-ivory/80">
            <li>
              <Link href="/boutique" className="hover:text-sera-champagne transition-colors">
                The Complete Boutique
              </Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-sera-champagne transition-colors">
                Curated Collections
              </Link>
            </li>
            <li>
              <Link href="/edit" className="hover:text-sera-champagne transition-colors">
                SÉRA EDIT (Journal)
              </Link>
            </li>
            <li>
              <Link href="/showroom" className="hover:text-sera-champagne transition-colors">
                Digital Showroom Tour
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-sera-champagne transition-colors">
                Personal Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Client Care & Tracking */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-sera-champagne font-semibold mb-4">
            Client Concierge
          </h4>
          <ul className="space-y-2 text-xs text-sera-ivory/80">
            <li>
              <Link href="/track-order" className="hover:text-sera-champagne transition-colors">
                Track Order Status
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-sera-champagne transition-colors">
                Contact Concierge
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-sera-champagne transition-colors">
                The SÉRA Story
              </Link>
            </li>
            <li>
              <Link href="/policies/shipping" className="hover:text-sera-champagne transition-colors">
                Shipping & Delivery
              </Link>
            </li>
            <li>
              <Link href="/policies/returns" className="hover:text-sera-champagne transition-colors">
                Returns & Exchange
              </Link>
            </li>
          </ul>
        </div>

        {/* Brand Commitments */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-sera-champagne font-semibold mb-2">
            The SÉRA Standards
          </h4>
          <div className="flex items-start space-x-2.5 text-xs text-sera-taupe">
            <Gem className="w-4 h-4 text-sera-champagne flex-shrink-0 mt-0.5" />
            <span>Artisan Handcrafted Demi-Fine Jewellery</span>
          </div>
          <div className="flex items-start space-x-2.5 text-xs text-sera-taupe">
            <HeartHandshake className="w-4 h-4 text-sera-champagne flex-shrink-0 mt-0.5" />
            <span>Personalised Concierge Guidance</span>
          </div>
          <div className="flex items-start space-x-2.5 text-xs text-sera-taupe">
            <Sparkles className="w-4 h-4 text-sera-champagne flex-shrink-0 mt-0.5" />
            <span>Signature SÉRA Keepsake Packaging</span>
          </div>
          <div className="flex items-start space-x-2.5 text-xs text-sera-taupe">
            <CheckCircle2 className="w-4 h-4 text-sera-champagne flex-shrink-0 mt-0.5" />
            <span>Pan-India Safe Delivery</span>
          </div>
        </div>
      </div>

      {/* Policies & Copyright Bar */}
      <div className="border-t border-sera-taupe/20 py-6 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-sera-taupe max-w-container mx-auto">
        <p>© 2026 SÉRA BY SIMRAN. All Rights Reserved. Luxury Demi-Fine Jewellery.</p>
        <div className="flex items-center space-x-6 text-[11px]">
          <Link href="/policies/privacy" className="hover:text-sera-ivory transition-colors">
            Privacy Policy
          </Link>
          <Link href="/policies/terms" className="hover:text-sera-ivory transition-colors">
            Terms of Service
          </Link>
          <Link href="/policies/shipping" className="hover:text-sera-ivory transition-colors">
            Shipping Policy
          </Link>
          <Link href="/policies/returns" className="hover:text-sera-ivory transition-colors">
            Returns Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};
