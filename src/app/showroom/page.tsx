'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import {
  Sparkles,
  Layers,
  Flame,
  CheckCircle2,
  MessageCircle,
  Eye,
  ShieldCheck,
  Gem,
  ArrowRight,
} from 'lucide-react';

const CRAFT_STAGES = [
  {
    step: '01',
    title: 'Architectural Sketch & Proportion',
    desc: 'Each silhouette begins as an intentional study of human geometry, designed to rest naturally against collarbones and knuckles without shifting.',
  },
  {
    step: '02',
    title: 'Precision Micro-Casting',
    desc: 'Molten jewellery alloy poured in high-density vacuum moulds to eliminate porosity, ensuring smooth structural longevity.',
  },
  {
    step: '03',
    title: 'Hand-Setting by Master Artisans',
    desc: 'Every faceted stone is aligned manually under stereo-microscopes to secure uniform light refraction across all angles.',
  },
  {
    step: '04',
    title: 'Gold Vermeil Dip & Mirror Buff',
    desc: 'A heavy 2.5-micron 18k gold coat applied over a skin-safe hypoallergenic core, sealed with our proprietary anti-tarnish protective veil.',
  },
];

const ANATOMY_LAYERS = [
  {
    id: 'outer',
    title: 'Layer 1: Protective Molecular Seal',
    desc: 'Microscopic polymer barrier preventing moisture, perfume alcohol, and oxidation from dulling the surface.',
    color: 'border-sera-champagne/60 bg-sera-champagne/20',
  },
  {
    id: 'gold',
    title: 'Layer 2: 18k Solid Gold Vermeil (2.5 Micron)',
    desc: 'Rich, warm, authentic yellow-gold lustre substantially thicker than standard commercial plating for lasting radiance.',
    color: 'border-amber-400 bg-amber-50',
  },
  {
    id: 'barrier',
    title: 'Layer 3: Nickel-Free Barrier Matrix',
    desc: 'Engineered for sensitive skin. Completely free of toxic nickel, lead, and cadmium.',
    color: 'border-sera-taupe/40 bg-white/70',
  },
  {
    id: 'core',
    title: 'Layer 4: Dense Sculptural Core',
    desc: 'Structural foundation calibrated for tactile weight, balance, and ergonomic wearability.',
    color: 'border-sera-espresso/30 bg-sera-beige/40',
  },
];

export default function ShowroomPage() {
  const [selectedLayer, setSelectedLayer] = useState(ANATOMY_LAYERS[0]);

  return (
    <div className="min-h-screen flex flex-col bg-sera-ivory text-sera-espresso font-sans">
      <BoutiqueHeader />
      <EnquiryTrayDrawer />

      {/* Hero */}
      <section className="bg-sera-beige/40 border-b border-sera-taupe/20 py-16 px-6 lg:px-12 text-center">
        <div className="inline-flex items-center space-x-1.5 border border-sera-taupe/30 bg-white/60 px-3.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold text-sera-espresso mb-4">
          <Eye className="w-3 h-3 text-sera-taupe" />
          <span>Interactive Brand Space</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-sera-espresso max-w-3xl mx-auto">
          The SÉRA Digital Showroom
        </h1>
        <p className="text-xs sm:text-sm text-sera-espresso/70 max-w-xl mx-auto mt-4 leading-relaxed font-light">
          Step into our virtual flagship studio. Inspect internal metallurgical anatomy, master craft sequences, and schedule private concierge consultations.
        </p>
      </section>

      {/* Main Experience */}
      <main className="flex-1 max-w-bleed mx-auto w-full px-6 lg:px-12 py-16 space-y-20">
        {/* Chapter 1: Exploded Anatomy Viewer */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-1">
              Chapter 1 • Material Science
            </span>
            <h2 className="font-serif text-3xl text-sera-espresso font-normal">
              Exploded Piece Anatomy
            </h2>
            <p className="text-xs text-sera-espresso/70 mt-2">
              Select any metallurgical layer below to discover how conscious demi-fine integrity is constructed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            {/* Interactive Layer Visualizer */}
            <div className="space-y-3">
              {ANATOMY_LAYERS.map((layer) => {
                const isActive = selectedLayer.id === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayer(layer)}
                    className={`w-full text-left p-4 rounded-sm border transition-all duration-200 ${
                      isActive
                        ? `${layer.color} shadow-sm translate-x-1 font-semibold`
                        : 'border-sera-taupe/25 bg-white/60 hover:bg-white text-sera-espresso/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif">{layer.title}</span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-sera-espresso" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Layer Detail Focus Card */}
            <div className="bg-white/90 border border-sera-taupe/30 rounded-sm p-8 shadow-sm space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-sera-taupe font-semibold block">
                Selected Cross-Section
              </span>
              <h3 className="font-serif text-2xl text-sera-espresso">
                {selectedLayer.title}
              </h3>
              <p className="text-xs text-sera-espresso/80 leading-relaxed font-light">
                {selectedLayer.desc}
              </p>
              <div className="pt-4 border-t border-sera-taupe/20 flex items-center space-x-3 text-xs text-sera-taupe">
                <ShieldCheck className="w-4 h-4 text-sera-champagne flex-shrink-0" />
                <span>100% Guaranteed Anti-Tarnish Standard • Lab Certified</span>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 2: Craft Stages */}
        <section className="bg-white/70 border border-sera-taupe/30 rounded-sm p-8 sm:p-14 space-y-10">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-1">
              Chapter 2 • Atelier Process
            </span>
            <h2 className="font-serif text-3xl text-sera-espresso font-normal">
              From Melt to Masterpiece
            </h2>
            <p className="text-xs text-sera-espresso/70 mt-2">
              How our fourth-generation artisan workshops transform molten bullion into heirloom pieces.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CRAFT_STAGES.map((stg) => (
              <div key={stg.step} className="p-5 border border-sera-taupe/20 rounded-sm bg-sera-ivory/50 space-y-3">
                <span className="font-mono text-xl font-bold text-sera-champagne block">
                  {stg.step}
                </span>
                <h4 className="font-serif text-sm font-semibold text-sera-espresso">
                  {stg.title}
                </h4>
                <p className="text-xs text-sera-espresso/70 leading-relaxed">
                  {stg.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Chapter 3: Private Viewing CTA */}
        <section className="bg-sera-espresso text-sera-ivory rounded-sm p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-sera-champagne font-semibold block">
            Exclusive Appointment
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal max-w-xl mx-auto">
            Schedule a Private 1-on-1 Virtual Consultation
          </h2>
          <p className="text-xs text-sera-taupe max-w-lg mx-auto leading-relaxed">
            Our stylist will showcase desired necklaces, ear stacks, and ring combinations live on video, tailoring options to your neckline and special occasions.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/919999999999?text=Hello%20SÉRA%20Concierge,%20I%20would%20like%20to%20book%20a%20private%20virtual%20appointment."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-sera-champagne text-sera-espresso px-8 py-3.5 rounded-sm text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book Appointment via WhatsApp</span>
            </a>
            <Link
              href="/boutique"
              className="w-full sm:w-auto border border-sera-taupe/40 text-sera-ivory px-8 py-3.5 rounded-sm text-xs uppercase tracking-widest font-semibold hover:bg-white/10 transition-colors"
            >
              Explore Catalogue
            </Link>
          </div>
        </section>
      </main>

      <BoutiqueFooter />
    </div>
  );
}
