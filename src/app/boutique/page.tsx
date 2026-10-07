'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import { ProductCard } from '@/components/product/ProductCard';
import { api } from '@/lib/api/client';
import {
  Gem,
  Search,
  Loader2,
  SlidersHorizontal,
  ChevronRight,
  Check,
} from 'lucide-react';

function BoutiqueContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const badgeParam = searchParams.get('badge');

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state matching Reference Board 02
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (categoryParam && !selectedCategories.includes(categoryParam)) {
      setSelectedCategories([categoryParam]);
    }
  }, [categoryParam]);

  useEffect(() => {
    async function loadCatalogue() {
      setLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          api.getCategories(),
          api.getProducts({ limit: 100 }),
        ]);

        if (catRes.success) setCategories(catRes.data);
        if (prodRes.success) setProducts(prodRes.data);
      } catch (err) {
        console.error('Failed to load catalogue:', err);
      } finally {
        setLoading(false);
      }
    }

    loadCatalogue();
  }, []);

  const categorySlugMap = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((c) => {
      map[c.id] = c.slug;
    });
    return map;
  }, [categories]);

  // Compute category count based on products
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      const slug = categorySlugMap[p.primary_category_id];
      if (slug) {
        counts[slug] = (counts[slug] || 0) + 1;
      }
    });
    return counts;
  }, [products, categorySlugMap]);

  function toggleCategory(slug: string) {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  function toggleMaterial(mat: string) {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  }

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      // Category filter
      if (selectedCategories.length > 0) {
        const productCatSlug = categorySlugMap[p.primary_category_id];
        if (!selectedCategories.includes(productCatSlug)) return false;
      }

      // Badge filter
      if (badgeParam && p.badge !== badgeParam) {
        return false;
      }

      // Max price filter
      const priceInr = p.price_paise / 100;
      if (priceInr > maxPrice) return false;

      // In stock
      if (inStockOnly && p.public_availability === 'sold_out') return false;

      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(q);
        const matchesSku = p.sku?.toLowerCase().includes(q);
        if (!matchesName && !matchesSku) return false;
      }

      return true;
    });

    // Sort
    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.price_paise - b.price_paise);
    } else if (sortBy === 'price_desc') {
      result.sort((a, b) => b.price_paise - a.price_paise);
    }

    return result;
  }, [products, selectedCategories, categorySlugMap, badgeParam, maxPrice, inStockOnly, searchQuery, sortBy]);

  // Determine active title and tagline based on single category selection
  const activeTitle = selectedCategories.length === 1
    ? categories.find((c) => c.slug === selectedCategories[0])?.name || 'Jewellery Collection'
    : 'All Jewellery Pieces';

  const activeTagline = selectedCategories.length === 1
    ? 'Delicate. Versatile. Timeless.'
    : 'Artisan handcrafted demi-fine jewellery for everyday elegance.';

  return (
    <div className="min-h-screen flex flex-col bg-sera-ivory text-sera-espresso font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />
      <EnquiryTrayDrawer />

      {/* Hero Category Banner (Matching Board 02) */}
      <section className="relative bg-gradient-to-b from-sera-beige/70 to-sera-ivory border-b border-sera-taupe/20 py-14 px-6 lg:px-12 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl text-sera-espresso font-normal">
          {activeTitle}
        </h1>
        <p className="text-xs sm:text-sm text-sera-taupe mt-2 font-serif italic">
          {activeTagline}
        </p>
      </section>

      {/* Breadcrumb Bar */}
      <div className="border-b border-sera-taupe/15 px-6 lg:px-12 py-3 bg-white/40 text-xs">
        <div className="max-w-container mx-auto flex items-center space-x-1.5 text-sera-taupe">
          <Link href="/" className="hover:text-sera-espresso">Home</Link>
          <ChevronRight className="w-3 h-3 text-sera-taupe/50" />
          <Link href="/boutique" className="hover:text-sera-espresso">Collections</Link>
          {selectedCategories.length === 1 && (
            <>
              <ChevronRight className="w-3 h-3 text-sera-taupe/50" />
              <span className="text-sera-espresso font-medium">{activeTitle}</span>
            </>
          )}
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <main className="flex-1 max-w-container mx-auto w-full px-6 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Sidebar Filter Column (Board 02 Sidebar) */}
          <aside className="lg:col-span-3 space-y-8 pr-0 lg:pr-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search pieces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-sera-taupe/30 rounded-sm focus:outline-none focus:border-sera-espresso"
              />
              <Search className="w-3.5 h-3.5 text-sera-taupe absolute left-2.5 top-2.5" />
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-sera-espresso">
                Category
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { name: 'Necklaces', slug: 'necklaces' },
                  { name: 'Earrings', slug: 'earrings' },
                  { name: 'Rings', slug: 'rings' },
                  { name: 'Bracelets', slug: 'bracelets' },
                ].map((c) => {
                  const checked = selectedCategories.includes(c.slug);
                  const count = categoryCounts[c.slug] || 0;
                  return (
                    <label
                      key={c.slug}
                      className="flex items-center justify-between cursor-pointer text-sera-espresso/90 hover:text-sera-espresso"
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleCategory(c.slug)}
                          className="w-3.5 h-3.5 rounded-xs accent-sera-espresso border-sera-taupe"
                        />
                        <span>{c.name}</span>
                      </div>
                      <span className="text-sera-taupe font-mono text-[11px]">
                        ({count})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3 pt-4 border-t border-sera-taupe/20">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-sera-espresso">
                  Price Range
                </h3>
                <span className="text-xs font-mono font-medium text-sera-espresso">
                  Up to ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="499"
                max="5000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-sera-espresso cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-sera-taupe">
                <span>₹499</span>
                <span>₹4,999+</span>
              </div>
            </div>

            {/* Material Filter */}
            <div className="space-y-3 pt-4 border-t border-sera-taupe/20">
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-sera-espresso">
                Material
              </h3>
              <div className="space-y-2 text-xs">
                {['18K Gold Plated', '925 Silver', 'Freshwater Pearl', 'Natural Stone', 'Mixed Material'].map((mat) => {
                  const checked = selectedMaterials.includes(mat);
                  return (
                    <label
                      key={mat}
                      className="flex items-center space-x-2 cursor-pointer text-sera-espresso/90 hover:text-sera-espresso"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleMaterial(mat)}
                        className="w-3.5 h-3.5 rounded-xs accent-sera-espresso border-sera-taupe"
                      />
                      <span>{mat}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-3 pt-4 border-t border-sera-taupe/20">
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-sera-espresso">
                Availability
              </h3>
              <label className="flex items-center space-x-2 text-xs cursor-pointer text-sera-espresso/90">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-3.5 h-3.5 rounded-xs accent-sera-espresso border-sera-taupe"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            {/* Reset Filters */}
            {(selectedCategories.length > 0 || maxPrice < 5000 || inStockOnly || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedMaterials([]);
                  setMaxPrice(5000);
                  setInStockOnly(false);
                  setSearchQuery('');
                }}
                className="w-full py-2 border border-sera-taupe/40 text-sera-espresso text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-white"
              >
                Clear All Filters
              </button>
            )}
          </aside>

          {/* Right Product Grid Column */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Bar (Count + Sort) */}
            <div className="flex items-center justify-between pb-4 border-b border-sera-taupe/20 text-xs">
              <span className="text-sera-taupe font-medium">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
              </span>

              <div className="flex items-center space-x-2">
                <span className="text-sera-taupe uppercase text-[10px] tracking-wider font-semibold">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-sera-taupe/30 text-xs px-3 py-1.5 rounded-sm focus:outline-none font-medium text-sera-espresso"
                >
                  <option value="featured">Featured</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center text-sera-taupe space-y-2">
                <Loader2 className="w-7 h-7 animate-spin text-sera-espresso" />
                <span className="text-xs uppercase tracking-widest font-semibold">Unveiling Pieces...</span>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="p-16 text-center text-sera-taupe bg-white/50 border border-sera-taupe/20 rounded-sm">
                <Gem className="w-8 h-8 mx-auto opacity-30 text-sera-espresso mb-3" />
                <h3 className="font-serif text-base text-sera-espresso">No Pieces In This Selection</h3>
                <p className="text-xs mt-1">Adjust your price slider or category checkboxes to view items.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={{
                      id: p.id,
                      slug: p.slug,
                      sku: p.sku,
                      name: p.name,
                      price_paise: p.price_paise,
                      compare_at_paise: p.compare_at_paise,
                      badge: p.badge,
                      image_url: p.primary_media_url || null,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <BoutiqueFooter />
    </div>
  );
}

export default function BoutiquePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-sera-ivory flex flex-col justify-between font-sans">
          <BoutiqueHeader />
          <div className="p-24 flex flex-col items-center justify-center text-sera-taupe space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-sera-espresso" />
            <span className="text-xs uppercase tracking-widest font-semibold">Opening Boutique Catalogue...</span>
          </div>
          <BoutiqueFooter />
        </div>
      }
    >
      <BoutiqueContent />
    </Suspense>
  );
}
