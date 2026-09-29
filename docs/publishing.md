# Publishing strategy

The public repository mirrors the deployed site: everything tracked on `main` either ships to
`binggao.dev` or is required to build and verify it. Nothing else is published.

- `main`: the public GitHub branch and the only maintained line. It keeps the full publishable history for site content, UI changes, and deployment configuration.
- Private material lives outside this repository. The former private `work` branch is archived offline and is no longer maintained.

## What belongs on `main`

Publish only what the deployed site needs:

- `site/` — the Astro site, deployed public assets, and the English pages that are served.
- `site/src/content/projects/` — English documents loaded by Astro and deployed as routes.
- Build and deployment configuration required to reproduce the deployed output.
- Verification scripts that gate the build.
- `README.md` — public project overview.
- `LICENSE` — public license.
- `.github/` — public CI or workflow configuration required for the public repository.

## What stays out of this repository

Keep local or private material out of `main`:

- `site/src/content/projects-cn/` — Chinese source documents. They are source material for a
  language the site does not serve, so they are never tracked on `main`.
- `design/` — prototypes and visual experiments.
- `docs/` — working notes, strategy, and internal process documents.
- `research/` — reference analysis and investigations.
- `projects/` — numerical projects and evidence sources not needed by the public site.
- Private automation tooling, prompts, and experiment records.
- Local PM2, debug, cache, and machine-specific configuration.

## Daily workflow

1. Commit publishable article edits, UI changes, and deployment configuration as separate commits on `main`.
2. Never add Chinese source documents, or any other undeployed content set, to `main`.
3. Keep private research, experiments, and internal tooling outside this repository.
4. Push `main` without squashing or rewriting its shared history.

## Rules

- Do not create or push private branches in this repository.
- Do not include private tooling, private notes, or non-public research sources in `main`.
- The public repository must not serve content the deployed site does not publish.
- Do not squash or rewrite shared `main` history; article, UI, and deployment commits remain individually visible.

## Current branch layout

- `main` — public site source and publishable development history; pushed to `origin/main`.
