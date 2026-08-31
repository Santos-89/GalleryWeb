/**
 * generate-media.mjs
 * ------------------
 * Este script escanea automáticamente las carpetas de medios
 * y genera el archivo lib/media-generated.ts con todos los
 * ítems de la galería listos para ser usados por la app.
 *
 * Estructura de carpetas esperada:
 *   public/media/general/        → Galería General (portada)
 *   public/media/grupos/rojo/    → Fotos del Grupo Rojo
 *   public/media/grupos/azul/    → Fotos del Grupo Azul
 *   ... (resto de grupos)
 *
 * Formatos soportados: .jpg .jpeg .png .gif .webp .mp4 .mov .webm
 */

import { readdirSync, writeFileSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const MEDIA_ROOT = join(ROOT, 'public', 'media');
const OUTPUT_FILE = join(ROOT, 'lib', 'media-generated.ts');

// Extensiones soportadas
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']);
const VIDEO_EXTS = new Set(['.mp4', '.mov', '.webm', '.ogg']);

// Grupos disponibles (14 grupos oficiales)
const GROUPS = [
  'blanco', 'azul', 'amarillo', 'turquesa', 'rojo', 'verde-limon',
  'azul-gris', 'rosado', 'morado', 'cafe', 'verde', 'celeste', 'negro', 'vino'
];

/**
 * Detecta el tipo de medio por extensión.
 */
function getMediaType(filename) {
  const ext = extname(filename).toLowerCase();
  if (IMAGE_EXTS.has(ext)) return 'photo';
  if (VIDEO_EXTS.has(ext)) return 'video';
  return null;
}

/**
 * Determina el aspect ratio del archivo.
 * Por defecto 'landscape'. Si el nombre incluye "_p" o "_portrait" → portrait.
 * Si incluye "_s" o "_square" → square.
 */
function getAspectRatio(filename) {
  const name = filename.toLowerCase();
  if (name.includes('_portrait') || name.includes('_p.')) return 'portrait';
  if (name.includes('_square') || name.includes('_s.')) return 'square';
  return 'landscape';
}

/**
 * Convierte el nombre de archivo en un título legible.
 */
function fileToTitle(filename) {
  return basename(filename, extname(filename))
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/**
 * Escanea una carpeta y devuelve los ítems de media.
 */
function scanFolder(folderPath, groupColor, idPrefix) {
  if (!existsSync(folderPath)) return [];

  const files = readdirSync(folderPath).filter((f) => {
    // Excluir archivos de metadatos de macOS (._) y archivos ocultos
    if (f.startsWith('._') || f.startsWith('.')) return false;
    const ext = extname(f).toLowerCase();
    return IMAGE_EXTS.has(ext) || VIDEO_EXTS.has(ext);
  });

  return files.map((filename, index) => {
    const type = getMediaType(filename);
    const aspectRatio = getAspectRatio(filename);
    const publicPath = `/media/${groupColor === 'general' ? 'general' : `grupos/${groupColor}`}/${filename}`;

    return {
      id: `${idPrefix}-${index + 1}`,
      title: fileToTitle(filename),
      type,
      url: publicPath,
      thumbnailUrl: publicPath,
      groupColor: groupColor === 'general' ? 'rojo' : groupColor, // general usa rojo por defecto en galería de grupos
      aspectRatio,
      likes: 0,
      date: new Date().toISOString().split('T')[0],
      _isGeneral: groupColor === 'general',
    };
  });
}

// ─── Escaneo ────────────────────────────────────────────────────────────────

const generalItems = scanFolder(
  join(MEDIA_ROOT, 'general'),
  'general',
  'general'
);

const groupItems = GROUPS.flatMap((group) =>
  scanFolder(join(MEDIA_ROOT, 'grupos', group), group, group)
);

// Items de galería general = fotos de general + todas las fotos de grupos
const allGeneralMedia = [
  ...generalItems,
  ...groupItems,
].map(({ _isGeneral, ...item }) => item);

// Items por grupo
const groupOnlyMedia = groupItems.map(({ _isGeneral, ...item }) => item);

// ─── Generación del archivo TypeScript ──────────────────────────────────────

const serialize = (items) =>
  items.map((item) => `  {
    id: ${JSON.stringify(item.id)},
    title: ${JSON.stringify(item.title)},
    type: ${JSON.stringify(item.type)},
    url: ${JSON.stringify(item.url)},
    thumbnailUrl: ${JSON.stringify(item.thumbnailUrl)},
    groupColor: ${JSON.stringify(item.groupColor)},
    aspectRatio: ${JSON.stringify(item.aspectRatio)},
    likes: ${item.likes},
    date: ${JSON.stringify(item.date)},
  }`).join(',\n');

const output = `// ⚠️ ARCHIVO GENERADO AUTOMÁTICAMENTE — NO EDITAR MANUALMENTE
// Para agregar o quitar fotos/videos, modifica los archivos dentro de public/media/
// Este archivo se regenera cada vez que ejecutas \`npm run build\`.

import type { MediaItem } from './data';

/** Todos los medios (galería general = carpeta general + todos los grupos) */
export const GENERATED_ALL_MEDIA: MediaItem[] = [
${serialize(allGeneralMedia)}
];

/** Solo medios de grupos específicos */
export const GENERATED_GROUP_MEDIA: MediaItem[] = [
${serialize(groupOnlyMedia)}
];

export const GENERATED_COUNT = {
  total: ${allGeneralMedia.length},
  groups: ${groupOnlyMedia.length},
  general: ${generalItems.length},
};
`;

writeFileSync(OUTPUT_FILE, output, 'utf-8');

const total = allGeneralMedia.length;
const groupCount = groupOnlyMedia.length;

console.log(`✅ Media generada exitosamente:`);
console.log(`   • Galería general: ${generalItems.length} archivos`);
console.log(`   • Por grupos: ${groupCount} archivos`);
console.log(`   • Total: ${total} archivos`);
if (total === 0) {
  console.log(`\n   ℹ️  No se encontraron archivos. Agrega fotos/videos en:`);
  console.log(`       public/media/general/         → Galería General`);
  console.log(`       public/media/grupos/<color>/  → Galería de cada Grupo`);
}
