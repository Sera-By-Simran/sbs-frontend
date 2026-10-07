import React from 'react';
import Link from 'next/link';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import { ArrowRight, Sparkles } from 'lucide-react';

async function getCollections() {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
  try {
    const res = await fetch(`${backendUrl}/api/public/v1/collections`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export const metadata = {
  title: 'Curated Collections | SÉRA BY SIMRAN',
  description: 'Explore limited capsule collections and bespoke edits handcrafted with artisanal precision.',
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="min-h-screen bg-sera-ivory text-sera-espresso flex flex-col font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />

      <main className="flex-1 py-12 px-6 lg:px-12 max-w-container mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-2">
            The SÉRA Anthology
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal tracking-tight">
            Curated Jewellery Capsules
          </h1>
          <p className="text-xs sm:text-sm text-sera-taupe mt-3 leading-relaxed">
            Thoughtfully assembled suites of demi-fine adornments, united by distinct metallurgy, silhouette, and artisanal mood.
          </p>
        </div>

        {collections.length === 0 ? (
          <div className="text-center py-20 bg-white/40 border border-sera-taupe/20 rounded-sm p-8 max-w-lg mx-auto">
            <Sparkles className="w-8 h-8 text-sera-champagne mx-auto mb-3" />
            <h3 className="font-serif text-xl text-sera-espresso mb-2">Capsules In Curation</h3>
            <p className="text-xs text-sera-taupe leading-relaxed mb-6">
              Our inaugural seasonal collections are currently being curated for the private showroom. In the meantime, explore our core catalogue pieces.
            </p>
            <Link
              href="/boutique"
              className="inline-flex items-center space-x-2 bg-sera-espresso text-sera-ivory text-xs uppercase tracking-widest px-6 py-3 rounded-sm font-semibold hover:opacity-90"
            >
              <span>Explore Boutique</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((col: any) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group block border border-sera-taupe/20 bg-white/60 p-6 rounded-sm hover:border-sera-espresso/40 transition-all hover:shadow-sm"
              >
                <div className="aspect-[4/3] bg-sera-champagne/10 mb-4 rounded-sm overflow-hidden flex items-center justify-center">
                  <span className="font-serif text-2xl text-sera-espresso/30 italic">SÉRA</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-sera-taupe font-semibold">
                  {col.kind}
                </span>
                <h3 className="font-serif text-xl text-sera-espresso group-hover:text-amber-900 transition-colors mt-1">
                  {col.name}
                </h3>
                {col.tagline && (
                  <p className="text-xs text-sera-taupe mt-1.5 line-clamp-2 leading-relaxed">
                    {col.tagline}
                  </p>
                )}
                <div className="mt-4 flex items-center text-[11px] font-semibold uppercase tracking-wider text-sera-espresso">
                  <span>View Capsule</span>
                  <ArrowRight className="w-3 h-3 ml-1.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <EnquiryTrayDrawer />
      <BoutiqueFooter />
    </div>
  );
}
