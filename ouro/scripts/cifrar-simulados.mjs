// Gera netlify/functions/lib/bloqueados.mjs a partir do HTML completo (fora do repositório).
// Uso: DADOS_CHAVE=<64 hex> node scripts/cifrar-simulados.mjs caminho/completo.html [livres=3]
import { readFileSync, writeFileSync } from "node:fs";
import { createCipheriv, randomBytes } from "node:crypto";
import { gzipSync } from "node:zlib";

const [arquivo, livres = "3"] = process.argv.slice(2);
const chave = Buffer.from(process.env.DADOS_CHAVE || "", "hex");
if (!arquivo || chave.length !== 32) {
  console.error("Uso: DADOS_CHAVE=<64 hex> node scripts/cifrar-simulados.mjs completo.html [livres]");
  process.exit(1);
}
const html = readFileSync(arquivo, "utf8");
const m = html.match(/<script id="data" type="application\/json">([\s\S]*?)<\/script>/);
const sims = JSON.parse(m[1]).sims.filter((s) => s.n > Number(livres))
  .map(({ n, q, texto }) => (texto ? { n, q, texto } : { n, q }));
const iv = randomBytes(12);
const c = createCipheriv("aes-256-gcm", chave, iv);
const dados = Buffer.concat([c.update(gzipSync(JSON.stringify(sims))), c.final()]);
const b64 = Buffer.concat([iv, c.getAuthTag(), dados]).toString("base64");
const destino = new URL("../netlify/functions/lib/bloqueados.mjs", import.meta.url);
writeFileSync(destino, `// Gerado por scripts/cifrar-simulados.mjs: simulados ${sims[0].n}-${sims.at(-1).n} cifrados (AES-256-GCM).\nexport const BLOQUEADOS = "${b64}";\n`);
console.log(`${sims.length} simulados cifrados -> ${destino.pathname}`);
