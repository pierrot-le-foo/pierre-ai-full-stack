"use client";
import Message from "@/components/Message";
import { ChatMessage, ChatMessageType } from "@/types";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Ellipse from "@/components/Ellipse";
import HireForm from "@/components/HireForm";
import Avatar from "@mui/material/Avatar";
import { hireMeStore } from "@/stores/hireMeStore";
import Collapse from "@mui/material/Collapse";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import useMediaQuery from "@mui/material/useMediaQuery";

interface ChatProps {
  leadID: string;
}

const LIMIT = 10000;

function countCharacters(messages: ChatMessage[]) {
  return messages.reduce((acc, message) => {
    return acc + message.content.length;
  }, 0);
}

export default function Chat({ leadID }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content:
        "Hello, I'm Pierre, a seasoned full stack AI developer with 15+ years of experience",
      type: ChatMessageType.AI,
    },

    {
      content:
        "Feel fre to ask me any questions about my past experiences or my skills to see why I'm the best fit for your project!",
      type: ChatMessageType.AI,
    },
  ]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const { showHireMe, isSent, setIsSent, toggleHireMe } = hireMeStore(
    (state) => state
  );

  const matches = useMediaQuery("(min-width:600px)");

  const handleSend = useCallback(async () => {
    setLoading(true);
    const message = value.trim();
    const history = [...messages];
    setMessages((messages) => [
      ...messages,
      {
        content: message,
        type: ChatMessageType.Human,
      },
    ]);
    setValue("");
    const response = await fetch(`/api/chat/${leadID}`, {
      method: "POST",
      body: JSON.stringify({ message, history }),
    });
    const data = await response.json();
    setMessages((messages) => [
      ...messages,
      {
        content: data.text,
        type: ChatMessageType.AI,
      },
    ]);
    setLoading(false);
  }, [messages, value, leadID]);

  useEffect(() => {
    const elem = document.getElementById("prompt");

    if (elem) {
      elem.scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    if (showHireMe) {
      setTimeout(() => {
        const elem = document.getElementById("prompt");

        console.log(elem);

        if (elem) {
          elem.scrollIntoView({
            block: matches ? "end" : "start",
            behavior: "smooth",
          });
        }
      }, 500);
    }
  }, [matches, showHireMe]);

  useEffect(() => {
    const count = countCharacters(messages);
    if (count > LIMIT) {
      setLimitReached(true);
    }
  }, [messages]);

  return (
    <Stack>
      <Stack sx={{ flex: 1, overflowY: "auto" }} spacing={2}>
        {messages.map((message, i) => (
          <Message message={message} key={i} />
        ))}

        {limitReached && (
          <Message
            message={{
              type: ChatMessageType.AI,
              content:
                "You have reached the limit of tokens allowed for this chat. I hope you enjoyed chatting with me and I am looking forward to hearing from you soon!",
            }}
            extra="warning"
          />
        )}

        {limitReached && (
          <Stack>
            <Button
              variant="contained"
              color="success"
              onClick={toggleHireMe}
              sx={{ width: 200, marginLeft: 12 }}
            >
              Get in touch!
            </Button>
          </Stack>
        )}

        <Collapse in={showHireMe}>
          <HireForm leadID={leadID} />
        </Collapse>
      </Stack>

      {loading && (
        <Stack p={2} direction="row" spacing={2} alignItems="center">
          <Avatar src="/me.png" sx={{ width: 60, height: 60 }} />
          <Typography color="textSecondary">Pierre is writing</Typography>
          <Ellipse />
        </Stack>
      )}

      {!limitReached && (
        <Stack direction="row" style={{ marginTop: showHireMe ? 0 : 30 }}>
          <TextField
            variant="outlined"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            fullWidth
            placeholder="Ask Pierre a question"
            name="prompt"
            disabled={loading || limitReached || showHireMe}
            id="prompt"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <Button
            variant="contained"
            onClick={handleSend}
            color="primary"
            disabled={loading || limitReached || showHireMe}
          >
            <SendIcon />
          </Button>
        </Stack>
      )}

      <Snackbar
        open={isSent}
        autoHideDuration={16000}
        onClose={() => setIsSent(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={() => setIsSent(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you! Your message has been sent. I will get back to you as soon
          as possible.
        </Alert>
      </Snackbar>
    </Stack>
  );
}
