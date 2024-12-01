import prompts from "prompts";

import path from "path";
import fs from "fs/promises";
import chalk from "chalk";

import { performance } from "perf_hooks";
import { fileURLToPath } from "url";

const templatesDir = path.resolve(
  fileURLToPath(import.meta.url),
  "../../templates"
);

const levenshteinDistance = (a, b) => {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }

  return dp[a.length][b.length];
};

export const findClosestMatch = (input, choices) => {
  let closest = null;
  let minDistance = Infinity;

  for (const choice of choices) {
    const distance = levenshteinDistance(input, choice);
    if (distance < minDistance) {
      minDistance = distance;
      closest = choice;
    }
  }

  return { closest, distance: minDistance };
};

(async () => {
  try {
    const response = await prompts({
      type: "text",
      name: "gitignoreName",
      message: chalk.cyan(
        "Enter the name of the gitignore template (e.g., node, python):"
      ),
      format: (val) => val.toLowerCase().trim(),
    });

    const gitignoreName = response.gitignoreName;
    if (!gitignoreName) {
      throw new Error(chalk.red("You must provide a valid name."));
    }

    const targetFile = `${gitignoreName}.gitignore`;
    const templatePath = path.join(templatesDir, targetFile);

    try {
      await fs.access(templatePath); // Check if the file exists

      // Measure the time taken for file creation
      const startTime = performance.now();
      await fs.copyFile(templatePath, path.join(process.cwd(), ".gitignore")); // Copy to current directory
      const endTime = performance.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

      console.log(chalk.green(`🎉 ${gitignoreName}.gitignore created.`));
      //   console.log(chalk.greenBright(`✔ Created file in ${timeTaken} seconds.`));
    } catch (err) {
      // Handle typo suggestions
      const availableTemplates = await fs.readdir(templatesDir);
      const templateNames = availableTemplates.map((file) =>
        file.replace(".gitignore", "").toLowerCase()
      );

      const { closest, distance } = findClosestMatch(
        gitignoreName,
        templateNames
      );
      if (distance <= 3) {
        console.error(
          chalk.yellow(
            `'${gitignoreName}' not found. Did you mean '${closest}'?`
          )
        );
      } else {
        console.error(
          chalk.red(`✘ Template '${gitignoreName}' not found in the database.`)
        );
      }
    }
  } catch (err) {
    console.error(chalk.red(`Error: ${err.message}`));
  }
})();
