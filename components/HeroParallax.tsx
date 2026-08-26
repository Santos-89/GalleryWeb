'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerBackRef = useRef<HTMLDivElement>(null);
  const layerMidRef = useRef<HTMLDivElement>(null);
  const layerFrontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      tl.to(layerBackRef.current, { y: 150, scale: 1.1, opacity: 0.2 }, 0);
      tl.to(layerMidRef.current, { y: -80, scale: 1.05 }, 0);
      tl.to(layerFrontRef.current, { y: -180 }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[85vh] w-full overflow-hidden bg-slate-950 text-white flex items-center justify-center">
      {/* Capa de fondo 3D con imagen de Stock/Campo.jpg y efecto de desenfoque */}
      <div
        ref={layerBackRef}
        className="absolute inset-0 bg-cover bg-center opacity-50 blur-sm scale-105"
        style={{ backgroundImage: `url(/stock/Campo.jpg)` }}
      />
      
      {/* Capa Media: Título y descripción */}
      <div ref={layerMidRef} className="relative z-10 text-center px-4 max-w-4xl">
        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-md">
          Campamento de Jóvenes 2026
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-300 drop-shadow-lg">
          GALERÍA VIRTUAL 3D
        </h1>
        <p className="mt-4 text-slate-300 text-lg md:text-xl font-light max-w-2xl mx-auto">
          Revive los mejores momentos del campamento. Explora la galería general o navega por los 14 grupos de colores.
        </p>
      </div>

      {/* Capa Frontal: Difuminado de transición */}
      <div ref={layerFrontRef} className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent z-20 pointer-events-none" />
    </div>
  );
}
