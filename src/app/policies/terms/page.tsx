import React from 'react';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';

export const metadata = {
  title: 'Terms of Service | SÉRA BY SIMRAN',
  description: 'Terms of service, intellectual property, and boutique purchasing conditions.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-sera-ivory text-sera-espresso flex flex-col font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />

      <main className="flex-1 py-16 px-6 lg:px-12 max-w-3xl mx-auto w-full space-y-8">
        <div className="border-b border-sera-taupe/20 pb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-sera-taupe font-semibold block mb-2">
            Governance & Trust
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal">
            Terms of Service
          </h1>
          <p className="text-xs text-sera-taupe mt-2">Effective Date: October 2026</p>
        </div>

        <div className="prose prose-sera text-xs sm:text-sm text-sera-espresso/80 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">1. Overview</h2>
            <p>
              This digital boutique is owned and operated by SÉRA BY SIMRAN. By accessing our website, browsing our collections, or submitting enquiries, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">2. Demi-Fine Specifications & Imagery</h2>
            <p>
              We endeavour to accurately capture metal textures, finishes, and gemstone tones. However, as jewellery pieces involve hand finishing, minor variations in tone and texture may occur, highlighting their individual handcrafted character.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">3. Enquiry & Order Confirmation</h2>
            <p>
              Submission of an inquiry via the VIP Enquiry Tray does not constitute a binding financial transaction. Orders are formally confirmed only after our styling team verifies stock availability, confirms sizing with you, and issues a formal payment request.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-lg text-sera-espresso font-semibold">4. Intellectual Property</h2>
            <p>
              All trademarks, monogram marks, brand imagery, copy, and product designs remain the exclusive intellectual property of SÉRA BY SIMRAN. Unauthorised reproduction or distribution is strictly prohibited.
            </p>
          </section>
        </div>
      </main>

      <EnquiryTrayDrawer />
      <BoutiqueFooter />
    </div>
  );
}
