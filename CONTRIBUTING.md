# Contributing to Hello Vue Developer

Thank you for your interest in contributing to the **Hello Vue Developer** project! This document outlines the standards and workflows we follow to maintain high code quality and architectural integrity.

## Table of Contents
- [Architectural Principles](#architectural-principles)
    - [Domain-Driven Design (DDD)](#domain-driven-design-ddd)
    - [Object-Oriented Programming (OOP)](#object-oriented-programming-oop)
    - [Vue 3.5 & Composition API](#vue-35--composition-api)
- [Development Workflow](#development-workflow)
    - [Git Flow](#git-flow)
    - [Conventional Commits](#conventional-commits)
    - [Semantic Versioning](#semantic-versioning)
- [Coding Standards](#coding-standards)
- [Documentation](#documentation)

---

## Architectural Principles

### Domain-Driven Design (DDD)
We follow a layered architecture organized by Bounded Contexts.
- **Greetings Context**: Contains the core business logic (`Developer` entity, `DeveloperId` value object).
- **Shared Kernel**: Contains cross-cutting value objects and utilities (`PersonName`, UUID generation).
- **Layers**: Maintain a strict separation between the **Domain Layer** (pure JavaScript, no Vue import) and the **Presentation Layer** (`.vue` components).

### Object-Oriented Programming (OOP)
- **Encapsulation**: internal fields use the `_` prefix, not native `#` private fields, because Vue's Proxy-based reactivity cannot read `#` fields through a wrapped instance (see `docs/adrs.md`, ADR-0003). Access still goes through getters.
- **Invariants**: value objects validate themselves in their constructor (`DeveloperId`) or expose an `isValid()` check (`PersonName`); `Developer` only assigns an identity once its `PersonName` is valid.
- **Identity**: entities are identified by a `DeveloperId` value object and compared with `.equals()`, never by reference or raw string.

### Vue 3.5 & Composition API
- **`<script setup>`** for every component.
- **Reactive props destructuring**: destructure `defineProps()` directly (`const { x } = defineProps({ ... })`); do not wrap it in `toRefs()`.
- **Domain entities as props**: a component that needs a `Developer` receives the entity itself, not its raw fields.

---

## Development Workflow

### Git Flow
We follow a simplified Git Flow model:
- `main`: Reflects the latest stable production state.
- `develop`: The main branch for ongoing development.
- `feature/*`: Short-lived branches for specific features or bug fixes.
- `release/*`: Preparation for new production releases.

### Conventional Commits
Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification, lowercase, with a period at the end:
`type(scope): description.`

**Types:**
- `feat`: A new feature.
- `fix`: A bug fix.
- `docs`: Documentation only changes.
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `test`: Adding missing tests or correcting existing tests.
- `chore`: Changes to the build process or auxiliary tools and libraries.

**Scopes:** the file, class, or component touched, for example `developer`, `developer-registration`, `developer-greeting`, `developer-count-show`, `app`, `docs`.

Example: `feat(developer): add developer entity.`

### Semantic Versioning
The project adheres to [Semantic Versioning (SemVer)](https://semver.org/): `MAJOR.MINOR.PATCH`.
- **MAJOR**: Incompatible API changes.
- **MINOR**: Add functionality in a backwards-compatible manner.
- **PATCH**: Backwards-compatible bug fixes.

---

## Coding Standards
- **Constants**: `UPPER_SNAKE_CASE` for module-level constants.
- **Variables/Methods**: `lowerCamelCase`.
- **Classes**: `UpperCamelCase`.
- File names: `lower-kebab-case`, with a role suffix for domain files (`.entity.js`, `.value-object.js`).

---

## Documentation
- **Architecture Decisions**: New significant architectural choices must be documented in `docs/adrs.md`.
- **Traceability**: Ensure functional requirements are mapped in the Requirement Traceability Matrix (RTM) within `docs/user-stories.md`.
- **Changelog**: Update `CHANGELOG.md` for every release following the "Keep a Changelog" format.