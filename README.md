# Hello Vue Developer (`hello-vue-developer`)

[![Vue Version](https://img.shields.io/badge/vue-3.5.42-4fc08d.svg)](https://vuejs.org/)
[![Vite Version](https://img.shields.io/badge/vite-8.2.2-646cff.svg)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)

## Overview
A Vue.js application demonstrating core development concepts, including component architecture, reactive state management, and Domain-Driven Design (DDD) principles.

**Author**: Web Applications Development Team

---

## Features
- **Developer Registration**: Register with first and last names.
- **Dynamic Greeting**: Personalized welcome messages for registered developers, including unique IDs.
- **Engagement Tracking**: Real-time count of valid registrations.
- **Flexible Workflow**: Option to defer registration, or clear the form without affecting the current greeting.
- **Robust Validation**: Domain-level enforcement of name requirements.

## Technologies Used
- **Framework**: [Vue.js 3.5+](https://vuejs.org/) (Composition API)
- **Build Tool**: [Vite 8+](https://vitejs.dev/)
- **Language**: JavaScript (ESNext)
- **Styling**: Standard CSS (within SFCs)
- **Identity**: [UUID v7](https://github.com/uuidjs/uuid)

## Architecture
The project follows a **Domain-Driven Design (DDD)** inspired structure to separate concerns and ensure maintainability:

- **`src/greetings`**: The primary Bounded Context.
    - **`domain`**: the `Developer` entity and the `DeveloperId` value object.
    - **`presentation`**: Vue components for the UI.
- **`src/shared`**: Shared kernel.
    - **`domain`**: the `PersonName` value object and the `uuid` identity-generation utility.

## Documentation
- **[User Stories](docs/user-stories.md)**: Detailed functional requirements and acceptance criteria.
- **[Architecture Decision Records](docs/adrs.md)**: Log of key architectural decisions and their justifications.
- **[Class Diagram](docs/class-diagram.puml)**: PlantUML visualization of the system architecture.
- **[Changelog](CHANGELOG.md)**: History of notable changes following "Keep a Changelog" standards.

## Setup & Installation

### Prerequisites
- **Node.js**: `v22` or higher
- **npm**: `v11` or higher

### Getting Started
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd hello-vue-developer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Development Commands
| Command           | Description                              |
|:------------------|:------------------------------------------|
| `npm run dev`     | Starts Vite development server with HMR. |
| `npm run build`   | Builds the application for production.   |
| `npm run preview` | Previews the production build locally.   |

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md).

## License
MIT, see [LICENSE.md](LICENSE.md).