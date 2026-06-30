#!/usr/bin/env python3

from __future__ import annotations

import html
import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
    XPreformatted,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "docs" / "session-1-starter-cheatsheet-print.pdf"


CHEATSHEET = {
    "title": "DB Work Experience Session 1 Cheatsheet",
    "subtitle": "Volunteer handout for printing",
    "sections": [
        {
            "heading": "Setup Commands",
            "items": [
                {"type": "paragraph", "text": "Enable pnpm if needed:"},
                {"type": "code", "text": "corepack enable"},
                {"type": "paragraph", "text": "Install the project:"},
                {"type": "code", "text": "pnpm install"},
                {"type": "paragraph", "text": "Sign in to Codex:"},
                {"type": "code", "text": "codex login --device-auth"},
                {"type": "paragraph", "text": "Start the app:"},
                {"type": "code", "text": "pnpm dev"},
                {
                    "type": "paragraph",
                    "text": "Open the app in your browser using the local URL shown in the terminal. It will usually be:",
                },
                {"type": "code", "text": "http://localhost:5173"},
            ],
        },
        {
            "heading": "Session 1 Tasks",
            "items": [
                {
                    "type": "paragraph",
                    "text": "Session 1 is for small, beginner-friendly changes. Focus on getting something visible working without building the full API feature yet.",
                }
            ],
        },
        {
            "heading": "Task 1: Change the background colour",
            "items": [
                {"type": "paragraph", "text": "Use Tailwind classes in JSX."},
                {
                    "type": "paragraph",
                    "text": "Look in src/App.tsx for className values such as:",
                },
                {
                    "type": "code",
                    "text": '<div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">',
                },
                {
                    "type": "paragraph",
                    "text": "You can change bg-slate-100 to another Tailwind colour, for example:",
                },
                {
                    "type": "code",
                    "text": '<div className="flex min-h-screen flex-col bg-amber-50 text-slate-900">',
                },
            ],
        },
        {
            "heading": "Task 2: Create the list page and route",
            "items": [
                {"type": "paragraph", "text": "Create a new page file in src/pages/."},
                {"type": "bullet", "text": "PokemonPage.tsx"},
                {"type": "bullet", "text": "FilmsPage.tsx"},
                {"type": "paragraph", "text": "Starter example:"},
                {
                    "type": "code",
                    "text": """export function PokemonPage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-4">
      <h1 className="text-3xl font-bold text-slate-900">Pokemon</h1>
      <p className="text-slate-700">This page will show a list of Pokemon.</p>
    </section>
  )
}""",
                },
                {"type": "paragraph", "text": "Then import it into src/App.tsx and add a route."},
                {"type": "code", "text": "import { PokemonPage } from './pages/PokemonPage'"},
                {"type": "code", "text": '<Route path="/pokemon" element={<PokemonPage />} />'},
                {"type": "bullet", "text": "Use the same pattern for a films page."},
                {"type": "bullet", "text": "page: FilmsPage.tsx"},
                {"type": "bullet", "text": "route: /films"},
                {
                    "type": "paragraph",
                    "text": "The page only needs a heading and a short paragraph for Session 1.",
                },
            ],
        },
        {
            "heading": "Task 3: Add a navbar link to the list page",
            "items": [
                {"type": "paragraph", "text": "Open src/components/Navbar.tsx."},
                {"type": "paragraph", "text": "Add another NavLink like the others:"},
                {
                    "type": "code",
                    "text": """<NavLink
  to="/pokemon"
  className={({ isActive }) =>
    isActive ? `${navBaseClass} bg-blue-100 text-blue-700` : navBaseClass
  }
>
  Pokemon
</NavLink>""",
                },
                {
                    "type": "paragraph",
                    "text": "For a films page, change the path and text to match your route.",
                },
            ],
        },
        {
            "heading": "Task 4: Update the home page text",
            "items": [
                {
                    "type": "paragraph",
                    "text": "The home page is inside src/App.tsx in the HomePage function.",
                },
                {"type": "paragraph", "text": "You can change text such as:"},
                {
                    "type": "code",
                    "text": """<span className="text-xl font-semibold uppercase tracking-[0.24em] text-slate-900">
  DB Work Experience
</span>""",
                },
                {"type": "paragraph", "text": "Example changes:"},
                {"type": "bullet", "text": "My Pokemon Project"},
                {"type": "bullet", "text": "My Film Finder"},
            ],
        },
        {
            "heading": "Task 5: Change the browser tab title",
            "items": [
                {"type": "paragraph", "text": "Open index.html."},
                {"type": "paragraph", "text": "Look for the <title> tag:"},
                {"type": "code", "text": "<title>DB Work Experience Starter</title>"},
                {
                    "type": "paragraph",
                    "text": "Change it to something that matches your project, for example:",
                },
                {"type": "code", "text": "<title>My Pokemon Project</title>"},
            ],
        },
        {
            "heading": "Task 6: Add a button on the home page",
            "items": [
                {
                    "type": "paragraph",
                    "text": "Still in src/App.tsx, add a link or button on the home page that sends the user to your list page.",
                },
                {
                    "type": "paragraph",
                    "text": "A simple option is a Link from react-router-dom.",
                },
                {"type": "paragraph", "text": "First, make sure Link is imported:"},
                {
                    "type": "code",
                    "text": "import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'",
                },
                {"type": "paragraph", "text": "Then add something like this inside HomePage:"},
                {
                    "type": "code",
                    "text": """<Link
  to="/pokemon"
  className="inline-flex rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
>
  Open Pokemon List
</Link>""",
                },
                {
                    "type": "paragraph",
                    "text": "For a films page, update the path and button text to match your route.",
                },
            ],
        },
    ],
}


def wrap_code(text: str, font_name: str, font_size: float, max_width: float) -> str:
    wrapped_lines: list[str] = []
    for raw_line in text.splitlines():
        line = raw_line.rstrip("\n")
        if not line:
            wrapped_lines.append(" ")
            continue

        indent_match = re.match(r"\s*", line)
        indent = indent_match.group(0)
        content = line[len(indent) :]

        if not content:
            wrapped_lines.append(indent or " ")
            continue

        words = content.split(" ")
        current = indent
        continuation_indent = indent + "  "

        for word in words:
            if not word:
                candidate = current + " "
            elif current.strip():
                candidate = f"{current} {word}"
            else:
                candidate = f"{current}{word}"

            if stringWidth(candidate, font_name, font_size) <= max_width:
                current = candidate
                continue

            if current.strip():
                wrapped_lines.append(current)
                current = f"{continuation_indent}{word}" if word else continuation_indent
                continue

            segment = word
            active_indent = current
            while stringWidth(f"{active_indent}{segment}", font_name, font_size) > max_width and len(segment) > 1:
                cut = len(segment) - 1
                while cut > 1 and stringWidth(f'{active_indent}{segment[:cut]}', font_name, font_size) > max_width:
                    cut -= 1
                wrapped_lines.append(f"{active_indent}{segment[:cut]}")
                active_indent = continuation_indent
                segment = segment[cut:]
            current = f"{active_indent}{segment}"

        wrapped_lines.append(current)
    return "\n".join(wrapped_lines)


def highlight_code(text: str) -> str:
    escaped = html.escape(text)
    escaped = re.sub(
        r"(&quot;.*?&quot;|&#x27;.*?&#x27;)",
        r'<font color="#0F766E">\1</font>',
        escaped,
    )
    escaped = re.sub(
        r"\b(import|export|return|const|function|className|to|element|path)\b",
        r'<font color="#7C3AED">\1</font>',
        escaped,
    )
    escaped = re.sub(
        r"(&lt;/?[A-Za-z][^&]*?&gt;)",
        r'<font color="#1D4ED8">\1</font>',
        escaped,
    )
    return escaped


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#CBD5E1"))
    canvas.setLineWidth(0.6)
    canvas.line(doc.leftMargin, doc.height + doc.topMargin + 6, doc.pagesize[0] - doc.rightMargin, doc.height + doc.topMargin + 6)
    canvas.setFont("Helvetica-Bold", 9)
    canvas.setFillColor(colors.HexColor("#0F172A"))
    canvas.drawString(doc.leftMargin, doc.pagesize[1] - 12 * mm, "DB Work Experience")
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#475569"))
    canvas.drawRightString(doc.pagesize[0] - doc.rightMargin, 10 * mm, f"Session 1 Cheatsheet  |  Page {doc.page}")
    canvas.restoreState()


def build_pdf() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)

    page_width, page_height = landscape(A4)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=(page_width, page_height),
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=16 * mm,
        bottomMargin=14 * mm,
        title=CHEATSHEET["title"],
        author="OpenAI Codex",
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "Title",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=21,
        leading=25,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#0F172A"),
        spaceAfter=4,
    )
    subtitle_style = ParagraphStyle(
        "Subtitle",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9,
        leading=11,
        alignment=TA_CENTER,
        textColor=colors.HexColor("#475569"),
        spaceAfter=10,
    )
    heading_style = ParagraphStyle(
        "Heading",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=15,
        textColor=colors.HexColor("#0F172A"),
        spaceBefore=6,
        spaceAfter=5,
    )
    body_style = ParagraphStyle(
        "Body",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#1E293B"),
        spaceAfter=4,
    )
    bullet_style = ParagraphStyle(
        "Bullet",
        parent=body_style,
        leftIndent=12,
        firstLineIndent=-8,
        bulletIndent=0,
        spaceAfter=2,
    )
    code_font = "Courier"
    code_size = 8
    code_width = doc.width - 20 * mm

    story = [
        Paragraph(CHEATSHEET["title"], title_style),
        Paragraph(CHEATSHEET["subtitle"], subtitle_style),
    ]

    for index, section in enumerate(CHEATSHEET["sections"]):
        if index in {4}:
            story.append(PageBreak())
        story.append(Paragraph(section["heading"], heading_style))
        for item in section["items"]:
            item_type = item["type"]
            text = item["text"]
            if item_type == "paragraph":
                story.append(Paragraph(html.escape(text), body_style))
            elif item_type == "bullet":
                story.append(Paragraph(html.escape(text), bullet_style, bulletText="•"))
            elif item_type == "code":
                wrapped = wrap_code(text, code_font, code_size, code_width)
                code_style = ParagraphStyle(
                    "Code",
                    fontName=code_font,
                    fontSize=code_size,
                    leading=9.5,
                    leftIndent=0,
                    rightIndent=0,
                    textColor=colors.HexColor("#0F172A"),
                    spaceBefore=0,
                    spaceAfter=0,
                )
                block = Table(
                    [[XPreformatted(highlight_code(wrapped), code_style)]],
                    colWidths=[doc.width],
                )
                block.setStyle(
                    TableStyle(
                        [
                            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#DBEAFE")),
                            ("BOX", (0, 0), (-1, -1), 0.9, colors.HexColor("#60A5FA")),
                            ("LINEBEFORE", (0, 0), (0, -1), 3, colors.HexColor("#2563EB")),
                            ("LEFTPADDING", (0, 0), (-1, -1), 10),
                            ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                            ("TOPPADDING", (0, 0), (-1, -1), 8),
                            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                        ]
                    )
                )
                story.append(block)
                story.append(Spacer(1, 6))
            else:
                raise ValueError(f"Unsupported item type: {item_type}")
        story.append(Spacer(1, 2))

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)


if __name__ == "__main__":
    build_pdf()
