// GET /api/gratis-ghc?produto=higienizacao|vigia -> simulados GHC que eram bloqueados, sem código.
import { createDecipheriv } from "node:crypto";
import { gunzipSync } from "node:zlib";
import { json } from "./lib/codigo.mjs";
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
  const produto = new URL(req.url).searchParams.get("produto") || "";
  if (!Object.hasOwn(GHC_BLOQUEADOS, produto)) return json({ erro: "Produto inválido." }, 400);
  try {
    return new Response(`{"sims":${abrir(produto)}}`, {
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "public, max-age=3600" },
    });
  } catch (e) {
    return json({ erro: "Não foi possível abrir os simulados: " + e.message }, 503);
  }
};

export const config = { path: "/api/gratis-ghc" };
