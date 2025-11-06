Title: chore(seed): add upsert seed script + avoid storing plaintext passwords

Summary

This PR restores a corrupted nested comment controller (previously introduced by an edit) and applies UI/accessibility improvements to header and stories. It also adds a safe database seed script that upserts admin and sample users.

What changed

- Restored `Social-Lobby/backend/controllers/commentController.js` from the clean root copy.
- Improved header and stories UI and accessibility (icon sizing, keyboard handlers, story ring styling).
- Added `backend/scripts/add-users.js` — a safe upsert seed script for admin and sample users.
- Updated `package.json` to include missing dependencies (merged conflict) and installed packages.
- Added `.env.example` to show how to provide passwords for seeding without committing credentials.

How to run the seed script (local dev)

1. Create a `.env` file in the repo root (based on `.env.example`) and set `MONGODB_URI` if needed and any `SEED_PW_*` values you want to control.
2. Install dependencies: `npm install` (already done in CI/workspace).
3. Run the script:

```powershell
node backend/scripts/add-users.js
```

Behavior notes

- The seed script will upsert users by email. For existing users, it will not change passwords unless you set the corresponding `SEED_PW_*` env var. For newly created users, it will use the env password if provided; otherwise it will generate a random password and print it.
- Avoid committing plaintext passwords. Use `.env` (not committed) or CI secrets for automated environments.

Verification performed

- Ran ESLint after restoring controller; parsing errors were resolved.
- Ran the seed script locally; admin accounts were updated and users a/b/c/d were created.
- Verified new users exist in the local MongoDB (script output printed created IDs).

Next steps

- I recommend creating a minimal integration smoke-test for the API endpoints that require authenticated users, and adding a PR reviewer to validate UI changes in the running dev server.
- Optionally create a GitHub Actions workflow that runs the seed script against a disposable test database for integration tests.

