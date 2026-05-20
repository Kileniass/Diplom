"""
Убирает сплошную чёрную подложку по краям PNG (flood fill от границ).
Запуск из корня проекта: python tools/knockout_logo_edges.py
"""
from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

try:
    from PIL import Image
except ImportError as e:
    print("Нужен Pillow: pip install Pillow", file=sys.stderr)
    raise SystemExit(1) from e


def knockout_edge_dark(
    path_in: Path,
    path_out: Path,
    *,
    thresh: int = 42,
) -> None:
    img = Image.open(path_in).convert("RGBA")
    w, h = img.size
    px = img.load()

    def is_dark(x: int, y: int) -> bool:
        r, g, b, _a = px[x, y]
        return r <= thresh and g <= thresh and b <= thresh

    q: deque[tuple[int, int]] = deque()
    for x in range(w):
        q.append((x, 0))
        q.append((x, h - 1))
    for y in range(h):
        q.append((0, y))
        q.append((w - 1, y))

    visited: set[tuple[int, int]] = set()
    while q:
        x, y = q.popleft()
        if x < 0 or x >= w or y < 0 or y >= h or (x, y) in visited:
            continue
        if not is_dark(x, y):
            continue
        visited.add((x, y))
        r, g, b, _a = px[x, y]
        px[x, y] = (r, g, b, 0)
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            q.append((nx, ny))

    path_out.parent.mkdir(parents=True, exist_ok=True)
    img.save(path_out, optimize=True)
    print(f"OK: {path_in} -> {path_out} (прозрачных пикселей с краёв: {len(visited)})")


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    logo = root / "logo-probro.png"
    if not logo.is_file():
        print(f"Не найден файл: {logo}", file=sys.stderr)
        raise SystemExit(1)
    backup = root / "logo-probro.backup.png"
    if not backup.is_file():
        backup.write_bytes(logo.read_bytes())
        print(f"Резервная копия: {backup}")
    knockout_edge_dark(logo, logo, thresh=42)


if __name__ == "__main__":
    main()
