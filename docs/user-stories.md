# User Stories

This document contains the user stories for the Hello Vue Developer application.

## Requirement Traceability Matrix

| User Story | Scenario                                       | Implementation                                                                 |
|------------|-------------------------------------------------|---------------------------------------------------------------------------------|
| US001      | Register with a valid full name                 | `PersonName`, `DeveloperId`, `Developer`, `DeveloperRegistration`               |
| US001      | Reject a spaces-only or partial name             | `PersonName.isValid()`, `DeveloperRegistration` (error message)                 |
| US002      | Greet the last registered developer              | `DeveloperGreeting`, `Developer.fullName`, `Developer.isRegisterable()`         |
| US002      | No greeting before any registration              | `app.vue` (`hasRegistered`)                                                     |
| US003      | Count only valid registrations                   | `Developer.isRegisterable()`, `DeveloperCountShow`, `app.vue` (`developerCount`)|
| US004      | Defer registration with "Later"                  | `DeveloperRegistration.deferRegistration()`, `app.vue` (`resetRegisteredDeveloperInfo`) |
| US005      | Clear the form without changing the greeting     | `DeveloperRegistration.clearFields()`                                          |

## US001: Register a Developer

**As a** developer learning Vue,
**I want** to register with my first and last names,
**so that** I can be recognized as a Vue developer.

**Acceptance Criteria**:
- **Given** no developer is currently registered, **when** a developer provides a valid first name and last name, **then** the system records the developer's details and acknowledges their registration.
- **Given** no developer is currently registered, **when** a developer provides a first name or last name containing only spaces, **then** the system rejects the registration and indicates valid names are required.
- **Given** no developer is currently registered, **when** a developer provides only a first name, **then** the system rejects the registration and indicates both names are required.
- **Given** no developer is currently registered, **when** a developer provides only a last name, **then** the system rejects the registration and indicates both names are required.
- **Given** no developer is currently registered, **when** a developer provides neither first name nor last name, **then** the system rejects the registration and indicates both names are required.

## US002: Greet the Last Registered Developer

**As a** developer learning Vue,
**I want** to be welcomed after registering,
**so that** I feel encouraged to continue exploring Vue.

**Acceptance Criteria**:
- **Given** a developer has registered with valid name details, **when** the system processes the registration, **then** the system greets the developer using their full name.
- **Given** no developer has registered, **when** the system starts, **then** the system does not provide any greeting.
- **Given** a developer was previously greeted, **when** another developer registers with valid names, **then** the system greets the new developer using their full name.

## US003: Track Valid Registrations

**As a** stakeholder monitoring participation,
**I want** to know the number of developers who have registered with valid names,
**so that** I can track engagement accurately.

**Acceptance Criteria**:
- **Given** the system is tracking registered developers, **when** a developer registers with valid name details, **then** the system increments the count of registered developers by one.
- **Given** the system is tracking registered developers, **when** a developer attempts to register with missing or spaces-only names for either field, **then** the system does not increment the count.
- **Given** multiple developers have registered with valid names, **when** a new developer registers with valid names, **then** the system increments the count to reflect all valid registrations.

## US004: Defer Registration

**As a** developer learning Vue,
**I want** to defer registering my details,
**so that** I can explore the application without committing immediately.

**Acceptance Criteria**:
- **Given** the system allows registration, **when** a developer chooses to defer registration, **then** the system clears any current registration details and acknowledges the deferral.
- **Given** a developer was previously registered, **when** a developer chooses to defer registration, **then** the system stops acknowledging the previous registration.
- **Given** the system has deferred a registration, **when** a developer attempts to register later, **then** the system allows a new registration with valid names.

## US005: Clear the Registration Form

**As a** developer learning Vue,
**I want** to clear my input without affecting the current greeting or count,
**so that** I can start over without committing or deferring.

**Acceptance Criteria**:
- **Given** the developer has entered some input and has not yet registered, **when** the developer chooses to clear the input, **then** the input fields are cleared and the greeting remains whatever it was before (anonymous, since no registration occurred).
- **Given** the developer has registered a name and later enters new input without submitting it, **when** the developer chooses to clear the input, **then** the input fields are cleared and the previously registered greeting and count are left untouched.