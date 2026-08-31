'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Share2, Download, Check, Loader2 } from 'lucide-react';
import { MediaItem, GROUPS } from '@/lib/data';
import confetti from 'canvas-confetti';

interface LightboxModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export default function LightboxModal({ item, onClose }: LightboxModalProps) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (item) {
      setLikes(item.likes);
      setLiked(false);
      setCopied(false);
      setDownloading(false);
    }
  }, [item]);

  const groupInfo = GROUPS.find((g) => g.id === item?.groupColor);

  const handleLike = () => {
    if (liked) return;
    setLiked(true);
    setLikes((prev) => prev + 1);

    // Detonación de confeti adaptada al tema del equipo
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.6 },
      colors: groupInfo
        ? [groupInfo.hex, groupInfo.glowHex, '#ffffff']
        : ['#6366f1', '#a78bfa', '#ffffff'],
    });
  };

  const handleShare = async () => {
    if (!item) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `¡Mira este recuerdo del campamento: ${item.title}!`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback al portapapeles si la API nativa no responde o es cancelada
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback si la API de clipboard falla
    }
  };

  const handleDownload = async () => {
    if (!item || downloading) return;
    setDownloading(true);

    try {
      const response = await fetch(item.url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const ext = item.type === 'video' ? 'mp4' : 'jpg';
      const cleanTitle = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const filename = `galeria-${cleanTitle}.${ext}`;

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      // Fallback si la solicitud Blob es bloqueada por CORS o red
      const link = document.createElement('a');
      link.href = item.url;
      link.download = `${item.title}.${item.type === 'video' ? 'mp4' : 'jpg'}`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-xl">
          {/* Fondo interactivo para cerrar (light-dismiss) */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.85, rotateX: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
            className="relative z-10 max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/70 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X size={18} />
            </button>

            {/* Área de la Imagen / Video */}
            <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] md:min-h-[520px] p-4">
              {item.type === 'video' ? (
                <video
                  src={item.url}
                  controls
                  autoPlay
                  className="max-h-[70vh] w-auto max-w-full rounded-lg"
                />
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                />
              )}
            </div>

            {/* Panel lateral de información */}
            <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-slate-900/95 border-t md:border-t-0 md:border-l border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
                    style={{ backgroundColor: groupInfo?.hex || '#3b82f6' }}
                  />
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    {groupInfo?.name || (item.groupColor === 'general' ? 'General' : item.groupColor)}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                {groupInfo?.slogan && (
                  <p className="text-xs italic text-indigo-300 font-light mb-3">
                    "{groupInfo.slogan}"
                  </p>
                )}

                <p className="text-xs text-slate-400 font-light">
                  Publicado el {item.date}
                </p>
              </div>

              {/* Botones de interacción (Like, Compartir, Descargar) */}
              <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={handleLike}
                  disabled={liked}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    liked
                      ? 'text-rose-400 bg-rose-500/10 border border-rose-500/30 scale-105'
                      : 'text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent'
                  }`}
                  title="Me gusta"
                >
                  <Heart
                    size={18}
                    fill={liked ? 'currentColor' : 'none'}
                    className="transition-transform duration-300"
                  />
                  <span>{likes}</span>
                </button>

                <div className="flex items-center gap-2 relative">
                  {/* Toast de enlace copiado */}
                  <AnimatePresence>
                    {copied && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: -40, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute right-0 top-0 whitespace-nowrap bg-emerald-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1 pointer-events-none"
                      >
                        <Check size={12} /> ¡Enlace copiado!
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Botón Compartir */}
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60 transition-all active:scale-95 cursor-pointer"
                    title="Compartir"
                    aria-label="Compartir este elemento"
                  >
                    <Share2 size={16} />
                  </button>

                  {/* Botón Descargar Funcional */}
                  <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="p-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 border border-indigo-400/30 transition-all active:scale-95 flex items-center justify-center min-w-[40px] cursor-pointer"
                    title="Descargar archivo"
                    aria-label="Descargar este archivo multimedia"
                  >
                    {downloading ? (
                      <Loader2 size={16} className="animate-spin text-white" />
                    ) : (
                      <Download size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
