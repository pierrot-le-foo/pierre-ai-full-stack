import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
import { hireMeStore } from "@/stores/hireMeStore";
import { useCallback, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

interface HireFormProps {
  leadID: string;
}


export default function HireForm({ leadID }: HireFormProps) {
  const { toggleHireMe, setIsSent } = hireMeStore((state) => state);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSend = useCallback(async () => {
    setSending(true);
    setError("");
    try {
      if (!name) {
        throw new Error("Name is required");
      }

      if (!email) {
        throw new Error("Email is required");
      }

      if (!message) {
        throw new Error("Message is required");
      }

      const response = await fetch(`/api/message/${leadID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, company, email, message }),
      });

      toggleHireMe();

      setIsSent(true);

      setName("");
      setCompany("");
      setEmail("");
      setMessage("");
    } catch (e) {
      setError((e as Error).message);
    }
    setSending(false);
  }, [company, email, message, name, setIsSent, toggleHireMe]);

  return (
    <>
      <Stack spacing={3} p={2} component={Paper} id="hire-me">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4">Hire me!</Typography>

          <IconButton onClick={toggleHireMe}>
            <HighlightOffIcon sx={{ fontSize: 42 }} />
          </IconButton>
        </Stack>

        <TextField
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={sending}
          label="Your name"
          placeholder="Your name"
        />

        <TextField
          fullWidth
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          disabled={sending}
          label="Your company"
          placeholder="Your company"
        />

        <TextField
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={sending}
          label="Your email"
          placeholder="Your email"
        />

        <TextField
          fullWidth
          multiline
          minRows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={sending}
          label="Your message"
          placeholder="Your message"
        />

        <Button onClick={handleSend} disabled={sending}>
          Send message
        </Button>
      </Stack>

      <Snackbar
        open={error !== ""}
        autoHideDuration={6000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
