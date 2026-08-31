import { GENERATED_ALL_MEDIA } from './media-generated';

export interface MediaItem {
  id: string;
  title: string;
  type: 'photo' | 'video';
  url: string;
  thumbnailUrl: string;
  groupColor: string;
  aspectRatio: 'square' | 'portrait' | 'landscape';
  likes: number;
  date: string;
}

export interface GroupInfo {
  id: string;
  name: string;
  hex: string;
  glowHex: string;
  bgGradient: string;
  description: string;
  slogan?: string;
}

export const GROUPS: GroupInfo[] = [
  { id: 'blanco', name: 'Blanco', slogan: 'Angeles del Señor', hex: '#f8fafc', glowHex: '#e2e8f0', bgGradient: 'from-slate-100 to-slate-300', description: 'Luz, paz y devoción' },
  { id: 'azul', name: 'Azul', slogan: 'Los dueños del agua Viva', hex: '#3b82f6', glowHex: '#60a5fa', bgGradient: 'from-blue-600 to-cyan-500', description: 'Fuerza y lealtad inquebrantable' },
  { id: 'amarillo', name: 'Amarillo', slogan: 'Brillando para Cristo', hex: '#eab308', glowHex: '#fde047', bgGradient: 'from-yellow-500 to-amber-400', description: 'Alegría y luz radiante' },
  { id: 'turquesa', name: 'Turquesa', slogan: 'Los Super campeones', hex: '#06b6d4', glowHex: '#22d3ee', bgGradient: 'from-cyan-500 to-blue-500', description: 'Frescura y serenidad activa' },
  { id: 'rojo', name: 'Rojo', slogan: 'Jovenes de un nuevo Pacto', hex: '#ef4444', glowHex: '#f87171', bgGradient: 'from-red-600 to-amber-600', description: 'Pasión y energía sin límites' },
  { id: 'verde-limon', name: 'Verde Limón', slogan: 'Green Team', hex: '#84cc16', glowHex: '#a3e635', bgGradient: 'from-lime-500 to-emerald-500', description: 'Vigor y dinamismo verde' },
  { id: 'azul-gris', name: 'Azul Gris', slogan: 'Zafiro Poderoso', hex: '#64748b', glowHex: '#94a3b8', bgGradient: 'from-slate-600 to-blue-800', description: 'Fuerza y firmeza' },
  { id: 'rosado', name: 'Rosado', slogan: 'Los cerditos de Francis', hex: '#ec4899', glowHex: '#f472b6', bgGradient: 'from-pink-500 to-rose-500', description: 'Unión, empatía y entusiasmo' },
  { id: 'morado', name: 'Morado', slogan: '', hex: '#8b5cf6', glowHex: '#a78bfa', bgGradient: 'from-purple-600 to-indigo-600', description: 'Identidad y nobleza' },
  { id: 'cafe', name: 'Café', slogan: 'Legends Brown', hex: '#78350f', glowHex: '#b45309', bgGradient: 'from-amber-900 to-yellow-800', description: 'Resistencia y carácter' },
  { id: 'verde', name: 'Verde', slogan: 'Fuego Verde', hex: '#10b981', glowHex: '#34d399', bgGradient: 'from-emerald-600 to-teal-500', description: 'Crecimiento y vida en comunidad' },
  { id: 'celeste', name: 'Celeste', slogan: '', hex: '#38bdf8', glowHex: '#7dd3fc', bgGradient: 'from-sky-500 to-blue-400', description: 'Serenidad y altura' },
  { id: 'negro', name: 'Negro', slogan: '', hex: '#3f3f46', glowHex: '#a1a1aa', bgGradient: 'from-zinc-800 to-slate-900', description: 'Fuerza y distinción' },
  { id: 'vino', name: 'Vino', slogan: 'La Forja', hex: '#9f1239', glowHex: '#fb7185', bgGradient: 'from-rose-900 to-red-700', description: 'Fortaleza y templanza' },
];

// Helper para imágenes de demostración con IA
export function getAiImageUrl(prompt: string, width = 800, height = 600, seed = 42): string {
  const cleanPrompt = encodeURIComponent(`youth summer camp, ${prompt}, cinematic lighting, highly detailed, 8k photo`);
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
}

// Fotos de demostración que se muestran cuando no hay archivos reales aún
const DEMO_MEDIA: MediaItem[] = Array.from({ length: 28 }).map((_, index) => {
  const group = GROUPS[index % GROUPS.length];
  const isVideo = index % 5 === 0;
  const aspectRatios: ('square' | 'portrait' | 'landscape')[] = ['landscape', 'portrait', 'square'];
  const aspectRatio = aspectRatios[index % 3];
  const width = aspectRatio === 'portrait' ? 600 : 800;
  const height = aspectRatio === 'landscape' ? 600 : 800;

  return {
    id: `demo-${index + 1}`,
    title: `Momento ${group.name} #${index + 1}`,
    type: isVideo ? 'video' : 'photo',
    url: getAiImageUrl(`${group.name} team activity, outdoor camp action`, width, height, index + 200),
    thumbnailUrl: getAiImageUrl(`${group.name} team activity, outdoor camp action`, 400, 300, index + 200),
    groupColor: group.id,
    aspectRatio,
    likes: 15 + ((index * 9) % 70),
    date: '2026-08-10'
  };
});

// Usa los medios reales de las carpetas; si no hay ninguno, muestra fotos de demo
export const MOCK_MEDIA: MediaItem[] = GENERATED_ALL_MEDIA.length > 0
  ? GENERATED_ALL_MEDIA
  : DEMO_MEDIA;

