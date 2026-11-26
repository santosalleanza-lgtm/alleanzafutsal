// GET /api/gratis -> todos os simulados HCPA que eram bloqueados, sem código (liberação geral).
import { createDecipheriv } from "node:crypto";
import { gunzipSync } from "node:zlib";
import { json } from "./lib/codigo.mjs";
import { BLOQUEADOS } from "./lib/bloqueados.mjs";

let cache = null;
function abrir() {
  if (cache) return cache;
  const chave = Buffer.from(process.env.DADOS_CHAVE || "", "hex");
  if (chave.length !== 32) throw new Error("DADOS_CHAVE não configurada");
  const b = Buffer.from(BLOQUEADOS, "base64");
  const d = createDecipheriv("aes-256-gcm", chave, b.subarray(0, 12));
  d.setAuthTag(b.subarray(12, 28));
  return (cache = gunzipSync(Buffer.concat([d.update(b.subarray(28)), d.final()])).toString("utf8"));
}

export default async () => {
  try {
    return new Response(`{"sims":${abrir()}}`, {
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=3600" },
    });
  } catch (e) {
    return json({ erro: "Não foi possível abrir os simulados: " + e.message }, 503);
  }
};

export const config = { path: "/api/gratis" };
