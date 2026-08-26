'use client';
import { useState } from 'react';
import HeroParallax from '@/components/HeroParallax';
import GroupElasticGallery from '@/components/GroupElasticGallery';
import InteractiveBentoGallery from '@/components/InteractiveBentoGallery';
import LightboxModal from '@/components/LightboxModal';
import { GROUPS, MOCK_MEDIA, MediaItem } from '@/lib/data';

export default function HomePage() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Cabecera con Parallax 3D (GSAP) */}
      <HeroParallax />

      {/* Hub de los 14 Grupos — Acordeón Interactivo */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Nuestros 14 Equipos
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-3 tracking-tight">
            GRUPOS DEL CAMPAMENTO
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto font-light">
            Pasa el cursor o toca cada grupo para expandirlo y explorar su galería dedicada.
          </p>
        </div>

        <GroupElasticGallery groups={GROUPS} />
      </section>

      {/* Galería General Bento Interactiva */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-900">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
              Exploración Interactiva
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2">
              Galería General Bento
            </h2>
            <p className="text-xs text-slate-400 font-light mt-1">
              Todos los recuerdos del campamento reunidos en una vista Bento dinámica
            </p>
          </div>
        </div>

        <InteractiveBentoGallery
          items={MOCK_MEDIA}
          onItemClick={(item) => setSelectedMedia(item)}
        />
      </section>

      {/* Visor Lightbox Fullscreen */}
      <LightboxModal item={selectedMedia} onClose={() => setSelectedMedia(null)} />
    </main>
  );
}
