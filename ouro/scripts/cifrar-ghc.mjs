// Gera netlify/functions/lib/ghc-bloqueados.mjs a partir dos JSON completos (fora do repositório).
// Uso: GHC_CHAVE=<64 hex> node scripts/cifrar-ghc.mjs higienizacao=caminho/higienizacao.json vigia=caminho/vigia.json
import { readFileSync, writeFileSync } from "node:fs";
import { createCipheriv, randomBytes } from "node:crypto";
import { gzipSync } from "node:zlib";

const chave = Buffer.from(process.env.GHC_CHAVE || "", "hex");
const pares = process.argv.slice(2).map((a) => a.split("="));
if (chave.length !== 32 || !pares.length) {
  console.error("Uso: GHC_CHAVE=<64 hex> node scripts/cifrar-ghc.mjs produto=arquivo.json ...");
  process.exit(1);
}
let saida = "";
for (const [produto, arq] of pares) {
  const sims = JSON.parse(readFileSync(arq, "utf8")).filter((s) => s.n > 1)
    .map(({ n, q, texto }) => (texto ? { n, q, texto } : { n, q }));
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", chave, iv);
  const dados = Buffer.concat([c.update(gzipSync(JSON.stringify(sims))), c.final()]);
  saida += `  ${produto}: "${Buffer.concat([iv, c.getAuthTag(), dados]).toString("base64")}",\n`;
}
const destino = new URL("../netlify/functions/lib/ghc-bloqueados.mjs", import.meta.url);
writeFileSync(destino, `// Gerado por scripts/cifrar-ghc.mjs: simulados 2-3 de cada produto, cifrados (AES-256-GCM).\nexport const GHC_BLOQUEADOS = {\n${saida}};\n`);
console.log("ok ->", destino.pathname);
