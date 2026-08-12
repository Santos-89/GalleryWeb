'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import LightboxModal from '@/components/LightboxModal';
import MasonryGrid from '@/components/MasonryGrid';
import { GROUPS, MOCK_MEDIA, MediaItem } from '@/lib/data';
import { ChevronLeft } from 'lucide-react';

export default function GroupPageClient() {
  const params = useParams();
  const colorId = params.color as string;
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const group = GROUPS.find((g) => g.id === colorId) || GROUPS[0];
  const groupMedia = MOCK_MEDIA.filter((m) => m.groupColor === group.id);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden pb-16">
      {/* Resplandor ambiental adaptado al color del equipo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] opacity-20 blur-3xl pointer-events-none transition-all duration-500"
        style={{ backgroundColor: group.glowHex }}
      />
      <div
        className="absolute top-[200px] left-1/4 w-[300px] h-[300px] opacity-10 blur-3xl pointer-events-none rounded-full"
        style={{ backgroundColor: group.hex }}
      />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        {/* Botón de Retorno */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800/80 hover:border-indigo-500/30 backdrop-blur-md transition-all"
        >
          <ChevronLeft size={14} /> Volver a la Galería General
        </Link>

        {/* Cabecera del Grupo */}
        <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-5 h-5 rounded-full border-2 border-white shadow-md animate-pulse"
                style={{ backgroundColor: group.hex }}
              />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                GRUPO DE COLOR
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
              {group.name}
            </h1>
            <p className="text-lg italic text-slate-300 mt-1 font-light">
              "{group.slogan}"
            </p>
            <p className="text-sm text-slate-400 mt-3 max-w-xl font-light leading-relaxed">
              {group.description}
            </p>
          </div>

          <div className="text-center md:text-right bg-slate-950/40 p-5 rounded-2xl border border-white/5 min-w-[150px]">
            <span className="text-4xl font-black text-white">{groupMedia.length}</span>
            <span className="block text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-semibold">
              Archivos Multimedia
            </span>
          </div>
        </div>

        {/* Galería Masonry del Grupo */}
        {groupMedia.length > 0 ? (
          <MasonryGrid
            items={groupMedia}
            onItemClick={(item) => setSelectedMedia(item)}
          />
        ) : (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl">
            <p className="text-slate-400">No hay archivos multimedia para este grupo todavía.</p>
          </div>
        )}
      </div>

      {/* Visor Lightbox + Confetti */}
      <LightboxModal item={selectedMedia} onClose={() => setSelectedMedia(null)} />
    </main>
  );
}
