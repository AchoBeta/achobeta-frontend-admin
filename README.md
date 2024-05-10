# Achobeta Recruit Admin Frontend 🌟

## Technology Stack 🛠️

This project is built using the following key technologies:

- [Nuxt3](https://nuxt.com/) - The Intuitive Vue Framework 🌐
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types 📜
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs 🎨
- [Vueuse](https://vueuse.org/) - Collection of essential Vue Composition Utilities for Vue 2 and 3 🔧

## Before You Start 🚦

Before you start developing, please ensure your development environment meets the following requirements:

- Node.js version 18 or higher 📈.
- Package management is strictly limited to `pnpm` 📦.
- Strict requirements are placed on commit messages. For detailed rules, please refer to our [commitlint configuration](./.commitlintrc.cjs) 📝.

## Project Setup 🏗️

To get the project up and running on your local machine, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone git@github.com:AchoBeta/achobeta-frontend-admin.git
   cd repository
   ```

   or
   ```bash
   git clone https://github.com/AchoBeta/achobeta-frontend-admin.git
   cd repository
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start the development server:**

   ```bash
   pnpm dev
   ```

   This command will start the server at `http://localhost:3000`. Open the URL in your browser to view the application 🌍.

## Build 🏗

To build the application for production deployment, run the following command:

```bash
pnpm build
```

This command compiles and minifies your application for optimal performance 💪.

## Deploy 🚀

To deploy the application, you can use the provided shell script:

```bash
./build.sh
```

Ensure that the script has executable permissions:

```bash
chmod +x build.sh
```

## Contribution Guidelines 👥

We welcome contributions! If you'd like to help improve the codebase, please follow our contribution process:

1. **Fork the repository:** Click on the 'Fork' button at the top right of this page.
2. **Create a new branch for your changes:**

   ```bash
   git checkout -b your-feature-branch
   ```

3. **Make your changes** and commit them:

   ```bash
   git commit -m 'Add some feature'
   ```

   Make sure your commit messages adhere to the guidelines specified in [commitlint.config.js](./.commitlintrc.cjs) 📝.

4. **Push to your fork** and submit a pull request.

Please ensure your code passes all tests and if possible, cover new functionality with additional tests. This ensures that your contributions can be integrated smoothly 🌟.

---

Thank you for contributing to Achobeta Recruit Admin Frontend! We look forward to seeing your innovative enhancements! 🎉
