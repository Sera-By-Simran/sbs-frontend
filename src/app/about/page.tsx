import React from 'react';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import { Gem, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'The Story of SÉRA | SÉRA BY SIMRAN',
  description: 'The narrative of SÉRA BY SIMRAN: Modern demi-fine jewellery crafted with conscious luxury and artisanal care.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-sera-ivory text-sera-espresso flex flex-col font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />

      <main className="flex-1 py-16 px-6 lg:px-12 max-w-4xl mx-auto w-full space-y-16">
        {/* Hero Narrative */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-2">
            The Atelier Narrative
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-sera-espresso font-normal tracking-tight">
            Quiet Opulence, Consciously Crafted
          </h1>
          <p className="text-xs sm:text-base text-sera-taupe mt-5 leading-relaxed font-light">
            SÉRA BY SIMRAN was conceived around a single uncompromising conviction: that modern fine jewellery should marry heirloom artistry with everyday wearability.
          </p>
        </div>

        {/* Founder's Letter */}
        <div className="bg-white border border-sera-taupe/20 p-8 sm:p-12 rounded-sm shadow-sm space-y-6">
          <span className="text-[10px] uppercase tracking-widest text-sera-champagne font-semibold bg-sera-espresso px-2.5 py-1 rounded-sm w-fit block">
            Founder&apos;s Note
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-sera-espresso font-normal">
            &ldquo;Jewellery is not meant to languish in a vault.&rdquo;
          </h2>
          <div className="text-xs sm:text-sm text-sera-espresso/80 leading-relaxed space-y-4 font-normal">
            <p>
              Growing up with an abiding reverence for Indian heirloom jewellery, I was captivated by the sheer weight of tradition and craftsmanship. Yet, I noticed a frustrating dichotomy: everyday fashion jewellery quickly tarnished and lost its lustre, while traditional 22K gold remained locked in safe-deposit boxes, reserved solely for rare ceremonial occasions.
            </p>
            <p>
              SÉRA was founded to bridge that gap. We create Demi-Fine Jewellery that possesses the weight, gleam, and tactile luxury of precious metals, engineered for daily life without compromising on ethical sourcing or skin sensitivity.
            </p>
            <p>
              Every curve is designed to accompany you through boardrooms, evening celebrations, and quiet mornings alike.
            </p>
          </div>
          <div className="pt-4 border-t border-sera-taupe/20 flex items-center justify-between">
            <div>
              <span className="font-serif text-lg text-sera-espresso block">Simran</span>
              <span className="text-[11px] text-sera-taupe uppercase tracking-wider">Founder & Creative Director</span>
            </div>
            <span className="font-serif italic text-sera-champagne text-2xl">SÉRA</span>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/60 border border-sera-taupe/20 rounded-sm space-y-3">
            <Gem className="w-5 h-5 text-amber-800" />
            <h3 className="font-serif text-base text-sera-espresso">Artisanal Metallurgy</h3>
            <p className="text-xs text-sera-taupe leading-relaxed">
              We utilise thick 18K gold vermeil layered over genuine 925 sterling silver and medical-grade hypoallergenic substrates.
            </p>
          </div>

          <div className="p-6 bg-white/60 border border-sera-taupe/20 rounded-sm space-y-3">
            <HeartHandshake className="w-5 h-5 text-amber-800" />
            <h3 className="font-serif text-base text-sera-espresso">VIP Concierge First</h3>
            <p className="text-xs text-sera-taupe leading-relaxed">
              We reject impersonal checkouts. Our styling concierge works directly with you over WhatsApp to ensure every piece fits your unique silhouette.
            </p>
          </div>

          <div className="p-6 bg-white/60 border border-sera-taupe/20 rounded-sm space-y-3">
            <ShieldCheck className="w-5 h-5 text-amber-800" />
            <h3 className="font-serif text-base text-sera-espresso">Transparent Integrity</h3>
            <p className="text-xs text-sera-taupe leading-relaxed">
              No astronomical retail markups. Fair pricing, direct artisan partnerships, and full clarity in metal composition.
            </p>
          </div>
        </div>
      </main>

      <EnquiryTrayDrawer />
      <BoutiqueFooter />
    </div>
  );
}
