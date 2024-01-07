import { ChatMessage, ChatMessageType } from "@/types";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

interface MessageProps {
  message: ChatMessage;
  extra?: "warning";
}

export default function Message({ message, extra }: MessageProps) {
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Stack
      sx={{
        // justifyContent:
        //   message.type === "ai" ? "flex-start" : "flex-end",
        padding: matches ? 2 : 1,
      }}
      direction={message.type === ChatMessageType.AI ? "row" : "row-reverse"}
      spacing={2}
    >
      <Avatar
        src={message.type === ChatMessageType.AI ? "/me.png" : ""}
        sx={{ width: 60, height: 60 }}
      />

      <Stack sx={{ maxWidth: matches ? "50%" : "90%", minWidth: "20%" }}>
        <Paper
          sx={{
            padding: 2,
            borderRadius: 2,
            borderTopLeftRadius: message.type === ChatMessageType.AI ? 0 : 2,
            borderTopRightRadius:
              message.type === ChatMessageType.Human ? 0 : 2,
            backgroundColor:
              extra && extra === "warning"
                ? "#ab47bc"
                : message.type === ChatMessageType.AI
                ? "#369"
                : "#388e3c",
          }}
        >
          <Typography
            align={message.type === ChatMessageType.AI ? "left" : "right"}
          >
            {message.content}
          </Typography>
        </Paper>
      </Stack>
    </Stack>
  );
}
