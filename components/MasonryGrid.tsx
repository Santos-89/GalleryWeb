'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaItem, GROUPS } from '@/lib/data';
import { Play, Image as ImageIcon, Heart } from 'lucide-react';

interface MasonryGridProps {
  items: MediaItem[];
  onItemClick: (item: MediaItem) => void;
}

export default function MasonryGrid({ items, onItemClick }: MasonryGridProps) {
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');

  const filteredMedia = items.filter((item) =>
    filter === 'all' ? true : item.type === filter
  );

  return (
    <div className="w-full">
      {/* Selector de Filtros */}
      <div className="flex justify-center md:justify-end mb-10">
        <div className="flex gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl backdrop-blur-md">
          {(['all', 'photo', 'video'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-5 py-2 rounded-lg text-xs font-semibold capitalize transition-all duration-300 ${
                filter === t
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t === 'all' ? 'Todos' : t === 'photo' ? 'Fotos' : 'Videos'}
            </button>
          ))}
        </div>
      </div>

      {/* Grilla Masonry Responsiva con Framer Motion */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredMedia.map((item) => {
            const group = GROUPS.find((g) => g.id === item.groupColor);
            
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                key={item.id}
                onClick={() => onItemClick(item)}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer border border-slate-800 bg-slate-900 hover:border-slate-600 transition-all duration-300 shadow-xl"
              >
                {/* Imagen del elemento */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    loading="lazy"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Icono indicador del tipo de media (Foto / Video) */}
                  <div className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-slate-950/70 border border-white/10 text-slate-300 backdrop-blur-md group-hover:text-white transition-colors duration-300">
                    {item.type === 'video' ? (
                      <Play size={14} fill="currentColor" className="text-white" />
                    ) : (
                      <ImageIcon size={14} />
                    )}
                  </div>

                  {/* Iluminación base adaptativa del color del equipo en hover */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/2 opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(to top, ${group?.glowHex || '#6366f1'}40 0%, transparent 100%)`
                    }}
                  />
                </div>

                {/* Info en Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                  <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span 
                      className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full border border-white/10 shadow-sm"
                      style={{ 
                        backgroundColor: `${group?.hex || '#3b82f6'}20`, 
                        color: group?.glowHex || '#a78bfa',
                        borderColor: `${group?.hex || '#3b82f6'}40`
                      }}
                    >
                      {group?.name || (item.groupColor === 'general' ? 'General' : item.groupColor)}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-rose-300">
                      <Heart size={11} fill="currentColor" /> {item.likes}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
