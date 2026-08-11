'use client';
import { useState } from 'react';
import HeroParallax from '@/components/HeroParallax';
import GroupElasticGallery from '@/components/GroupElasticGallery';
import MasonryGrid from '@/components/MasonryGrid';
import LightboxModal from '@/components/LightboxModal';
import { GROUPS, MOCK_MEDIA, MediaItem } from '@/lib/data';

export default function HomePage() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Cabecera con Parallax 3D (GSAP) */}
      <HeroParallax />

      {/* ✦ Hub de los 12 Grupos — Elastic Gallery (Acordeón Horizontal) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Nuestros Equipos
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3">
            GRUPOS DEL CAMPAMENTO
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto font-light">
            Pasa el cursor sobre cada grupo para expandirlo y acceder a su galería dedicada.
          </p>
        </div>

        <GroupElasticGallery groups={GROUPS} />
      </section>

      {/* Galería General Masonry */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-900">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Galería General</h2>
            <p className="text-xs text-slate-400 font-light mt-1">
              Todos los momentos capturados durante el evento
            </p>
          </div>
        </div>

        <MasonryGrid items={MOCK_MEDIA} onItemClick={(item) => setSelectedMedia(item)} />
      </section>

      {/* Visor Lightbox Fullscreen */}
      <LightboxModal item={selectedMedia} onClose={() => setSelectedMedia(null)} />
    </main>
  );
}
