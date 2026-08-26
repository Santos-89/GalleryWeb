'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaItem, GROUPS } from '@/lib/data';
import { Play, Image as ImageIcon, Heart, Maximize2, Sparkles } from 'lucide-react';

interface InteractiveBentoGalleryProps {
  items: MediaItem[];
  onItemClick: (item: MediaItem) => void;
}

export default function InteractiveBentoGallery({
  items,
  onItemClick,
}: InteractiveBentoGalleryProps) {
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');

  // Filtrado de medios por tipo y por grupo opcional
  const filteredMedia = items.filter((item) => {
    const matchesType = filter === 'all' ? true : item.type === filter;
    const matchesGroup = selectedGroup === 'all' ? true : item.groupColor === selectedGroup;
    return matchesType && matchesGroup;
  });

  // Patrón Bento interactivo para variado visual
  const getBentoClass = (index: number) => {
    const pattern = index % 8;
    switch (pattern) {
      case 0:
        return 'md:col-span-2 md:row-span-2 min-h-[360px] md:min-h-[460px]'; // Hero Grande
      case 1:
      case 5:
        return 'md:col-span-1 md:row-span-2 min-h-[320px] md:min-h-[420px]'; // Vertical Largo
      case 3:
        return 'md:col-span-2 md:row-span-1 min-h-[240px] md:min-h-[280px]'; // Ancho Panorámico
      default:
        return 'md:col-span-1 md:row-span-1 min-h-[220px] md:min-h-[260px]'; // Cuadrado Estándar
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Bar de Controles y Filtros */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl backdrop-blur-xl">
        {/* Selector de Tipo (Todos / Fotos / Videos) */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-xl border border-white/5 w-full sm:w-auto">
          {(['all', 'photo', 'video'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                filter === t
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t === 'all' && <Sparkles size={13} />}
              {t === 'photo' && <ImageIcon size={13} />}
              {t === 'video' && <Play size={13} fill="currentColor" />}
              <span>{t === 'all' ? 'Todos los Medios' : t === 'photo' ? 'Fotos' : 'Videos'}</span>
            </button>
          ))}
        </div>

        {/* Filtro rápido por Grupo / Equipo */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-[11px] text-slate-400 font-mono uppercase tracking-wider hidden lg:inline">
            Equipo:
          </span>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold rounded-xl px-3 py-2 outline-none focus:border-indigo-500 cursor-pointer max-w-[200px]"
          >
            <option value="all">Todos los Equipos (14)</option>
            {GROUPS.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name} {g.slogan ? `— ${g.slogan}` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grilla Bento Interactiva */}
      {filteredMedia.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredMedia.map((item, index) => {
              const group = GROUPS.find((g) => g.id === item.groupColor);
              const bentoClass = getBentoClass(index);
              const isFeatured = index % 8 === 0;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 15 }}
                  transition={{ duration: 0.35, ease: 'easeOut', delay: (index % 6) * 0.04 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  key={item.id}
                  onClick={() => onItemClick(item)}
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-slate-800/80 bg-slate-900/90 hover:border-slate-600 transition-all duration-500 shadow-xl ${bentoClass}`}
                >
                  {/* Media (Imagen de portada) */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Resplandor adaptativo según el color del equipo */}
                    <div
                      className="absolute inset-0 opacity-20 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at bottom left, ${
                          group?.glowHex || '#3b82f6'
                        }80 0%, transparent 70%)`,
                      }}
                    />

                    {/* Overlay graduado para legibilidad */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                  </div>

                  {/* Badge de tipo (Foto / Video) */}
                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 border border-white/10 text-white backdrop-blur-md text-[10px] font-semibold tracking-wider uppercase shadow-md">
                    {item.type === 'video' ? (
                      <>
                        <Play size={11} fill="currentColor" className="text-rose-400" />
                        <span>Video</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon size={11} className="text-indigo-400" />
                        <span>Foto</span>
                      </>
                    )}
                  </div>

                  {/* Badge de Tarjeta Destacada */}
                  {isFeatured && (
                    <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-indigo-600/90 text-white border border-indigo-400/30 backdrop-blur-md text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                      <Sparkles size={11} /> Destacado
                    </div>
                  )}

                  {/* Contenido flotante inferior */}
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 z-10 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white/60 shadow-sm flex-shrink-0"
                        style={{ backgroundColor: group?.hex || '#3b82f6' }}
                      />
                      <span
                        className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-md"
                        style={{
                          backgroundColor: `${group?.hex || '#3b82f6'}25`,
                          color: group?.glowHex || '#a78bfa',
                        }}
                      >
                        {group?.name || item.groupColor}
                      </span>
                    </div>

                    <h3
                      className={`font-extrabold text-white line-clamp-2 leading-snug group-hover:text-indigo-200 transition-colors ${
                        isFeatured ? 'text-lg md:text-xl' : 'text-sm md:text-base'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Fila de footer en hover */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                      <span className="flex items-center gap-1.5 text-xs text-rose-300 font-semibold">
                        <Heart size={13} fill="currentColor" /> {item.likes}
                      </span>

                      <span className="flex items-center gap-1 text-[11px] text-white/80 font-bold group-hover:text-white transition-colors">
                        Ver <Maximize2 size={12} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl bg-slate-900/40">
          <p className="text-slate-400 text-sm font-light">
            No se encontraron fotos o videos para el filtro seleccionado.
          </p>
        </div>
      )}
    </div>
  );
}
