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
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
    XPreformatted,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "docs" / "session-1-starter-cheatsheet-print.pdf"
SOURCE = ROOT / "docs" / "session-1-starter-cheatsheet.md"


def load_cheatsheet() -> dict[str, object]:
    lines = SOURCE.read_text(encoding="utf-8").splitlines()
    title = "DB Work Experience Session 1 Cheatsheet"
    subtitle = "Volunteer handout for printing"
    sections: list[dict[str, object]] = []
    current_section: dict[str, object] | None = None
    current_paragraph: list[str] = []
    index = 0

    def flush_paragraph() -> None:
        nonlocal current_paragraph
        if current_section is None or not current_paragraph:
            current_paragraph = []
            return
        text = " ".join(part.strip() for part in current_paragraph).strip()
        if text:
            current_section["items"].append({"type": "paragraph", "text": text})
        current_paragraph = []

    while index < len(lines):
        line = lines[index]
        stripped = line.strip()

        if stripped.startswith("# "):
            title = stripped[2:].strip()
            index += 1
            continue

        if stripped.startswith("## "):
            flush_paragraph()
            current_section = {"heading": stripped[3:].strip(), "items": []}
            sections.append(current_section)
            index += 1
            continue

        if current_section is None:
            index += 1
            continue

        if stripped.startswith("```"):
            flush_paragraph()
            code_lines: list[str] = []
            index += 1
            while index < len(lines) and not lines[index].strip().startswith("```"):
                code_lines.append(lines[index])
                index += 1
            current_section["items"].append({"type": "code", "text": "\n".join(code_lines)})
            index += 1
            continue

        if stripped.startswith("- "):
            flush_paragraph()
            current_section["items"].append({"type": "bullet", "text": stripped[2:].strip()})
            index += 1
            continue

        if stripped:
            current_paragraph.append(stripped)
        else:
            flush_paragraph()

        index += 1

    flush_paragraph()

    return {"title": title, "subtitle": subtitle, "sections": sections}


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
    cheatsheet = load_cheatsheet()

    page_width, page_height = landscape(A4)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=(page_width, page_height),
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=16 * mm,
        bottomMargin=14 * mm,
        title=cheatsheet["title"],
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
        Paragraph(cheatsheet["title"], title_style),
        Paragraph(cheatsheet["subtitle"], subtitle_style),
    ]

    for section in cheatsheet["sections"]:
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
