const SQL_KEYWORDS = new Set([
  "select", "from", "where", "with", "as", "left", "right", "inner", "join",
  "on", "when", "then", "else", "case", "end", "over", "partition", "by",
  "order", "group", "having", "and", "or", "not", "in", "is", "null",
  "true", "false", "desc", "asc", "distinct", "limit",
]);

const SQL_FUNCTIONS = new Set([
  "row_number", "count", "sum", "avg", "min", "max", "datediff", "coalesce",
  "cast", "ref",
]);

type TokenKind =
  | "comment"
  | "string"
  | "jinja"
  | "keyword"
  | "function"
  | "number"
  | "plain";

interface Token {
  text: string;
  kind: TokenKind;
}

const TOKEN_PATTERN =
  /(--.*$)|('(?:[^'\\]|\\.)*')|(\{\{[^}]*\}\})|([A-Za-z_][A-Za-z0-9_]*)|(\d+(?:\.\d+)?)|(\s+)|([^\sA-Za-z0-9_]+)/g;

function tokenizeSqlLine(line: string): Token[] {
  const tokens: Token[] = [];
  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const [full, comment, str, jinja, word, number] = match;
    if (comment) tokens.push({ text: comment, kind: "comment" });
    else if (str) tokens.push({ text: str, kind: "string" });
    else if (jinja) tokens.push({ text: jinja, kind: "jinja" });
    else if (word) {
      const lower = word.toLowerCase();
      if (SQL_KEYWORDS.has(lower)) tokens.push({ text: word, kind: "keyword" });
      else if (SQL_FUNCTIONS.has(lower)) tokens.push({ text: word, kind: "function" });
      else tokens.push({ text: word, kind: "plain" });
    } else if (number) tokens.push({ text: number, kind: "number" });
    else tokens.push({ text: full, kind: "plain" });
  }
  return tokens;
}

const TOKEN_CLASS: Record<TokenKind, string> = {
  comment: "italic text-muted-foreground",
  string: "text-secondary",
  jinja: "text-primary",
  keyword: "font-semibold text-primary",
  function: "text-secondary",
  number: "text-secondary",
  plain: "text-foreground",
};

/**
 * Highlighter de SQL/dbt feito à mão (sem shiki/rehype/react-syntax-
 * highlighter) — o bloco é estático (não é input do usuário), então um
 * tokenizer por regex é suficiente e mantém a página 100% Server Component,
 * sem JS extra no client só pra colorir uma sintaxe.
 */
export function SqlCodeBlock({
  code,
  filename,
}: {
  code: string;
  filename?: string;
}) {
  const lines = code.split("\n");

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card/60">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span aria-hidden className="size-2.5 rounded-full bg-destructive/60" />
        <span aria-hidden className="size-2.5 rounded-full bg-primary/60" />
        <span aria-hidden className="size-2.5 rounded-full bg-secondary/60" />
        {filename ? (
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            {filename}
          </span>
        ) : null}
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
        <code className="font-mono">
          {lines.map((line, lineIndex) => (
            <div key={lineIndex}>
              {line.length === 0 ? (
                <>&nbsp;</>
              ) : (
                tokenizeSqlLine(line).map((token, tokenIndex) => (
                  <span key={tokenIndex} className={TOKEN_CLASS[token.kind]}>
                    {token.text}
                  </span>
                ))
              )}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
