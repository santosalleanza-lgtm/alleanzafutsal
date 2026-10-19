export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
/** Somente no servidor: a chave service role nunca vai para o navegador. */
export const hasServiceRole = () => Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
export const isMercadoPagoConfigured = () => Boolean(process.env.MERCADOPAGO_ACCESS_TOKEN);
