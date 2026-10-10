#!/usr/bin/env python3
"""Regenerate the project social cards from article front matter.

The cards are deliberately minimal — site eyebrow, article title, site domain —
so they cannot drift out of date: everything on the card comes from the article
itself. Fonts are taken from the site's own @fontsource packages so the cards
match the site typography.

Usage:
    python3 scripts/make_og_cards.py            # every article
    python3 scripts/make_og_cards.py fsae-cooling pipe-flow-sizing
"""

from __future__ import annotations

import re
import sys
import tempfile
from pathlib import Path

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

SITE = Path(__file__).resolve().parents[1]
CONTENT = SITE / "src" / "content" / "projects"
OUTPUT = SITE / "public" / "og" / "projects"
FONTSOURCE = SITE / "node_modules" / "@fontsource"

WIDTH, HEIGHT = 1200, 630
BACKGROUND = "#f5f4ed"
INK = "#141413"
STONE = "#6b6a64"
ACCENT = "#1b365d"
BAR = (68, 62, 73, 568)
TEXT_LEFT = 115
TEXT_RIGHT = 1085
EYEBROW = "BING GAO · ENGINEERING PORTFOLIO"
DOMAIN = "binggao.dev"


def load_font(package: str, file_name: str, size: int) -> ImageFont.FreeTypeFont:
    source = FONTSOURCE / package / "files" / file_name
    if not source.exists():
        raise SystemExit(f"missing font: {source}")
    cache = Path(tempfile.gettempdir()) / "og-fonts"
    cache.mkdir(exist_ok=True)
    ttf = cache / f"{package.replace('/', '-')}-{file_name}".replace(".woff2", ".ttf")
    if not ttf.exists():
        font = TTFont(source)
        font.flavor = None
        font.save(ttf)
    return ImageFont.truetype(str(ttf), size)


def article_title(path: Path) -> str:
    front = path.read_text(encoding="utf-8").split("---", 2)[1]
    match = re.search(r"^title:\s*'(.*)'\s*$", front, re.M)
    if not match:
        raise SystemExit(f"{path.name}: no title in front matter")
    return match.group(1)


def draw_tracked(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str, font: ImageFont.FreeTypeFont, fill: str, tracking: int) -> None:
    x, y = xy
    for char in text:
        draw.text((x, y), char, font=font, fill=fill)
        x += draw.textlength(char, font=font) + tracking


def wrap(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_width: int) -> list[str]:
    lines: list[str] = []
    current = ""
    for word in text.split():
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=font) <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def fit_title(draw: ImageDraw.ImageDraw, text: str) -> tuple[ImageFont.FreeTypeFont, list[str]]:
    for size in (68, 62, 56, 50, 46):
        font = load_font("source-serif-4", "source-serif-4-latin-500-normal.woff2", size)
        lines = wrap(draw, text, font, TEXT_RIGHT - TEXT_LEFT)
        if len(lines) <= 4:
            return font, lines
    return font, lines


def render(title: str, target: Path) -> None:
    image = Image.new("RGB", (WIDTH, HEIGHT), BACKGROUND)
    draw = ImageDraw.Draw(image)
    draw.rectangle(BAR, fill=ACCENT)

    eyebrow_font = load_font("jetbrains-mono", "jetbrains-mono-latin-500-normal.woff2", 18)
    domain_font = load_font("jetbrains-mono", "jetbrains-mono-latin-500-normal.woff2", 18)
    title_font, lines = fit_title(draw, title)

    draw_tracked(draw, (TEXT_LEFT, 96), EYEBROW, eyebrow_font, STONE, 3)
    draw.text((TEXT_LEFT, 522), DOMAIN, font=domain_font, fill=ACCENT)

    line_height = round(title_font.size * 1.16)
    block_height = line_height * len(lines)
    top = 128 + (522 - 40 - 128 - block_height) // 2
    for index, line in enumerate(lines):
        draw.text((TEXT_LEFT - 3, top + index * line_height), line, font=title_font, fill=INK)

    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, format="PNG", optimize=True)


def main() -> int:
    wanted = set(sys.argv[1:])
    articles = sorted(CONTENT.glob("*.md"))
    if wanted:
        articles = [path for path in articles if path.stem in wanted]
        missing = wanted - {path.stem for path in articles}
        if missing:
            raise SystemExit(f"unknown articles: {sorted(missing)}")
    for path in articles:
        target = OUTPUT / f"{path.stem}.png"
        render(article_title(path), target)
        print(f"{path.stem:46} {target.stat().st_size // 1024:4} KB")
    print(f"{len(articles)} card(s) written to {OUTPUT.relative_to(SITE)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
