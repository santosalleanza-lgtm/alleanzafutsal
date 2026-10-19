/** Tempo estimado de leitura (200 palavras por minuto). */
export const readingMinutes = (text: string) => Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
