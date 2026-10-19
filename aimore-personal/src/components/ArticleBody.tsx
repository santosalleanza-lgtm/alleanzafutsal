/** Texto simples dos artigos: "## " subtítulo, "- " lista, "> " destaque; parágrafos separados por linha em branco. */
export function ArticleBody({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);
  return (
    <div className="prose-site">
      {blocks.map((b, i) => {
        const lines = b.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.every((l) => l.startsWith("- "))) return <ul key={i}>{lines.map((l) => <li key={l}>{l.slice(2)}</li>)}</ul>;
        if (lines[0]?.startsWith("## ")) return <h2 key={i}>{lines[0].slice(3)}</h2>;
        if (lines[0]?.startsWith("> "))
          return (
            <blockquote key={i} className="my-8 border-l-2 border-gold bg-gold/5 py-4 pl-5 pr-4 font-display text-2xl font-bold uppercase leading-tight text-chalk">
              {lines.map((l) => l.replace(/^>\s?/, "")).join(" ")}
            </blockquote>
          );
        return <p key={i}>{lines.join(" ")}</p>;
      })}
    </div>
  );
}
