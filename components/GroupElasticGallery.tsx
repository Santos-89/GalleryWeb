'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GroupInfo, getAiImageUrl } from '@/lib/data';
import GroupCard3D from '@/components/GroupCard3D';

interface GroupElasticGalleryProps {
  groups: GroupInfo[];
}

export default function GroupElasticGallery({ groups }: GroupElasticGalleryProps) {
  const [activeId, setActiveId] = useState<string>(groups[0]?.id ?? '');

  const activeGroup = groups.find((g) => g.id === activeId) ?? groups[0];

  return (
    <>
      {/* ── Acordeón Horizontal — Desktop (md+) ─────────────────────────── */}
      <div className="hidden md:flex w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl h-[62vh] min-h-[400px]">
        {groups.map((group) => {
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
              {/* Imagen de fondo generada con IA */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{
                  backgroundImage: `url(${getAiImageUrl(
                    `${group.name} youth camp team vibrant outdoor`,
                    800,
                    600,
                    groups.indexOf(group) + 200
                  )})`,
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                }}
              />

              {/* Overlay base siempre presente */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background: isActive
                    ? `linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)`
                    : `linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 100%)`,
                }}
              />

              {/* Color accent line en la parte superior */}
              <div
                className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300"
                style={{
                  backgroundColor: group.hex,
                  opacity: isActive ? 1 : 0.4,
                }}
              />

              {/* ── Contenido INACTIVO: nombre vertical ── */}
              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-[11px] font-bold uppercase tracking-widest text-white/70 whitespace-nowrap select-none"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                  >
                    {group.name}
                  </span>
                </div>
              )}

              {/* ── Contenido ACTIVO: info + CTA ── */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="absolute bottom-0 left-0 right-0 p-7 z-10"
                >
                  {/* Punto de color + etiqueta */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <span
                      className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-md flex-shrink-0"
                      style={{ backgroundColor: group.hex }}
                    />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/60">
                      Grupo de Color
                    </span>
                  </div>

                  {/* Nombre */}
                  <h3 className="text-3xl font-black text-white leading-tight mb-1">
                    {group.name}
                  </h3>

                  {/* Eslogan */}
                  <p className="text-sm italic text-white/75 font-light mb-3">
                    "{group.slogan}"
                  </p>

                  {/* Chip de descripción */}
                  <span
                    className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full border mb-5"
                    style={{
                      backgroundColor: `${group.hex}25`,
                      borderColor: `${group.hex}50`,
                      color: group.glowHex,
                    }}
                  >
                    {group.description}
                  </span>

                  {/* CTA */}
                  <div>
                    <Link
                      href={`/grupos/${group.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      style={{
                        backgroundColor: group.hex,
                        boxShadow: `0 4px 20px ${group.hex}50`,
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

      {/* ── Grilla Responsiva — Mobile (< md) ─────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
        {groups.map((group) => (
          <GroupCard3D key={group.id} group={group} />
        ))}
      </div>
    </>
  );
}
