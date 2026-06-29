import { Link, useParams } from 'react-router-dom'
import { MarkdownRenderer } from '../components/MarkdownRenderer'
import { findGuide, GUIDES } from '../data/guides'

export function GuidesPage() {
  const { slug } = useParams()
  const selectedGuide = findGuide(slug)

  if (!selectedGuide) {
    return (
      <section className="grid gap-6">
        <header className="grid gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Guides
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">Guide not found</h1>
          <p className="max-w-2xl text-slate-700">
            That guide does not exist. Choose one of the available student guides instead.
          </p>
          <div>
            <Link
              className="inline-flex rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700"
              to="/guides"
            >
              Open Guides
            </Link>
          </div>
        </header>
      </section>
    )
  }

  return (
    <section className="grid gap-6">
      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="grid gap-4 self-start rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm xl:sticky">
          <div className="grid gap-1">
            <h2 className="text-lg font-semibold text-slate-900">Available guides</h2>
            <p className="text-sm text-slate-600">Pick a topic to open its markdown guide.</p>
          </div>

          <nav className="grid gap-2" aria-label="Guides navigation">
            {GUIDES.map((guide) => {
              const isActive = guide.slug === selectedGuide.slug

              return (
                <Link
                  key={guide.slug}
                  className={
                    isActive
                      ? 'grid gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-4 shadow-sm'
                      : 'grid gap-2 rounded-2xl border border-slate-200 px-4 py-4 hover:border-blue-200 hover:bg-slate-50'
                  }
                  to={`/guides/${guide.slug}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold text-slate-900">{guide.title}</h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {guide.category}
                    </span>
                  </div>
                </Link>
              )
            })}
          </nav>
        </aside>

        <article className="grid gap-6 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <header className="grid gap-3 border-b border-slate-200 pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                {selectedGuide.category}
              </span>
              <span className="text-sm text-slate-500">Markdown guide</span>
            </div>
            <div className="grid gap-2">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                {selectedGuide.title}
              </h2>
              <p className="max-w-3xl text-slate-700">{selectedGuide.description}</p>
            </div>
          </header>

          <MarkdownRenderer content={selectedGuide.content} />
        </article>
      </div>
    </section>
  )
}
