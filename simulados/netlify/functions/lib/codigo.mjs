import { createHmac, timingSafeEqual } from "node:crypto";

const ALFABETO = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sem 0/O e 1/I

export const normalizar = (email) => String(email || "").trim().toLowerCase();

// Código de 6 caracteres derivado do e-mail: só quem tem CODIGO_SEGREDO consegue gerar.
export function gerarCodigo(email) {
  const segredo = process.env.CODIGO_SEGREDO;
  if (!segredo) throw new Error("CODIGO_SEGREDO não configurado");
  const h = createHmac("sha256", segredo).update(normalizar(email)).digest();
  let c = "";
  for (let i = 0; i < 6; i++) c += ALFABETO[h[i] % ALFABETO.length];
  return c;
}

export function iguais(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

export const json = (dados, status = 200) =>
  new Response(JSON.stringify(dados), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
