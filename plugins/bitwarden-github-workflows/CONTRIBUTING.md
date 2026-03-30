# Contributing to Bitwarden GitHub Workflows Plugin

## Plugin Updates

**Frequency**: As needed when bwwl rules change or new workflow conventions are adopted

**Process**:

1. Update `skills/lint-workflows/SKILL.md` with new rules or fix instructions
2. Test against representative repositories with `.github/workflows/` directories
3. Create pull request for review
4. Merge and publish to marketplace

## Quality Checks

Before merging changes:

- [ ] Skill follows Claude Code skill conventions
- [ ] YAML frontmatter is valid (name, description)
- [ ] Tested against actual workflow files with known errors
- [ ] No regression in linting or fix behavior
- [ ] Version bumped and CHANGELOG.md updated
