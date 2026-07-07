interface GuideMeta {
  slug: string
  category: string
}

export interface GuideDefinition extends GuideMeta {
  title: string
  description: string
  content: string
}

const GUIDE_META: GuideMeta[] = [
  { slug: 'changing-background-colour', category: 'Styling' },
  { slug: 'creating-a-route-and-page', category: 'Project structure' },
  { slug: 'project-layout', category: 'Project structure' },
  { slug: 'adding-navigation-links', category: 'Navigation' },
  { slug: 'editing-page-content', category: 'Content' },
  { slug: 'changing-the-browser-tab-title', category: 'Content' },
  { slug: 'adding-a-button', category: 'Components' },
  { slug: 'styling-with-tailwind', category: 'Styling' },
  { slug: 'react-basics', category: 'React' },
  { slug: 'fetching-api-data', category: 'Data fetching' },
  { slug: 'search-and-filtering', category: 'Data handling' },
  { slug: 'working-with-lists-and-sorting', category: 'Data handling' },
  { slug: 'saving-browser-data', category: 'Persistence' },
  { slug: 'building-forms', category: 'Forms' },
  { slug: 'writing-better-prompts', category: 'AI workflow' },
]

const guideFiles = import.meta.glob('../content/guides/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function getGuideFile(slug: string): string {
  const matchingPath = Object.keys(guideFiles).find((path) => path.endsWith(`/${slug}.md`))

  if (!matchingPath) {
    throw new Error(`Guide markdown file not found for slug: ${slug}`)
  }

  return guideFiles[matchingPath]
}

function extractTitle(markdown: string, slug: string): string {
  const firstLine = markdown.split('\n')[0]?.trim() ?? ''
  const headingMatch = firstLine.match(/^#\s+(.+)$/)

  if (headingMatch) {
    return headingMatch[1].trim()
  }

  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function stripLeadingTitle(markdown: string): string {
  return markdown.replace(/^#\s+.+\n+/, '').trim()
}

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/\n+/g, ' ')
    .trim()
}

function extractDescription(markdown: string): string {
  const paragraphs = stripLeadingTitle(markdown)
    .split(/\n\s*\n/)
    .map((section) => stripMarkdown(section))
    .filter(Boolean)

  return paragraphs[0] ?? 'Guide'
}

export const GUIDES: GuideDefinition[] = GUIDE_META.map((meta) => {
  const file = getGuideFile(meta.slug)

  return {
    ...meta,
    title: extractTitle(file, meta.slug),
    description: extractDescription(file),
    content: stripLeadingTitle(file),
  }
})

export function findGuide(slug: string | undefined): GuideDefinition | undefined {
  if (!slug) {
    return GUIDES[0]
  }

  return GUIDES.find((guide) => guide.slug === slug)
}
