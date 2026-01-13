import { describe, it, expect } from "vitest";
import { existsSync, statSync } from "fs";
import { join } from "path";
import fc from "fast-check";

/**
 * Property-based tests for project structure validation
 * Feature: portfolio-transformation, Property 11: Code Quality Standards
 * Validates: Requirements 10.1, 10.3
 */

describe("Project Structure Validation", () => {
  const projectRoot = process.cwd();

  // Required directories structure
  const requiredDirectories = [
    "src",
    "src/components",
    "src/components/common",
    "src/components/sections",
    "src/components/ui",
    "src/hooks",
    "src/pages",
    "src/services",
    "src/styles",
    "src/test",
    "src/utils",
  ];

  // Required files
  const requiredFiles = [
    "package.json",
    "vite.config.js",
    "tailwind.config.js",
    "postcss.config.js",
    "index.html",
    "src/main.jsx",
    "src/App.jsx",
    "src/styles/globals.css",
    ".env.example",
    ".gitignore",
    "README.md",
  ];

  // Component files that should exist
  const requiredComponents = [
    "src/components/common/Header.jsx",
    "src/components/common/Footer.jsx",
    "src/components/common/LoadingSpinner.jsx",
    "src/components/common/ScrollToTop.jsx",
    "src/components/sections/Hero.jsx",
    "src/components/sections/About.jsx",
    "src/components/sections/Skills.jsx",
    "src/components/sections/Projects.jsx",
    "src/components/sections/Experience.jsx",
    "src/components/sections/Contact.jsx",
  ];

  // Service files
  const requiredServices = [
    "src/services/api.js",
    "src/services/animations.js",
  ];

  // Utility files
  const requiredUtils = ["src/utils/constants.js", "src/utils/helpers.js"];

  // Hook files
  const requiredHooks = ["src/hooks/useAnimation.js"];

  it("should have all required directories", () => {
    requiredDirectories.forEach((dir) => {
      const dirPath = join(projectRoot, dir);
      expect(existsSync(dirPath), `Directory ${dir} should exist`).toBe(true);
      expect(
        statSync(dirPath).isDirectory(),
        `${dir} should be a directory`
      ).toBe(true);
    });
  });

  it("should have all required configuration files", () => {
    requiredFiles.forEach((file) => {
      const filePath = join(projectRoot, file);
      expect(existsSync(filePath), `File ${file} should exist`).toBe(true);
      expect(statSync(filePath).isFile(), `${file} should be a file`).toBe(
        true
      );
    });
  });

  it("should have all required React components", () => {
    requiredComponents.forEach((component) => {
      const componentPath = join(projectRoot, component);
      expect(
        existsSync(componentPath),
        `Component ${component} should exist`
      ).toBe(true);
      expect(
        statSync(componentPath).isFile(),
        `${component} should be a file`
      ).toBe(true);
    });
  });

  it("should have all required service files", () => {
    requiredServices.forEach((service) => {
      const servicePath = join(projectRoot, service);
      expect(existsSync(servicePath), `Service ${service} should exist`).toBe(
        true
      );
      expect(
        statSync(servicePath).isFile(),
        `${service} should be a file`
      ).toBe(true);
    });
  });

  it("should have all required utility files", () => {
    requiredUtils.forEach((util) => {
      const utilPath = join(projectRoot, util);
      expect(existsSync(utilPath), `Utility ${util} should exist`).toBe(true);
      expect(statSync(utilPath).isFile(), `${util} should be a file`).toBe(
        true
      );
    });
  });

  it("should have all required hook files", () => {
    requiredHooks.forEach((hook) => {
      const hookPath = join(projectRoot, hook);
      expect(existsSync(hookPath), `Hook ${hook} should exist`).toBe(true);
      expect(statSync(hookPath).isFile(), `${hook} should be a file`).toBe(
        true
      );
    });
  });

  // Property-based test: For any valid file path in the project structure,
  // it should follow naming conventions
  it("should follow consistent naming conventions for all files", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          ...requiredComponents,
          ...requiredServices,
          ...requiredUtils,
          ...requiredHooks
        ),
        (filePath) => {
          const fileName = filePath.split("/").pop();
          const fileExtension = fileName.split(".").pop();

          // React components should use PascalCase
          if (filePath.includes("components/") && fileExtension === "jsx") {
            const componentName = fileName.replace(".jsx", "");
            expect(componentName).toMatch(/^[A-Z][a-zA-Z0-9]*$/);
          }

          // Service and utility files should use camelCase
          if (
            (filePath.includes("services/") ||
              filePath.includes("utils/") ||
              filePath.includes("hooks/")) &&
            fileExtension === "js"
          ) {
            const baseName = fileName.replace(".js", "");
            expect(baseName).toMatch(/^[a-z][a-zA-Z0-9]*$/);
          }

          // All files should have appropriate extensions
          expect(["js", "jsx", "css", "json", "md", "html"]).toContain(
            fileExtension
          );
        }
      ),
      { numRuns: 50 }
    );
  });

  // Property-based test: For any directory in the required structure,
  // it should be organized logically
  it("should maintain logical directory organization", () => {
    fc.assert(
      fc.property(fc.constantFrom(...requiredDirectories), (dirPath) => {
        // Components should be in components directory
        if (dirPath.includes("components")) {
          expect(dirPath).toMatch(/^src\/components/);
        }

        // Services should be in services directory
        if (dirPath.includes("services")) {
          expect(dirPath).toMatch(/^src\/services/);
        }

        // Utils should be in utils directory
        if (dirPath.includes("utils")) {
          expect(dirPath).toMatch(/^src\/utils/);
        }

        // All source code should be under src
        if (!dirPath.startsWith("src")) {
          // Only root level directories allowed outside src
          expect(dirPath.split("/").length).toBe(1);
        }
      }),
      { numRuns: 30 }
    );
  });

  // Property-based test: Package.json should contain all required dependencies
  it("should have all required dependencies in package.json", () => {
    const packageJsonPath = join(projectRoot, "package.json");
    const packageJson = JSON.parse(
      require("fs").readFileSync(packageJsonPath, "utf8")
    );

    const requiredDependencies = [
      "react",
      "react-dom",
      "react-router-dom",
      "axios",
      "framer-motion",
      "gsap",
      "@studio-freight/lenis",
    ];

    const requiredDevDependencies = [
      "@vitejs/plugin-react",
      "vite",
      "tailwindcss",
      "autoprefixer",
      "postcss",
      "eslint",
      "vitest",
    ];

    fc.assert(
      fc.property(fc.constantFrom(...requiredDependencies), (dependency) => {
        expect(packageJson.dependencies).toHaveProperty(dependency);
        expect(typeof packageJson.dependencies[dependency]).toBe("string");
      }),
      { numRuns: requiredDependencies.length }
    );

    fc.assert(
      fc.property(
        fc.constantFrom(...requiredDevDependencies),
        (devDependency) => {
          expect(packageJson.devDependencies).toHaveProperty(devDependency);
          expect(typeof packageJson.devDependencies[devDependency]).toBe(
            "string"
          );
        }
      ),
      { numRuns: requiredDevDependencies.length }
    );
  });

  // Property-based test: Configuration files should have valid structure
  it("should have valid configuration file structures", () => {
    // Test Vite config
    const viteConfigPath = join(projectRoot, "vite.config.js");
    expect(existsSync(viteConfigPath)).toBe(true);

    // Test Tailwind config
    const tailwindConfigPath = join(projectRoot, "tailwind.config.js");
    expect(existsSync(tailwindConfigPath)).toBe(true);

    // Test PostCSS config
    const postcssConfigPath = join(projectRoot, "postcss.config.js");
    expect(existsSync(postcssConfigPath)).toBe(true);

    // Test ESLint config
    const eslintConfigPath = join(projectRoot, ".eslintrc.cjs");
    expect(existsSync(eslintConfigPath)).toBe(true);
  });
});
