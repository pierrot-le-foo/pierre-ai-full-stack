"use client";

import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavTabs from "./NavTabs";
import Anim from "./Anim";
import Button from "@mui/material/Button";
import { hireMeStore } from "@/stores/hireMeStore";

export default function Header() {
  const matches = useMediaQuery("(min-width:600px)");
  const dim = matches ? 100 : 50;

  const toggleHireMe = hireMeStore((state) => state.toggleHireMe);

  return (
    <Stack
      direction={matches ? "row" : "row"}
      spacing={matches ? 4 : 2}
      alignItems="center"
      p={matches ? 2 : 1}
      component={Paper}
      id="hire-me"
    >
      <Stack>
        <Avatar src="/me.png" sx={{ width: dim, height: dim }} />
      </Stack>

      <Stack sx={{ flex: 1 }} direction="row" spacing={1}>
        <Typography variant={matches ? "h2" : "h4"}>Pierre</Typography>
        {matches && (
          <Typography variant={matches ? "h2" : "h4"} sx={{ color: "#666" }}>
            developer
          </Typography>
        )}
      </Stack>

      <Button variant="outlined" onClick={toggleHireMe}>
        Hire me!
      </Button>
    </Stack>
  );
}
