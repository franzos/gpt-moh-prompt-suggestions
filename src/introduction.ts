import { ChatCompletionRequestMessage } from "openai";

import fs from "fs";

export class Inroduction {
  messages: ChatCompletionRequestMessage[] = [];

  constructor(path: string) {
    this.load(path);
  }

  load(path: string) {
    try {
      const data = fs.readFileSync(path, "utf8");
      this.messages = JSON.parse(data);
    } catch (err) {
      throw new Error(`Could not load introduction from ${path}`);
    }
  }

  substitute(replacements: Record<string, string>) {
    const substitutedData = this.messages.map((obj) => {
      const { role, content } = obj;
      let substitutedContent = content;
      Object.entries(replacements).forEach(([placeholder, value]) => {
        substitutedContent = substitutedContent.replace(
          new RegExp("\\${" + placeholder + "}", "g"),
          value
        );
      });
      return { role, content: substitutedContent };
    });

    return substitutedData;
  }
}
