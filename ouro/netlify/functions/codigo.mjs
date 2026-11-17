// POST /api/codigo {email, senha} -> código de liberação para o e-mail (uso do administrador).
import { gerarCodigo, iguais, normalizar, json } from "./lib/codigo.mjs";

export default async (req) => {
  if (req.method !== "POST") return json({ erro: "Método não permitido" }, 405);
  const { email, senha } = await req.json().catch(() => ({}));
  const admin = process.env.ADMIN_SENHA;
  if (!admin) return json({ erro: "ADMIN_SENHA não configurada no Netlify." }, 500);
  if (!iguais(senha || "", admin)) return json({ erro: "Senha incorreta." }, 403);
  if (!normalizar(email).includes("@")) return json({ erro: "E-mail inválido." }, 400);
  return json({ email: normalizar(email), codigo: gerarCodigo(email) });
};

export const config = { path: "/api/codigo" };
