import Stack from "@mui/material/Stack";
import skills from "@/skills.json";
import Avatar from "@mui/material/Avatar";
import { orderBy } from "lodash";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SkillsList() {
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Stack py={matches ? 2 : 1}>
      <Typography variant={matches ? "h4" : "h5"}>Skills</Typography>

      <Stack sx={{ overflowX: "scroll" }}>
        <Stack direction="row">
          {orderBy(skills, ["focus", "stars"], ["desc", "desc"]).map(
            (skill) => {
              return (
                <Stack key={skill.title} p={4}>
                  <Stack spacing={matches ? 9 : 7}>
                    <Avatar
                      src={`/${skill.icon}`}
                      alt={skill.title}
                      sx={{
                        boxShadow: "0 40px 25px 5px rgba(0, 0, 0, 0.5)",
                        width: matches ? 80 : 60,
                        height: matches ? 80 : 60,
                      }}
                      variant={skill.square ? "square" : "circular"}
                    />

                    <Typography align="center">{skill.title}</Typography>
                  </Stack>
                </Stack>
              );
            }
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}
