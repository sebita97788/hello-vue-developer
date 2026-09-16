# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-09-16

### Added
- `greetings` bounded context (`Developer` entity, `DeveloperId` value object) and a `shared` kernel (`PersonName` value object, UUID v7 utility).
- `DeveloperRegistration` component: register with a first and last name, defer with "Later", or clear the form (US001, US004, US005).
- `DeveloperGreeting` component: shows "Welcome Anonymous Developer" by default and a personalized greeting with the developer's ID once a valid name is registered (US002).
- `DeveloperCountShow` component: running count of valid registrations only (US003).
- `docs/user-stories.md` with a Requirement Traceability Matrix, `docs/class-diagram.puml`, `docs/adrs.md`.
- `README.md`, MIT `LICENSE.md`.

### Design notes
- `Developer` only receives a `DeveloperId` once `PersonName.isValid()` holds (both names present), so the presence of an ID marks a registered developer.
- Internal fields use the `_` convention, not native `#` private fields, because Vue 3's Proxy-based reactivity cannot read `#` fields through a wrapped instance (ADR-0003).
- Identifiers are UUID v7 (time-ordered), generated in the shared kernel so the version is decided in one file.