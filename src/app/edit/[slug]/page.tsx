import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BoutiqueHeader } from '@/components/layout/BoutiqueHeader';
import { BoutiqueFooter } from '@/components/layout/BoutiqueFooter';
import { EnquiryTrayDrawer } from '@/components/tray/EnquiryTrayDrawer';
import { ArrowLeft, User, Calendar } from 'lucide-react';

async function getArticle(slug: string) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
  try {
    const res = await fetch(`${backendUrl}/api/public/v1/editorial/${slug}`, {
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
  const art = await getArticle(params.slug);
  if (!art) return { title: 'SÉRA EDIT' };
  return {
    title: `${art.seo_title || art.title} | SÉRA EDIT`,
    description: art.seo_description || art.excerpt || 'SÉRA BY SIMRAN Journal.',
  };
}

export default async function EditorialDetailPage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-sera-ivory text-sera-espresso flex flex-col font-sans selection:bg-sera-champagne selection:text-sera-espresso">
      <BoutiqueHeader />

      <main className="flex-1 py-12 px-6 lg:px-12 max-w-3xl mx-auto w-full">
        <Link
          href="/edit"
          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-widest text-sera-taupe hover:text-sera-espresso transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>The Journal</span>
        </Link>

        {/* Header */}
        <div className="border-b border-sera-taupe/20 pb-8 mb-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-sera-champagne font-semibold block mb-2 bg-sera-espresso px-2.5 py-0.5 rounded-sm w-fit">
            {article.pillar || 'Essay'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-sera-espresso font-normal mt-3 leading-snug">
            {article.title}
          </h1>

          <div className="flex items-center space-x-4 mt-6 text-xs text-sera-taupe">
            <span className="inline-flex items-center space-x-1">
              <User className="w-3.5 h-3.5" />
              <span>{article.author_display_name || 'Simran'}</span>
            </span>
            {article.published_at && (
              <span className="inline-flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(article.published_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="prose prose-sera max-w-none text-sera-espresso/90 text-sm sm:text-base leading-relaxed space-y-5">
          {article.excerpt && (
            <p className="text-base font-serif italic text-sera-taupe border-l-2 border-sera-champagne pl-4 mb-6">
              {article.excerpt}
            </p>
          )}

          {typeof article.body === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: article.body }} />
          ) : (
            <p className="leading-relaxed">
              {JSON.stringify(article.body || 'Content arriving soon.')}
            </p>
          )}
        </div>
      </main>

      <EnquiryTrayDrawer />
      <BoutiqueFooter />
    </div>
  );
}
