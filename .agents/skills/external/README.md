# Tier 2 External Skills Directory

This directory is designated for dynamically installed external design and execution skills (e.g., `uiux-pro-max`, `frontend-design`, `prototype`, `web-design-guidelines`) installed via `find-skills`.

## Management Rules
1. **Read-Only for Core Skills:** Core skills (`ai-ux-system`) read configurations and templates from here but never write to this folder.
2. **Dynamic Installation:** Only `find-skills` installs/updates files in this directory.
3. **Core Authority Override:** Any code, layout, or style suggested by external skills in this directory must pass the Core Authority Filters (Accessibility, Spacing Tokens, Indian UI Spacing) before output.
