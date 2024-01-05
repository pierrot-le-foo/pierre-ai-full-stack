"use client";
import Message from "@/components/Message";
import { ChatMessage, ChatMessageType } from "@/types";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useCallback, useState } from "react";
import SendIcon from "@mui/icons-material/Send";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: "Hello, I'm Pierre, a seasoned full stack AI developer with 15+ years of experience",
      type: ChatMessageType.AI,
    },
  ]);
  const [value, setValue] = useState("");

  const handleSend = useCallback(async () => {
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: value }),
    });
    const data = await response.json();
    setMessages((messages) => [...messages, data]);
  }, []);

  return (
    <Stack>
      <Stack sx={{ flex: 1, overflowY: "auto" }} spacing={2}>
        {messages.map((message, i) => (
          <Message message={message} key={i} />
        ))}

        <div id="mark"></div>
      </Stack>

      <Stack direction="row">
        <TextField
          variant="outlined"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          fullWidth
          placeholder="Escribe un mensaje a Petra"
          name="petra"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <Button variant="contained" onClick={handleSend} color="primary">
          <SendIcon />
        </Button>
      </Stack>
    </Stack>
  );
}
