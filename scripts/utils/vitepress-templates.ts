// This file contains utility functions for generating Markdown content.

export const generateCodeGroups = (commands: Record<string, string>) => {
    const blocks = Object.entries(commands)
      .map(([tool, command]) => {
        return `\`\`\`sh [${tool}]\n${command}\n\`\`\``;
      })
      .join("\n\n");
  
    return `::: code-group\n\n${blocks}\n\n:::`;
  };