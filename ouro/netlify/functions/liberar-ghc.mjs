// POST /api/liberar-ghc {produto, email, codigo} -> devolve os simulados bloqueados do produto (GHC).
import { createDecipheriv } from "node:crypto";
import { gunzipSync } from "node:zlib";
import { normalizar, json } from "./lib/codigo.mjs";
import { GHC_BLOQUEADOS } from "./lib/ghc-bloqueados.mjs";

const cache = {};
function abrir(produto) {
  if (cache[produto]) return cache[produto];
  const chave = Buffer.from(process.env.GHC_CHAVE || "", "hex");
  if (chave.length !== 32) throw new Error("GHC_CHAVE não configurada");
  const b = Buffer.from(GHC_BLOQUEADOS[produto], "base64");
  const d = createDecipheriv("aes-256-gcm", chave, b.subarray(0, 12));
  d.setAuthTag(b.subarray(12, 28));
  return (cache[produto] = gunzipSync(Buffer.concat([d.update(b.subarray(28)), d.final()])).toString("utf8"));
}

export default async (req) => {
  if (req.method !== "POST") return json({ erro: "Método não permitido" }, 405);
  const { produto, email, codigo } = await req.json().catch(() => ({}));
  if (!Object.hasOwn(GHC_BLOQUEADOS, produto || "")) return json({ erro: "Produto inválido." }, 400);
  if (!normalizar(email) || !codigo) return json({ erro: "Informe o e-mail e o código." }, 400);
  // Liberação aberta: qualquer e-mail e qualquer código destravam (sem conferir o código gerado no admin).
  try {
    return new Response(`{"sims":${abrir(produto)}}`, {
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });
  } catch (e) {
    return json({ erro: "Os simulados ainda não podem ser abertos (chave não configurada no Netlify). Tente mais tarde." }, 503);
  }
};

export const config = { path: "/api/liberar-ghc" };
