'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { GroupInfo, getAiImageUrl } from '@/lib/data';

interface GroupElasticGalleryProps {
  groups: GroupInfo[];
}

export default function GroupElasticGallery({ groups }: GroupElasticGalleryProps) {
  const [activeId, setActiveId] = useState<string>(groups[0]?.id ?? '');

  return (
    <>
      {/* ── Acordeón Horizontal — Desktop (md+) ─────────────────────────── */}
      <div className="hidden md:flex w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-[62vh] min-h-[400px]">
        {groups.map((group, index) => {
          const isActive = group.id === activeId;

          return (
            <motion.div
              key={group.id}
              onHoverStart={() => setActiveId(group.id)}
              onClick={() => setActiveId(group.id)}
              animate={{ flex: isActive ? 4 : 0.45 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative overflow-hidden cursor-pointer"
              style={{ minWidth: 0 }}
            >
              {/* Imagen de fondo */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{
                  backgroundImage: `url(${getAiImageUrl(
                    `${group.name} youth camp team vibrant outdoor`,
                    800,
                    600,
                    index + 200
                  )})`,
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                }}
              />

              {/* Overlay base */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: isActive
                    ? `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)`
                    : `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)`,
                }}
              />

              {/* Color accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 transition-opacity duration-300"
                style={{
                  backgroundColor: group.hex,
                  opacity: isActive ? 1 : 0.4,
                }}
              />

              {/* ── Contenido INACTIVO Desktop: nombre vertical ── */}
              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-[11px] font-bold uppercase tracking-widest text-white/80 whitespace-nowrap select-none"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                  >
                    {group.name}
                  </span>
                </div>
              )}

              {/* ── Contenido ACTIVO Desktop: info + CTA ── */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="absolute bottom-0 left-0 right-0 p-7 z-10"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span
                      className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-md flex-shrink-0"
                      style={{ backgroundColor: group.hex }}
                    />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/70">
                      Grupo de Color
                    </span>
                  </div>

                  <h3 className="text-3xl font-black text-white leading-tight mb-1">
                    {group.name}
                  </h3>

                  <p className="text-sm italic text-white/80 font-light mb-3">
                    "{group.slogan}"
                  </p>

                  <span
                    className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full border mb-5 backdrop-blur-md"
                    style={{
                      backgroundColor: `${group.hex}30`,
                      borderColor: `${group.hex}60`,
                      color: group.glowHex,
                    }}
                  >
                    {group.description}
                  </span>

                  <div>
                    <Link
                      href={`/grupos/${group.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      style={{
                        backgroundColor: group.hex,
                        boxShadow: `0 4px 20px ${group.hex}60`,
                      }}
                    >
                      Ver galería del equipo →
                    </Link>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── Acordeón Elastic Vertical — Mobile (< md) ───────────────────── */}
      <div className="flex flex-col gap-3 md:hidden w-full">
        {groups.map((group, index) => {
          const isActive = group.id === activeId;

          return (
            <motion.div
              key={group.id}
              onClick={() => setActiveId(group.id)}
              animate={{ height: isActive ? 240 : 64 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-300"
              style={{
                borderColor: isActive ? `${group.hex}80` : 'rgba(30, 41, 59, 0.6)',
                boxShadow: isActive ? `0 8px 24px ${group.hex}30` : 'none',
              }}
            >
              {/* Imagen de fondo */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={{
                  backgroundImage: `url(${getAiImageUrl(
                    `${group.name} youth camp team vibrant outdoor`,
                    800,
                    600,
                    index + 200
                  )})`,
                  transform: isActive ? 'scale(1.03)' : 'scale(1)',
                }}
              />

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: isActive
                    ? `linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.5) 60%, rgba(0,0,0,0.4) 100%)`
                    : `linear-gradient(to right, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.65) 100%)`,
                }}
              />

              {/* Borde lateral de color */}
              <div
                className="absolute top-0 left-0 bottom-0 w-2 transition-all duration-300"
                style={{ backgroundColor: group.hex }}
              />

              {/* ── Cabecera de la tarjeta (Siempre visible) ── */}
              <div className="relative z-10 flex items-center justify-between px-5 h-16 pl-6">
                <div className="flex items-center gap-3">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-sm flex-shrink-0"
                    style={{ backgroundColor: group.hex }}
                  />
                  <div>
                    <h3 className="text-base font-extrabold text-white leading-none">
                      {group.name}
                    </h3>
                    {!isActive && (
                      <p className="text-[11px] text-slate-300 font-light truncate max-w-[200px] mt-1">
                        "{group.slogan}"
                      </p>
                    )}
                  </div>
                </div>

                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center border border-white/10 bg-white/10 text-xs text-white transition-transform duration-300"
                  style={{ transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                  ➔
                </div>
              </div>

              {/* ── Contenido Expandido Mobile ── */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="relative z-10 px-5 pb-5 pl-6 flex flex-col justify-between"
                  >
                    <p className="text-xs italic text-slate-200 font-light mb-2">
                      "{group.slogan}"
                    </p>
                    <p className="text-xs text-slate-300 mb-4 font-light leading-relaxed line-clamp-2">
                      {group.description}
                    </p>

                    <div>
                      <Link
                        href={`/grupos/${group.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-transform active:scale-95 shadow-lg"
                        style={{
                          backgroundColor: group.hex,
                          boxShadow: `0 4px 14px ${group.hex}60`,
                        }}
                      >
                        Ver Galería de {group.name} →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
