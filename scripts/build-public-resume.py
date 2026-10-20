"""Build the public resume PDF from the markdown source, without a phone number."""

import re
from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

SOURCE = Path(r"C:\Users\Andrew\Downloads\Andrew-Oakeson-Senior-Software-Engineer-Resume.md")
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "andrew-oakeson-resume.pdf"
PHONE = re.compile(r"801[-.\s]?205[-.\s]?6720")


def clean(text: str) -> str:
    text = PHONE.sub("", text)
    text = text.replace("|  |", "|")
    text = re.sub(r"\s+\|", " |", text)
    text = re.sub(r"\|\s+\|", "|", text)
    text = text.strip(" |")
    text = (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    return text


def build() -> None:
    raw = SOURCE.read_text(encoding="utf-8")
    if PHONE.search(raw) is None:
        raise SystemExit("Source resume no longer contains the expected phone number.")

    name = ParagraphStyle(
        "name",
        fontName="Times-Bold",
        fontSize=16,
        leading=18,
        textColor="#17202a",
        spaceAfter=2,
    )
    subtitle = ParagraphStyle(
        "subtitle",
        fontName="Times-Roman",
        fontSize=9,
        leading=12,
        textColor="#17202a",
        spaceAfter=1,
    )
    section = ParagraphStyle(
        "section",
        fontName="Times-Bold",
        fontSize=11,
        leading=13,
        textColor="#17202a",
        spaceBefore=8,
        spaceAfter=3,
        borderPadding=0,
    )
    job = ParagraphStyle(
        "job",
        fontName="Times-Bold",
        fontSize=9.5,
        leading=12,
        textColor="#17202a",
        spaceBefore=5,
        spaceAfter=1,
    )
    body = ParagraphStyle(
        "body",
        fontName="Times-Roman",
        fontSize=8.5,
        leading=11,
        textColor="#17202a",
        spaceAfter=2,
    )
    bullet_style = ParagraphStyle(
        "bullet",
        parent=body,
        leftIndent=0,
        spaceAfter=1,
    )

    story = []
    bullets: list[Paragraph] = []

    def flush_bullets() -> None:
        if not bullets:
            return
        story.append(
            ListFlowable(
                [ListItem(item, leftIndent=10, bulletColor="#17202a") for item in bullets],
                bulletType="bullet",
                start="-",
                leftIndent=12,
                bulletFontName="Times-Roman",
                bulletFontSize=8,
                spaceBefore=0,
                spaceAfter=2,
            )
        )
        bullets.clear()

    for line in raw.splitlines():
        stripped = line.strip()
        if not stripped:
            flush_bullets()
            continue
        if stripped.startswith("# "):
            flush_bullets()
            story.append(Paragraph(clean(stripped[2:]), name))
            continue
        if stripped.startswith("## "):
            flush_bullets()
            story.append(Paragraph(clean(stripped[3:]).upper(), section))
            continue
        if stripped.startswith("### "):
            flush_bullets()
            story.append(Paragraph(clean(stripped[4:]), job))
            continue
        if stripped.startswith("- "):
            bullets.append(Paragraph(clean(stripped[2:]), bullet_style))
            continue
        flush_bullets()
        story.append(Paragraph(clean(stripped), subtitle if len(story) < 4 else body))

    flush_bullets()

    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=letter,
        leftMargin=0.65 * inch,
        rightMargin=0.65 * inch,
        topMargin=0.55 * inch,
        bottomMargin=0.5 * inch,
        title="Andrew Oakeson, Senior Software Engineer",
        author="Andrew Oakeson",
    )
    doc.build(story)


if __name__ == "__main__":
    build()
