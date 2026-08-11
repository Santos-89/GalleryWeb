'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Share2, Download } from 'lucide-react';
import { MediaItem, GROUPS } from '@/lib/data';
import confetti from 'canvas-confetti';

interface LightboxModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export default function LightboxModal({ item, onClose }: LightboxModalProps) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (item) {
      setLikes(item.likes);
      setLiked(false);
    }
  }, [item]);

  const groupInfo = GROUPS.find((g) => g.id === item?.groupColor);

  const handleLike = () => {
    if (liked) return;
    setLiked(true);
    setLikes((prev) => prev + 1);
    
    // Detonación de confeti adaptada al tema del equipo
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: groupInfo ? [groupInfo.hex, groupInfo.glowHex, '#ffffff'] : ['#6366f1', '#a78bfa', '#ffffff'],
    });
  };

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-xl">
          {/* Fondo interactivo para cerrar (light-dismiss) */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: -15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            className="relative z-10 max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/60 text-slate-300 hover:text-white backdrop-blur-md transition-colors"
            >
              <X size={20} />
            </button>

            {/* Área de la Imagen / Media */}
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] md:min-h-[500px]">
              <img src={item.url} alt={item.title} className="max-h-[70vh] w-auto object-contain" />
            </div>

            {/* Panel lateral de información */}
            <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-slate-900/90 border-t md:border-t-0 md:border-l border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: groupInfo?.hex }} />
                  <span className="text-xs font-semibold text-slate-300 uppercase">{groupInfo?.name}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 font-light">Publicado el {item.date}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={handleLike}
                  disabled={liked}
                  className={`flex items-center gap-2 text-sm font-semibold transition-all ${
                    liked 
                      ? 'text-rose-500 scale-105' 
                      : 'text-rose-400 hover:text-rose-300'
                  }`}
                >
                  <Heart size={18} fill={liked ? 'currentColor' : 'none'} className="transition-transform duration-300" /> 
                  {likes} Likes
                </button>
                <div className="flex gap-2">
                  <button className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                    <Share2 size={16} />
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    download
                    className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
                  >
                    <Download size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
