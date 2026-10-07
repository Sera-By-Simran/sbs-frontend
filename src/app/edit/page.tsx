import React from 'react';
import Link from 'next/link';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import { BookOpen, ArrowRight, Feather } from 'lucide-react';

async function getArticles() {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
  try {
    const res = await fetch(`${backendUrl}/api/public/v1/editorial`, {
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
  title: 'SÉRA EDIT | The Demi-Fine Journal',
  description: 'Chronicles of metallurgy, styling philosophy, conscious craftsmanship, and heirloom care.',
};

export default async function EditorialIndexPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-sera-ivory text-sera-espresso flex flex-col font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />

      <main className="flex-1 py-12 px-6 lg:px-12 max-w-container mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-2">
            The Journal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal tracking-tight">
            SÉRA EDIT
          </h1>
          <p className="text-xs sm:text-sm text-sera-taupe mt-3 leading-relaxed">
            Musings on modern luxury, thoughtful accessorising, metal anatomy, and the timeless art of quiet opulence.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white/40 border border-sera-taupe/20 rounded-sm p-8 max-w-lg mx-auto">
            <Feather className="w-8 h-8 text-sera-champagne mx-auto mb-3" />
            <h3 className="font-serif text-xl text-sera-espresso mb-2">First Edition Forthcoming</h3>
            <p className="text-xs text-sera-taupe leading-relaxed mb-6">
              Our inaugural editorial essays on metallurgy and styling are currently being drafted by Simran.
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
            {articles.map((art: any) => (
              <Link
                key={art.id}
                href={`/edit/${art.slug}`}
                className="group block border border-sera-taupe/20 bg-white/60 p-6 rounded-sm hover:border-sera-espresso/40 transition-all hover:shadow-sm"
              >
                <div className="aspect-[16/9] bg-sera-champagne/10 mb-4 rounded-sm overflow-hidden flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-sera-taupe/40" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-sera-taupe font-semibold">
                  {art.pillar || 'Styling & Care'}
                </span>
                <h3 className="font-serif text-xl text-sera-espresso group-hover:text-amber-900 transition-colors mt-1">
                  {art.title}
                </h3>
                {art.excerpt && (
                  <p className="text-xs text-sera-taupe mt-2 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between text-[11px] text-sera-taupe pt-3 border-t border-sera-taupe/15">
                  <span>{art.author_display_name || 'Simran'}</span>
                  <span className="text-sera-espresso font-semibold uppercase tracking-wider group-hover:translate-x-0.5 transition-transform flex items-center">
                    Read Essay <ArrowRight className="w-3 h-3 ml-1" />
                  </span>
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
