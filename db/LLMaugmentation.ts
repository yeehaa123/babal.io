import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import type { TempCheckpoint } from "./prepCourses";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: import.meta.env.OPENAI_API_KEY });




export async function getLLMDescription({ href, task, goal }: TempCheckpoint) {
  console.log("NOT CACHED ", href, goal);
  const num_words = 300;
  const num_chars = 400;

  const initialMessages: ChatCompletionMessageParam[] = [
    { role: "system", content: "You are a helpful coach." },
    { role: "system", content: `that tries to help the user to reach the following goal: ${goal}` },
    {
      role: "system", content: `and you are provided with the following task: ${task}`
    }];

  const summaryMessage: ChatCompletionMessageParam = {
    role: "user", content: `can you explain how the following link '${href}' helps people to achieve the mentioned goal and required task in no more than ${num_words} words without including a suggestion to read the article or a link? Also, just give the summary no reference to the question needed.`
  };

  const summaryCompletion = await openai.chat.completions.create({
    messages: [...initialMessages, summaryMessage],
    model: "gpt-4o"
  });

  const summary = summaryCompletion.choices[0]?.message.content || null
  const summaryResponse: ChatCompletionMessageParam = {
    role: "assistant", content: summary
  }


  const descriptionMessage: ChatCompletionMessageParam = {
    role: "user", content: `can you give me a shortened version of the summary in a maximum of ${num_chars} characters?`
  };

  const descriptionCompletion = await openai.chat.completions.create({
    messages: [...initialMessages, summaryMessage, summaryResponse, descriptionMessage],
    model: "gpt-4o"
  });

  const description = descriptionCompletion.choices[0]?.message.content || null

  return { summary, description };
}
