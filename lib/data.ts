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
  slogan: string;
}

export const GROUPS: GroupInfo[] = [
  { id: 'rojo', name: 'Rojo Fuego', hex: '#ef4444', glowHex: '#f87171', bgGradient: 'from-red-600 to-amber-600', description: 'Pasión y energía sin límites', slogan: '¡Encendiendo la chispa!' },
  { id: 'azul', name: 'Azul Trueno', hex: '#3b82f6', glowHex: '#60a5fa', bgGradient: 'from-blue-600 to-cyan-500', description: 'Fuerza y lealtad inquebrantable', slogan: '¡Retumbando con poder!' },
  { id: 'verde', name: 'Verde Esmeralda', hex: '#10b981', glowHex: '#34d399', bgGradient: 'from-emerald-600 to-teal-500', description: 'Crecimiento y vida en comunidad', slogan: '¡Raíces firmes, frutos altos!' },
  { id: 'amarillo', name: 'Amarillo Sol', hex: '#eab308', glowHex: '#fde047', bgGradient: 'from-yellow-500 to-amber-400', description: 'Alegría y luz radiante', slogan: '¡Brillando en todo lugar!' },
  { id: 'naranja', name: 'Naranja Llama', hex: '#f97316', glowHex: '#fb923c', bgGradient: 'from-orange-500 to-red-500', description: 'Creatividad y dinamismo puro', slogan: '¡Fuego que contagia!' },
  { id: 'morado', name: 'Morado Real', hex: '#8b5cf6', glowHex: '#a78bfa', bgGradient: 'from-purple-600 to-indigo-600', description: 'Identidad y nobleza', slogan: '¡Linaje de campeones!' },
  { id: 'rosa', name: 'Rosa Neón', hex: '#ec4899', glowHex: '#f472b6', bgGradient: 'from-pink-500 to-rose-500', description: 'Empatía, unión y entusiasmo', slogan: '¡Con todo el corazón!' },
  { id: 'turquesa', name: 'Turquesa Océano', hex: '#06b6d4', glowHex: '#22d3ee', bgGradient: 'from-cyan-500 to-blue-500', description: 'Frescura y serenidad activa', slogan: '¡Profundos como el mar!' },
  { id: 'dorado', name: 'Dorado Rey', hex: '#d97706', glowHex: '#fbbf24', bgGradient: 'from-amber-600 to-yellow-500', description: 'Excelencia y honor', slogan: '¡Brillo de victoria!' },
  { id: 'plateado', name: 'Plateado Cyber', hex: '#94a3b8', glowHex: '#cbd5e1', bgGradient: 'from-slate-400 to-zinc-200', description: 'Innovación y precisión', slogan: '¡Reflejando la luz!' },
  { id: 'coral', name: 'Coral Vivo', hex: '#f43f5e', glowHex: '#fb7185', bgGradient: 'from-rose-500 to-orange-400', description: 'Calidez y compañerismo', slogan: '¡Vida en abundancia!' },
  { id: 'violeta', name: 'Violeta Místico', hex: '#6366f1', glowHex: '#818cf8', bgGradient: 'from-indigo-600 to-purple-500', description: 'Visión y espiritualidad', slogan: '¡Mirando hacia lo alto!' }
];

// Helper para imágenes de demostración con IA
export function getAiImageUrl(prompt: string, width = 800, height = 600, seed = 42): string {
  const cleanPrompt = encodeURIComponent(`youth summer camp, ${prompt}, cinematic lighting, highly detailed, 8k photo`);
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
}

// Fotos de demostración que se muestran cuando no hay archivos reales aún
const DEMO_MEDIA: MediaItem[] = Array.from({ length: 24 }).map((_, index) => {
  const group = GROUPS[index % GROUPS.length];
  const isVideo = index % 6 === 0;
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
