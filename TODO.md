# Rebranding to Socialobby - Task Breakdown

## Phase 1: Update Package Files
- [x] Update root package.json: Change name from "simplebook" to "socialobby"
- [x] Update backend/package.json: Change name to "socialobby-backend", update description and keywords to reflect social media focus

## Phase 2: Update Backend Configuration
- [x] Update backend/server.js: Change MongoDB URI to 'socialobby', update health message to "Socialobby API is running!"

## Phase 3: Update Documentation
- [x] Update README.md: Change title to "Socialobby", update descriptions to emphasize social media features, change project structure
- [x] Update docs/database-schema.md: Change title and references to "Socialobby"
- [x] Update docs/wireframes.md: Change title and branding throughout

## Phase 4: Regenerate Dependencies
- [x] Regenerate package-lock.json after package.json changes

## Phase 5: GitHub Repository Management
- [x] Check if GitHub CLI (gh) is installed - Not found, installation attempted but failed
- [ ] Install gh manually: Download from https://cli.github.com/ and add to PATH
- [ ] Rename GitHub repository to "socialobby" using: gh repo rename socialobby

## Phase 6: Commit Changes
- [x] Stage all modified files
- [x] Commit with message "Rebrand project from blogging-platform/SimpleBook to Socialobby"
- [x] Push changes to remote repository (requires authentication - user needs to handle GitHub credentials)

## Phase 7: GitHub Repository Rename (Manual)
- [ ] Install GitHub CLI manually from https://cli.github.com/
- [ ] Authenticate with GitHub: gh auth login
- [ ] Rename repository: gh repo rename socialobby

## Phase 8: Local Folder Rename (User Action)
- [ ] Rename local folder from "blogging-platform" to "socialobby" if desired
