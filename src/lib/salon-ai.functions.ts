import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runSalonTool, type SalonToolKey } from "./salon-ai.server";

const SalonToolInput = z.object({
  tool: z.enum(["meeting", "planner", "research"]),
  input: z.string().min(1).max(20000),
});

export const generateSalonToolOutput = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => SalonToolInput.parse(data))
  .handler(async ({ data }) => {
    try {
      return await runSalonTool(data.tool as SalonToolKey, data.input);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      if (message.includes("429")) {
        return { text: "", error: "Too many requests right now — please try again in a moment." };
      }
      if (message.includes("402")) {
        return { text: "", error: "AI credits are exhausted. Please top up to keep using the assistant." };
      }
      return { text: "", error: message };
    }
  });
