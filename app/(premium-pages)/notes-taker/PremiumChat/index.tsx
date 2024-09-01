"use client";

import { Input, Spinner } from "@nextui-org/react";
import { useChat } from "ai/react";

export default function NinetailsChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/ai/prompt",
    });
  return (
    <div className="flex flex-col w-full  mx-auto justify-center items-center ">
      <form onSubmit={handleSubmit}>
        <Input
          className=" w-full  p-2 mb-8 "
          value={input}
          variant="bordered"
          size="lg"
          fullWidth
          placeholder="Ask something to our Premium Ninetails ai"
          onChange={handleInputChange}
        />
      </form>
      {isLoading && <Spinner />}
      {messages.slice(-1).map((m) => (
        <div
          key={m.id}
          className="whitespace-pre-wrap prose bg-background p-5 rounded-xl border shadow-md  dark:prose-invert "
        >
          {m.content}
        </div>
      ))}
    </div>
  );
}
