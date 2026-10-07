import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowLeft, Sparkles } from 'lucide-react';

async function getCollection(slug: string) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
  try {
    const res = await fetch(`${backendUrl}/api/public/v1/collections/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const col = await getCollection(params.slug);
  if (!col) return { title: 'Collection | SÉRA BY SIMRAN' };
  return {
    title: `${col.seo_title || col.name} | SÉRA BY SIMRAN`,
    description: col.seo_description || col.tagline || 'Curated demi-fine collection.',
  };
}

export default async function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = await getCollection(params.slug);
  if (!collection) notFound();

  return (
    <div className="min-h-screen bg-sera-ivory text-sera-espresso flex flex-col font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />

      <main className="flex-1 py-12 px-6 lg:px-12 max-w-container mx-auto w-full">
        <Link
          href="/collections"
          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-sera-taupe hover:text-sera-espresso transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Collections</span>
        </Link>

        {/* Collection Hero */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-2">
            {collection.kind} Capsule
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal">
            {collection.name}
          </h1>
          {collection.tagline && (
            <p className="text-xs sm:text-sm text-sera-taupe mt-3 leading-relaxed">
              {collection.tagline}
            </p>
          )}
        </div>

        {/* Product Grid */}
        {collection.products?.length === 0 ? (
          <div className="text-center py-16 bg-white/40 border border-sera-taupe/20 rounded-sm p-8 max-w-md mx-auto">
            <Sparkles className="w-6 h-6 text-sera-champagne mx-auto mb-2" />
            <p className="text-xs text-sera-taupe leading-relaxed">
              Pieces for this capsule are arriving shortly from the atelier.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collection.products.map((p: any) => (
              <ProductCard
                key={p.id}
                product={{
                  id: p.id,
                  slug: p.slug,
                  name: p.name,
                  sku: p.sku,
                  price_paise: p.price_paise,
                  compare_at_paise: p.compare_at_paise,
                  image_url: p.product_media?.[0]?.media_asset?.public_url,
                  badge: p.badge !== 'none' ? p.badge : undefined,
                }}
              />
            ))}
          </div>
        )}
      </main>

      <EnquiryTrayDrawer />
      <BoutiqueFooter />
    </div>
  );
}
