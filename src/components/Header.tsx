"use client";

import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import NavTabs from "./NavTabs";
import Anim from "./Anim";

export default function Header() {
  const matches = useMediaQuery("(min-width:600px)");
  const dim = matches ? 100 : 50;

  return (
    <Stack
      direction={matches ? "row" : "row"}
      spacing={matches ? 4 : 2}
      alignItems="center"
      p={matches ? 2 : 1}
      component={Paper}
    >
      <Stack>
        <Avatar src="/me.png" sx={{ width: dim, height: dim }} />
      </Stack>

      <Stack sx={{ flex: 1 }}>
        <Typography variant={matches ? "h2" : "h4"} align="center">
          Pierre Drouillet
        </Typography>
        <NavTabs />
      </Stack>

      {matches && <Anim />}
    </Stack>
  );
}
