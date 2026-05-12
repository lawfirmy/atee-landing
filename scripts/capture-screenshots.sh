#!/bin/bash
cd "$(dirname "$0")/.."
OUTDIR="public/portfolio"

declare -A SERVICES
SERVICES=(
  ["bnbtips"]="https://bnbtips.co.kr"
  ["gonggoya"]="https://gonggoya.com"
  ["mooagent"]="https://mooagent.com"
  ["pactery"]="https://pactery.app"
  ["booboo2"]="https://booboo2.com"
  ["okpat"]="https://okpatent.co.kr"
  ["rework"]="https://rework.kr"
  ["absynote"]="https://absynote.com"
)

for slug in "${!SERVICES[@]}"; do
  url="${SERVICES[$slug]}"
  echo "Capturing $slug ($url)..."
  npx playwright screenshot --viewport-size="1280,800" --wait-for-timeout=3000 "$url" "$OUTDIR/$slug.png" 2>&1 || echo "  FAILED: $slug"
done

echo "Done!"
