'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GroupInfo } from '@/lib/data';

export default function GroupCard3D({ group }: { group: GroupInfo }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 10);
    setRotateY(x / 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <Link href={`/grupos/${group.id}`}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative group h-60 rounded-2xl p-6 flex flex-col justify-between cursor-pointer border border-slate-800 bg-slate-900/80 backdrop-blur-md overflow-hidden hover:border-slate-600 transition-all shadow-xl"
      >
        {/* Glow de fondo dinámico al hacer hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
          style={{ backgroundColor: group.glowHex }}
        />

        <div style={{ transform: 'translateZ(30px)' }} className="flex justify-between items-start z-10">
          <span className="w-4 h-4 rounded-full border-2 border-white/80 shadow-lg" style={{ backgroundColor: group.hex }} />
          <span className="text-xs text-slate-500 font-mono tracking-wider">GRUPO</span>
        </div>

        <div style={{ transform: 'translateZ(40px)' }} className="z-10">
          <h3 className="text-2xl font-bold text-white group-hover:translate-x-1 transition-transform">
            {group.name}
          </h3>
          <p className="text-xs text-slate-300 italic mt-0.5">"{group.slogan}"</p>
          <p className="text-xs text-slate-400 mt-2 line-clamp-2 font-light">{group.description}</p>
        </div>

        <div style={{ transform: 'translateZ(20px)' }} className="text-xs font-semibold uppercase tracking-wider text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1 z-10">
          Ver fotos del equipo &rarr;
        </div>
      </motion.div>
    </Link>
  );
}
