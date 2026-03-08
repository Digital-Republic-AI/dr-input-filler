#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
VERSION=$(cat "$PROJECT_DIR/VERSION" | tr -d '[:space:]')
TAG="v${VERSION}"
ZIP_FILE="$PROJECT_DIR/dist/dr-input-filler-${TAG}.zip"

echo "Preparando release ${TAG}..."

if git rev-parse "$TAG" >/dev/null 2>&1; then
  echo "Erro: tag ${TAG} ja existe. Atualize o VERSION antes de criar uma nova release."
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "Erro: existem mudancas nao commitadas. Faca commit antes de criar a release."
  exit 1
fi

MANIFEST_VERSION=$(grep '"version"' "$PROJECT_DIR/manifest.json" | head -1 | sed 's/.*: *"\(.*\)".*/\1/')
if [ "$MANIFEST_VERSION" != "$VERSION" ]; then
  echo "Erro: VERSION (${VERSION}) diverge do manifest.json (${MANIFEST_VERSION}). Alinhe antes de continuar."
  exit 1
fi

"$SCRIPT_DIR/build-zip.sh"

if [ ! -f "$ZIP_FILE" ]; then
  echo "Erro: zip nao encontrado em ${ZIP_FILE}"
  exit 1
fi

git tag "$TAG"
git push origin main --tags

gh release create "$TAG" "$ZIP_FILE" \
  --title "$TAG" \
  --notes-file "$PROJECT_DIR/CHANGELOG.md"

echo "Release ${TAG} publicada com sucesso!"
