/** Renderiza o texto simples dos artigos: parágrafos separados por linha em branco e listas com "- ". */
export function ArticleBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);
  return (
    <div className="prose-site">
      {blocks.map((b, i) => {
        const lines = b.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.every((l) => l.startsWith("- "))) {
          return <ul key={i}>{lines.map((l) => <li key={l}>{l.slice(2)}</li>)}</ul>;
        }
        if (lines[0]?.startsWith("## ")) return <h2 key={i}>{lines[0].slice(3)}</h2>;
        return <p key={i}>{lines.join(" ")}</p>;
      })}
    </div>
  );
}
