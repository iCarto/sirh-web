# How documentation is structured

There are two entry points to the project documentation

- README.md. For humans
- AGENTS.md. For agents

These files are small and only the more important things to quick start are written there. But, they point to other document files with extended information.

They are not a full index, just point out to more common needs.

AGENTS.md uses imperative to point the agent to read other documents when need: "agent must read ./docs/contributing/testing.md" when writing tests".

The docs folder is split [by user-type](https://diataxis.fr/complex-hierarchies/#two-dimensional-problems):

- `docs/contributors`. For humans and agents that write code for the project: `testing.md`, `dev_workflow.md`, ... goes here
- `docs/devs`. For those that will use the project programatically in a broad sense. `endpoints.md` could describe the endpoints of the backend for the frontend devs of your team or for integrations. If the app is python lib + cli, the lib api documentation lives here.
- `docs/users`. For those that use the final product. If it's a web app the user guide lives here. If it's a cli the help goes here.
- `docs/rationale`. For explaining the decisions taken when building the project. Technical arquitectural records goes here.

## References

- [Docs or it’s built differenlty — Priming AI with atomic docs](https://scribe.rip/ambient-innovation/docs-or-its-built-differenlty-priming-ai-with-atomic-docs-693e34206727)
- [AGENTS.md and the @ to reference documents](https://franciscopuga.es/blog/2025/12/11/agents-md-and-at-character-to-reference-documents/)
