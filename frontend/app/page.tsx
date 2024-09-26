"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendMessage } from "@/services";
import { Bomb, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface Message {
  id: number;
  text: string;
  sender: "user" | "other";
}

export default function Component() {
  const [messages, setMessages] = useState<Message[]>([] as Message[]);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, sender: "user" },
      ]);
      setNewMessage("");
    }
  };

  const sendMessages = (message: string) => {
    sendMessage(message)
      .then((res) => toast.success(res?.data))
      .catch((err) => console.log(err));
  };

  const stressTest = () => {
    const message = "Teste de estresse";

    for (let i = 0; i < 100; i++) {
      sendMessages(message);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-[400px] mx-auto border rounded-lg overflow-hidden">
      <div className="bg-primary p-4 text-primary-foreground">
        <h2 className="text-xl font-bold">Chat</h2>
      </div>
      <ScrollArea className="flex-grow p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${
              message?.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg ${
                message?.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {message?.text}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex space-x-3"
        >
          <Input
            type="text"
            placeholder="Digite uma mensagem..."
            value={newMessage}
            onChange={(e) => setNewMessage(e?.target?.value)}
            className="flex-grow text-md"
          />
          <Button type="submit">
            <Send
              className="h-5 w-5 mx-0.5"
              onClick={() => sendMessages(newMessage)}
            />
          </Button>
        </form>
      </div>
      <div className="bg-red-100 border border-1 border-red-700 text-red-700 rounded-lg flex items-center gap-2 px-4 py-3 w-fit m-auto mb-4">
        <Bomb className="h-5 w-5" />
        <span className="font-medium">Capotar sistema</span>
      </div>
    </div>
  );
}
