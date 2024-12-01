# `gitignores` NPM Package

```
npm i -g gitignores
```

---

## **About Gitignores NPM packges**

This NPM package provides a simple and efficient CLI tool to quickly generate `.gitignore` files for any project. By running a single command, you can choose from a collection of over **1800+ predefined `.gitignore` templates** for different languages, frameworks, and tools.

---

## **Why I Created This**

I often found myself creating new projects where `.gitignore` files were either missing or not configured correctly. I always had to search for appropriate `.gitignore` templates online, which was time-consuming and repetitive.  
This tool was built to eliminate that hassle, allowing developers to easily add `.gitignore` files to their projects without leaving the terminal, no matter what the project is.

---

## **Tech Stack**

The project uses the following key dependencies:

- **Node.js** (`^18.0.0 || >=20.0.0`) and **npm**

- **[`prompts`](https://www.npmjs.com/package/prompts)** (`^2.4.2`)  
  Used to interact with the user in the terminal, enabling prompts to specify the desired `.gitignore` template.

- **[`chalk`](https://www.npmjs.com/package/chalk)** (`^5.3.0`)  
  Provides colorful and visually appealing terminal outputs to enhance the user experience.

---

## **How to Use**

1. Install or run the tool via `npx`:

   ```bash
   npx gitignores
   ```

2. When prompted, type the name of the `.gitignore` template you need (e.g., node, python, java, etc.).

3. The tool will instantly create a `.gitignore` file in your current directory based on the selected template.

# **Features**

- Over 1800+ Predefined .gitignore Templates:
  Includes .gitignore files for a wide variety of languages, frameworks, and tools.

- Easy Contributions:
  Developers can contribute to the repository by adding more .gitignore templates to the templates directory, making the tool even more versatile.

- Suggestions for Typos:
  If you mistype a template name, the tool will suggest the closest match.

- Fast and Lightweight:
  The tool is optimized for performance, ensuring it integrates seamlessly into your workflow.

# **Contributing**

If you'd like to add a new .gitignore template:

1. Add your template file to the templates directory.
2. Ensure the file is named appropriately (e.g., framework-name.gitignore).
3. Submit a pull request with a description of your changes.
