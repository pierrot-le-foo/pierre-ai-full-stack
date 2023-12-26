import Stack from "@mui/material/Stack";
import missions from "@/missions.json";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import useMediaQuery from "@mui/material/useMediaQuery";

function Experience({
  mission,
  odd,
}: {
  mission: (typeof missions)[0];
  odd: boolean;
}) {
  const [open, setOpen] = useState(true);
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Stack direction={odd ? "row" : "row-reverse"} sx={{}}>
      <Stack sx={{ flex: 1 }}>
        <Stack
          direction={odd ? "row" : "row-reverse"}
          justifyContent="space-between"
        >
          <Typography variant="h5">{mission.title}</Typography>
          <CircleIcon
            style={{ marginRight: odd ? -14 : 0, marginLeft: !odd ? -10 : 0 }}
          />
        </Stack>

        <Stack
          sx={{
            borderRight: odd ? "1px solid white" : "none",
            borderLeft: !odd ? "1px solid white" : "none",
          }}
          alignItems={odd ? "flex-start" : "flex-end"}
        >
          <Stack
            direction={odd ? "row" : "row-reverse"}
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <KeyboardArrowDownIcon
              onClick={() => {
                setOpen((o) => !o);
              }}
              sx={{
                transform: open ? "rotate(-0deg)" : "rotate(-90deg)",
                transition: "transform 0.2s",
              }}
            />

            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h6">{mission.company}</Typography>
              <Typography>
                {mission.dates[0]}-{mission.dates[1]}
              </Typography>
            </Stack>
          </Stack>

          <Collapse in={open}>
            <List>
              {mission.tasks.map((task, index) => (
                <ListItem key={index}>
                  <ListItemButton sx={{ borderRadius: 2 }}>
                    <ListItemText primary={task} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Stack>
      </Stack>
      {matches && <Stack sx={{ flex: 1 }}></Stack>}
    </Stack>
  );

  // return (
  //   <Stack>
  //     <Stack direction={odd ? 'row' : 'row-reverse'} alignItems="center" spacing={2}>
  //       <CircleIcon />
  //       <Typography variant="h4">{mission.title}</Typography>
  //     </Stack>

  //     <Stack
  //       sx={{
  //         border: "0px solid",
  //         borderLeftWidth: odd ? 2 : 0,
  //         borderRightWidth: odd ? 0 : 2,
  //         paddingLeft: 4,
  //         marginLeft: 1,
  //         paddingBottom: 4,
  //       }}
  //     >
  //       <Stack
  //         direction="row"
  //         spacing={3}
  //         alignItems="center"
  //         sx={{ marginTop: 2 }}
  //       >

  //         <Typography
  //           variant="h6"
  //           sx={{
  //             borderBottom: "3px solid #999",
  //             paddingBottom: 1,
  //           }}
  //         >
  //           {mission.company}
  //         </Typography>

  //         <Stack
  //           direction="row"
  //           spacing={1}
  //           alignItems="center"
  //           sx={{
  //             border: "1px solid #ccc",
  //             padding: 2,
  //             borderRadius: 3,
  //             "&:hover": {
  //               backgroundColor: "#333",
  //             },
  //           }}
  //         >
  //           <CalendarMonthIcon />
  //           <Typography>{mission.dates[0]}</Typography>
  //           <SettingsEthernetIcon />
  //           <Typography>{mission.dates[1]}</Typography>
  //         </Stack>
  //       </Stack>

  //     </Stack>
  //   </Stack>
  // );
}

export default function Career() {
  return (
    <Stack spacing={2}>
      {missions.map((mission, index) => (
        <Experience key={index} mission={mission} odd={index % 2 === 0} />
      ))}
    </Stack>
  );
}
