'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/brand/BrandLogo';
import {
  Instagram,
  ArrowRight,
  Heart,
  Youtube,
  Share2,
} from 'lucide-react';

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
      {/* Main Footer Content (Board 07 Layout) */}
      <div className="py-14 px-6 lg:px-12 max-w-container mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand & Socials Column (Left) */}
        <div className="md:col-span-5 space-y-4">
          <BrandLogo variant="footer" priority={false} />
          <p className="text-xs text-sera-taupe leading-relaxed max-w-sm">
            Timeless jewellery for every you. Minimal designs, Modern expressions. Crafted with conscious 18K gold vermeil and sterling silver.
          </p>

          {/* Social Icons (Board 07) */}
          <div className="flex items-center space-x-3 pt-2 text-sera-taupe">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-sera-taupe/30 hover:text-sera-ivory hover:border-sera-ivory transition-colors"
              title="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-sera-taupe/30 hover:text-sera-ivory hover:border-sera-ivory transition-colors"
              title="Pinterest"
            >
              <Share2 className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full border border-sera-taupe/30 hover:text-sera-ivory hover:border-sera-ivory transition-colors"
              title="YouTube"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Newsletter Box */}
          <div className="pt-3 max-w-sm">
            <form onSubmit={handleNewsletter} className="relative">
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

        {/* Column 1: Shop */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-sera-champagne font-semibold">
            Shop
          </h4>
          <ul className="space-y-2 text-xs text-sera-ivory/80">
            <li>
              <Link href="/boutique?category=necklaces" className="hover:text-sera-champagne transition-colors">
                Necklaces
              </Link>
            </li>
            <li>
              <Link href="/boutique?category=earrings" className="hover:text-sera-champagne transition-colors">
                Earrings
              </Link>
            </li>
            <li>
              <Link href="/boutique?category=rings" className="hover:text-sera-champagne transition-colors">
                Rings
              </Link>
            </li>
            <li>
              <Link href="/boutique?category=bracelets" className="hover:text-sera-champagne transition-colors">
                Bracelets
              </Link>
            </li>
            <li>
              <Link href="/boutique" className="hover:text-sera-champagne transition-colors">
                All Collections
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Help */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-sera-champagne font-semibold">
            Help
          </h4>
          <ul className="space-y-2 text-xs text-sera-ivory/80">
            <li>
              <Link href="/policies/shipping" className="hover:text-sera-champagne transition-colors">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/policies/returns" className="hover:text-sera-champagne transition-colors">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/edit" className="hover:text-sera-champagne transition-colors">
                Jewellery Care
              </Link>
            </li>
            <li>
              <Link href="/track-order" className="hover:text-sera-champagne transition-colors">
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: About */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="text-xs uppercase tracking-widest text-sera-champagne font-semibold">
            About
          </h4>
          <ul className="space-y-2 text-xs text-sera-ivory/80">
            <li>
              <Link href="/about" className="hover:text-sera-champagne transition-colors">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-sera-champagne transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/policies/privacy" className="hover:text-sera-champagne transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/policies/terms" className="hover:text-sera-champagne transition-colors">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Sub-bar (Board 07) */}
      <div className="border-t border-sera-taupe/20 py-6 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-sera-taupe max-w-container mx-auto">
        <p>© 2026 SÉRA BY SIMRAN. All rights reserved.</p>
        <p className="flex items-center space-x-1 text-[11px]">
          <span>Made with</span>
          <Heart className="w-3 h-3 fill-rose-500 text-rose-500 inline" />
          <span>for timeless women.</span>
        </p>
      </div>
    </footer>
  );
};
