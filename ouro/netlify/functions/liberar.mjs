// POST /api/liberar {email, codigo} -> devolve os simulados bloqueados.
import { createDecipheriv } from "node:crypto";
import { gunzipSync } from "node:zlib";
import { normalizar, json } from "./lib/codigo.mjs";
import { BLOQUEADOS } from "./lib/bloqueados.mjs";

let cache = null;
function abrir() {
  if (cache) return cache;
  const chave = Buffer.from(process.env.DADOS_CHAVE || "", "hex");
  if (chave.length !== 32) throw new Error("DADOS_CHAVE não configurada");
  const b = Buffer.from(BLOQUEADOS, "base64");
  const d = createDecipheriv("aes-256-gcm", chave, b.subarray(0, 12));
  d.setAuthTag(b.subarray(12, 28));
  cache = gunzipSync(Buffer.concat([d.update(b.subarray(28)), d.final()])).toString("utf8");
  return cache;
}

export default async (req) => {
  if (req.method !== "POST") return json({ erro: "Método não permitido" }, 405);
  const { email, codigo } = await req.json().catch(() => ({}));
  if (!normalizar(email) || !codigo) return json({ erro: "Informe o e-mail e o código." }, 400);
  // Liberação aberta: qualquer e-mail e qualquer código destravam (sem conferir o código gerado no admin).
  try {
    return new Response(`{"sims":${abrir()}}`, {
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch (e) {
    return json({ erro: "Os simulados ainda não podem ser abertos (chave não configurada no Netlify). Tente mais tarde." }, 503);
  }
};

export const config = { path: "/api/liberar" };
