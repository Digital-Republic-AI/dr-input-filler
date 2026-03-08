#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
VERSION=$(cat "$PROJECT_DIR/VERSION" | tr -d '[:space:]')
OUTPUT_DIR="$PROJECT_DIR/dist"
OUTPUT_FILE="$OUTPUT_DIR/dr-input-filler-v${VERSION}.zip"

EXTENSION_FILES=(
  manifest.json
  background.js
  content.js
  utils.js
  popup.html
  popup.js
  popup.css
  options.html
  options.js
  options.css
  images/
)

mkdir -p "$OUTPUT_DIR"
rm -f "$OUTPUT_FILE"

cd "$PROJECT_DIR"
zip -r "$OUTPUT_FILE" "${EXTENSION_FILES[@]}"

echo "Build completo: $OUTPUT_FILE"
