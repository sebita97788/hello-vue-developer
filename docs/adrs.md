# Architecture Decision Records

# ADR-0001: Bounded Context Layout (DDD-lite)

**Status:** Accepted

## Context

A standard flat structure (all components and logic in one folder) works for a handful of files, but it hides which code owns which concept and invites tight coupling as the project grows.

## Decision Drivers

- Domain logic (what a valid name is, when a developer counts as registered) should live apart from the Vue components that present it.
- A concept used by more than one future context (a person's name) should not live inside the context that happens to use it first.

## Considered Options

1. A `greetings` bounded context (`domain` + `presentation`) plus a `shared` kernel for cross-cutting value objects *(Chosen)*
2. A single flat `src/components` and `src/models` split, no bounded-context boundary
3. One folder per Vue component, domain logic inlined in each `<script setup>`

## Decision

Two areas: **`src/greetings`** is the bounded context, with `domain/model` (the `Developer` entity and `DeveloperId` value object) and `presentation/components` (the three `.vue` components). **`src/shared`** is the shared kernel: `domain/model` holds `PersonName` (usable by any future context that deals with people) and `domain/uuid.js` holds identity generation.

## Consequences

**Positive:**
- `Developer`, `DeveloperId`, and `PersonName` are plain JavaScript, testable with no Vue runtime.
- A second bounded context could reuse `PersonName` and the `uuid` utility without importing anything from `greetings`.

**Negative:**
- More folders than a two-component app strictly needs. The layout pays off as soon as a second context or a second entity appears.

---

# ADR-0002: Vue 3.5 Reactive Props Destructuring

**Status:** Accepted

## Context

Vue 3.5 lets `<script setup>` destructure `defineProps()` directly (`const { developer } = defineProps({ developer: { type: Developer, required: true } })`) and keep each destructured binding reactive, tracking it like `props.developer` would. Earlier Vue versions required either `props.x` everywhere or `toRefs(defineProps(...))` to keep a destructured prop reactive.

## Decision Drivers

- Reading `developer` directly, instead of `props.developer`, is closer to plain JavaScript and easier to read in a `computed()`.
- The project targets Vue 3.5+, so the newer syntax is available everywhere.

## Considered Options

1. Reactive props destructuring, `const { x } = defineProps({ ... })` *(Chosen)*
2. `const props = defineProps({ ... })`, then `props.x` throughout
3. `const props = defineProps({ ... })` then `const { x } = toRefs(props)`

## Decision

Every component destructures `defineProps()` directly. `DeveloperCountShow` and `DeveloperGreeting` use this form; no component wraps `defineProps()` in `toRefs()`.

## Consequences

**Positive:**
- Less ceremony than `toRefs()`, and no risk of destructuring away reactivity by mistake, which was a real footgun in older Vue.

**Negative:**
- Requires Vue 3.5+; a project pinned to an older 3.x release would need `toRefs()` instead.

---

# ADR-0003: Semi-Private Fields (`_`) Instead of Native Private Fields (`#`)

**Status:** Accepted

## Context

Native JavaScript private fields (`#field`) give real runtime encapsulation and are the convention in this course's other JavaScript projects. Vue 3's reactivity, though, wraps objects passed into `ref()` or `reactive()` in a `Proxy`. A method that reads `this.#field` throws `TypeError: Cannot read private member from an object whose class did not declare it` when `this` is that `Proxy`, because a private-field read is a direct internal-slot check against the exact receiver, and the receiver Vue hands back is the Proxy, not the original instance.

## Decision Drivers

- Domain entities (`Developer`) and value objects (`DeveloperId`, `PersonName`) get stored in `ref()`s and passed as component props, so they are exactly the objects Vue's reactivity wraps.
- Encapsulation should not come at the cost of the app crashing the first time a reactive `Developer` calls one of its own getters.

## Considered Options

1. `_field` convention (not enforced by the language, but invisible to the Proxy machinery) *(Chosen)*
2. Native `#field` private fields
3. Closures over local variables instead of a class

## Decision

Every internal field on `Developer`, `DeveloperId`, and `PersonName` uses the `_` prefix (`_id`, `_name`, `_value`, `_firstName`, `_lastName`), never `#`. Access is still funneled through getters; nothing outside the class reads `_field` directly, `_` marks it internal by convention rather than by the runtime.

## Consequences

**Positive:**
- These objects work correctly wrapped in Vue's reactivity, as `ref()` values and as component props, with no special-casing.
- The same objects would also work unwrapped (a plain `new Developer(...)` outside of Vue), so the domain layer has no hidden Vue dependency.

**Negative:**
- `_field` is reachable at runtime from outside the class (`someDeveloper._name` compiles and runs). Nothing in this codebase does that, but the language does not stop it. For the same reason, this project also skips `Object.freeze(this)` on these objects (used elsewhere in the course's plain-JavaScript projects): freezing is unnecessary extra ceremony here, since nothing mutates a `_field` after construction, and it is left out to keep this one exception to the `#`-fields convention easy to spot.

---

# ADR-0004: Identity as a Value Object (`DeveloperId`)

**Status:** Accepted

## Context

A raw UUID string for identity leads to primitive obsession: nothing stops a `ProductId` string from being passed where a `DeveloperId` is expected, and validation (is this actually a well-formed UUID?) ends up duplicated at every boundary that receives one.

## Decision Drivers

- An identifier should carry its own validation and be a distinct type from every other identifier.
- The identifier should sort and index well if this ever talks to a real datastore.

## Considered Options

1. `DeveloperId` value object wrapping a UUID v7 string, with its own validation *(Chosen)*
2. A raw `string` field on `Developer`
3. A numeric auto-increment counter

## Decision

`DeveloperId` wraps a `string`, validated in its constructor with `isValidUUID()` (checks both that it parses as a UUID and that it is version 7). `DeveloperId.build()` is the only way to mint a new one, it generates via `generateUUID()` in the shared kernel. `Developer` holds a `DeveloperId | null`, never a bare string.

## Consequences

**Positive:**
- `new DeveloperId('not-a-uuid')` throws immediately, at the boundary, instead of a malformed ID surfacing later.
- The UUID version (currently v7, time-ordered) is decided in one file (`shared/domain/uuid.js`) and can change without touching `DeveloperId` or `Developer`.

**Negative:**
- Comparing two IDs needs `.equals()` (or `.value`), not `===`, since they are objects, not primitives.

---

# ADR-0005: Both Names Required to Register

**Status:** Accepted

## Context

A `Developer` could, in principle, be considered registered with just a first name, or with any non-empty input. The business rule for this project's user stories is stricter: registration, the greeting, and the count all depend on one consistent definition of "has a real name."

## Decision Drivers

- The greeting, the running count, and the identity assignment must all agree on what counts as a registered developer, one rule, checked once.
- Partial input (a first name with no last name) is common while a visitor is still typing, and must not be treated as a completed registration.

## Considered Options

1. `PersonName.isValid()` requires both first and last name to be non-blank after trimming; `Developer` only assigns a `DeveloperId` when the provided `PersonName` is valid *(Chosen)*
2. Allow registration with just a first name
3. Validate in `DeveloperRegistration` only, and let `Developer` trust whatever it is given

## Decision

`PersonName.isValid()` (an alias for `isFullyNamed()`) is `true` only when both `firstName` and `lastName` have length after trimming. `Developer`'s constructor builds a `PersonName` first, then assigns `_id = providedName.isValid() ? DeveloperId.build() : null`, so an incomplete name never gets an identity. `isRegisterable()` and `isIdentified()` both read off that same one decision.

## Consequences

**Positive:**
- One rule, checked in one place (`PersonName`), decides registration everywhere it matters: the entity's identity, the greeting, and the count.
- A `Developer` built from partial input is a legitimate, harmless object (never null, never throws) that simply is not registerable yet.

**Negative:**
- A visitor who only wants to give a first name has no way to register partially. That is the intended behavior for this course project, not an oversight.