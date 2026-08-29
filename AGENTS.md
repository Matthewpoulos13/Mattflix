# Mattflix — Base44 dev environment

## What this is
A single-page static streaming-service demo: `index.html`, `script.js`, `styles.css` plus local image/video assets. No build step, no backend, no external services, no secrets.

## Running it
`docker compose -f docker-compose.base44.yml up -d` serves the static files via nginx:alpine on host port 3000. The repo is bind-mounted read-only into the nginx web root, so edits to any source file appear on browser refresh (no rebuild/restart needed).

## Verifying it works
- `curl -sf -H "Host: external-preview.example.com" http://localhost:3000/` returns the Mattflix HTML.
- The preview should show the hero banner, content rows (Continue Watching, Popular, New Releases, My List), and the search/modal/player interactions are all client-side.
