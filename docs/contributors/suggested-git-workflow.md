# Suggested git workflow

This is a theoric workflow that we are no really following

## Branches and Tags

- `main`. principal branch. Code deployed in production. Only maintainers push here.
- `development`. PR and development goes here. Only maintainers push here. Start your feature branch from here. After a feature is tested in staging is integrated here. Commits can be rewrited with `rebase -i` before the push
- `staging`. Code deployed in staging (pre production). This branch can be rewrited with `push -f` and `rebase -i`.
- `<xxxx>_<feature>`. Feature branches started from `development`. Can be rewrited with `push -f` and `rebase -i`

Each new deployed version should be tagged with `"${VERSION}"`

## Git Workflow for developing a feature

When you start a new feature.

```bash
git checkout main
git branch -D staging
# git branch -D <other_branches_not_needed>
git pull --rebase
git pull --rebase origin main
git pull --rebase origin development
git remote prune origin

git checkout development
git checkout -b <xxxx>_<feature>

# Work on you branch, and before push

git branch -D staging
# git branch -D <other_branches_not_needed>
git pull --rebase
git pull --rebase origin main
git pull --rebase origin development
git remote prune origin

git checkout <xxxx>_<feature>
git rebase development

git push origin -u <xxxx>_<feature>
```

Remember that if someone pushes also to `<xxxx>_<feature>` you must rebase also their changes

```bash
git pull --rebase origin <xxxx>_<feature>
```

The maintainer will merge feature branches onto staging and deploy it. After QA on staging, go back to feature branches to refine the feature. When done, the maintainer merges them into development. Maintainer decides when to squash or how to merge. And deletes remote branches.

When ready for deploy, development is merged into main, the repo is tagged, and code is deployed on production servers.

## Real Workflow

- No using `staging` branch
- Everybody can push to `development`
- Complex features or when comments are requested are pushed to new feature branches and PR or RFC is done.
- Locally everybody should work on branches
- `development` is pushed to `staging` servers, but sometimes, the maintainer deploy from custom branches.
- Production is deployed from `main`
