'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setLoading(true);
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
          const data = await res.json();
          if (data.ok) {
            setResults(data.data?.products || []);
          }
        } catch {
          setResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, isOpen]);

  if (!isOpen) return null;

  function formatPrice(paise: number) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(paise / 100);
  }

  return (
    <div className="fixed inset-0 z-50 bg-sera-espresso/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      <div className="bg-sera-ivory border border-sera-taupe/30 rounded-sm shadow-2xl max-w-xl w-full p-6 space-y-4">
        {/* Input Bar */}
        <div className="flex items-center space-x-3 border-b border-sera-taupe/30 pb-3">
          <Search className="w-5 h-5 text-sera-taupe" />
          <input
            type="text"
            autoFocus
            placeholder="Search necklaces, earrings, 18K vermeil, rings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-sera-espresso placeholder-sera-taupe/60 focus:outline-none"
          />
          {loading && <Loader2 className="w-4 h-4 animate-spin text-sera-taupe" />}
          <button
            onClick={onClose}
            className="p-1 text-sera-taupe hover:text-sera-espresso rounded-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="max-h-80 overflow-y-auto divide-y divide-sera-taupe/15">
          {query.trim().length < 2 ? (
            <div className="py-8 text-center text-xs text-sera-taupe space-y-2">
              <span className="uppercase tracking-widest text-[10px] block font-semibold">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {['Necklaces', 'Earrings', 'Solitaire', 'Bracelets', 'Gold Vermeil'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 bg-white/70 border border-sera-taupe/20 rounded-sm text-xs hover:border-sera-espresso transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 && !loading ? (
            <div className="py-8 text-center text-xs text-sera-taupe">
              No pieces match &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="py-3 px-2 flex items-center justify-between hover:bg-white/60 transition-colors rounded-sm group"
              >
                <div>
                  <h4 className="font-serif text-sm text-sera-espresso group-hover:text-amber-900 transition-colors">
                    {product.name}
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider text-sera-taupe font-mono">
                    {product.sku}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-medium text-sera-espresso">
                    {formatPrice(product.price_paise)}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-sera-taupe group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
