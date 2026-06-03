import type { ReactNode } from 'react'

interface MarkdownRendererProps {
  content: string
}

type MarkdownBlock =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'unordered-list'; items: string[] }
  | { type: 'ordered-list'; items: string[] }
  | { type: 'blockquote'; text: string }
  | { type: 'code'; language: string; code: string }

const CODE_KEYWORDS = new Set([
  'async',
  'await',
  'catch',
  'const',
  'else',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'from',
  'function',
  'if',
  'import',
  'in',
  'interface',
  'let',
  'new',
  'null',
  'return',
  'throw',
  'true',
  'try',
  'type',
  'undefined',
  'var',
])

function isHeading(line: string): boolean {
  return /^#{1,4}\s+/.test(line)
}

function isUnorderedListItem(line: string): boolean {
  return /^\s*[-*]\s+/.test(line)
}

function isOrderedListItem(line: string): boolean {
  return /^\s*\d+\.\s+/.test(line)
}

function parseMarkdown(content: string): MarkdownBlock[] {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const blocks: MarkdownBlock[] = []
  let index = 0

  while (index < lines.length) {
    const currentLine = lines[index]
    const trimmedLine = currentLine.trim()

    if (!trimmedLine) {
      index += 1
      continue
    }

    if (trimmedLine.startsWith('```')) {
      const language = trimmedLine.slice(3).trim()
      const codeLines: string[] = []
      index += 1

      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index])
        index += 1
      }

      blocks.push({
        type: 'code',
        language,
        code: codeLines.join('\n').trimEnd(),
      })
      index += 1
      continue
    }

    const headingMatch = trimmedLine.match(/^(#{1,4})\s+(.+)$/)
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      })
      index += 1
      continue
    }

    if (trimmedLine.startsWith('>')) {
      const quoteLines: string[] = []

      while (index < lines.length && lines[index].trim().startsWith('>')) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ''))
        index += 1
      }

      blocks.push({
        type: 'blockquote',
        text: quoteLines.join(' '),
      })
      continue
    }

    if (isUnorderedListItem(trimmedLine)) {
      const items: string[] = []

      while (index < lines.length && isUnorderedListItem(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ''))
        index += 1
      }

      blocks.push({ type: 'unordered-list', items })
      continue
    }

    if (isOrderedListItem(trimmedLine)) {
      const items: string[] = []

      while (index < lines.length && isOrderedListItem(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ''))
        index += 1
      }

      blocks.push({ type: 'ordered-list', items })
      continue
    }

    const paragraphLines: string[] = []

    while (
      index < lines.length &&
      lines[index].trim() &&
      !isHeading(lines[index].trim()) &&
      !lines[index].trim().startsWith('```') &&
      !lines[index].trim().startsWith('>') &&
      !isUnorderedListItem(lines[index].trim()) &&
      !isOrderedListItem(lines[index].trim())
    ) {
      paragraphLines.push(lines[index].trim())
      index += 1
    }

    blocks.push({
      type: 'paragraph',
      text: paragraphLines.join(' '),
    })
  }

  return blocks
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\[[^\]]+\]\([^)]+\))/g
  let lastIndex = 0

  let match = pattern.exec(text)

  while (match) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]

    if (token.startsWith('`')) {
      nodes.push(
        <code
          key={`${token}-${match.index}`}
          className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.95em] text-slate-800"
        >
          {token.slice(1, -1)}
        </code>,
      )
    } else if (token.startsWith('**')) {
      nodes.push(
        <strong key={`${token}-${match.index}`} className="font-semibold text-slate-900">
          {token.slice(2, -2)}
        </strong>,
      )
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)

      if (linkMatch) {
        const [, label, href] = linkMatch
        const isExternal = /^https?:\/\//.test(href)

        nodes.push(
          <a
            key={`${href}-${match.index}`}
            className="font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-800"
            href={href}
            rel={isExternal ? 'noreferrer' : undefined}
            target={isExternal ? '_blank' : undefined}
          >
            {label}
          </a>,
        )
      }
    }

    lastIndex = match.index + token.length
    match = pattern.exec(text)
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

function renderHighlightedCode(code: string): ReactNode[] {
  const lines = code.split('\n')
  const highlightedLines: ReactNode[] = []
  const tokenPattern =
    /(\/\/.*|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|`(?:\\.|[^`])*`|<\/?[A-Za-z][\w-]*|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b|[{}()[\].,;:=<>/+*-])/g

  lines.forEach((line, lineIndex) => {
    let lastIndex = 0
    let match = tokenPattern.exec(line)

    while (match) {
      if (match.index > lastIndex) {
        highlightedLines.push(line.slice(lastIndex, match.index))
      }

      const token = match[0]
      let className = 'text-slate-100'

      if (token.startsWith('//')) {
        className = 'text-slate-500 italic'
      } else if (
        token.startsWith('"') ||
        token.startsWith("'") ||
        token.startsWith('`')
      ) {
        className = 'text-emerald-300'
      } else if (token.startsWith('<') || token.startsWith('</')) {
        className = 'text-pink-300'
      } else if (/^\d/.test(token)) {
        className = 'text-amber-300'
      } else if (CODE_KEYWORDS.has(token)) {
        className = 'text-sky-300'
      } else if (/^[{}()[\].,;:=<>/+*-]$/.test(token)) {
        className = 'text-slate-400'
      }

      highlightedLines.push(
        <span key={`${lineIndex}-${match.index}`} className={className}>
          {token}
        </span>,
      )

      lastIndex = match.index + token.length
      match = tokenPattern.exec(line)
    }

    if (lastIndex < line.length) {
      highlightedLines.push(line.slice(lastIndex))
    }

    if (lineIndex < lines.length - 1) {
      highlightedLines.push('\n')
    }
  })

  return highlightedLines
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = parseMarkdown(content)

  return (
    <div className="grid gap-5 text-base leading-7 text-slate-700">
      {blocks.map((block, blockIndex) => {
        if (block.type === 'heading') {
          const headingClass =
            block.level === 2
              ? 'text-2xl font-semibold tracking-tight text-slate-900'
              : block.level === 3
                ? 'text-xl font-semibold text-slate-900'
                : 'text-lg font-semibold text-slate-900'

          return (
            <h2 key={`${block.type}-${blockIndex}`} className={headingClass}>
              {renderInline(block.text)}
            </h2>
          )
        }

        if (block.type === 'paragraph') {
          return <p key={`${block.type}-${blockIndex}`}>{renderInline(block.text)}</p>
        }

        if (block.type === 'unordered-list') {
          return (
            <ul
              key={`${block.type}-${blockIndex}`}
              className="grid gap-2 pl-5 text-slate-700 marker:text-slate-400"
            >
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`} className="list-disc">
                  {renderInline(item)}
                </li>
              ))}
            </ul>
          )
        }

        if (block.type === 'ordered-list') {
          return (
            <ol
              key={`${block.type}-${blockIndex}`}
              className="grid gap-2 pl-5 text-slate-700 marker:font-semibold marker:text-slate-500"
            >
              {block.items.map((item, itemIndex) => (
                <li key={`${item}-${itemIndex}`} className="list-decimal">
                  {renderInline(item)}
                </li>
              ))}
            </ol>
          )
        }

        if (block.type === 'blockquote') {
          return (
            <blockquote
              key={`${block.type}-${blockIndex}`}
              className="rounded-r-2xl border-l-4 border-blue-300 bg-blue-50 px-4 py-3 text-slate-800"
            >
              {renderInline(block.text)}
            </blockquote>
          )
        }

        return (
          <div
            key={`${block.type}-${blockIndex}`}
            className="overflow-x-auto rounded-[1.5rem] bg-slate-950 shadow-lg shadow-slate-950/10"
          >
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-400">
              <span>Code</span>
              <span>{block.language || 'text'}</span>
            </div>
            <pre className="p-4 text-sm leading-6 text-slate-100">
              <code>{renderHighlightedCode(block.code)}</code>
            </pre>
          </div>
        )
      })}
    </div>
  )
}
