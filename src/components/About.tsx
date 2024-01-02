import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function About() {
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Stack spacing={3}>
      <Typography variant={matches ? "h6" : "body1"}>
        I am a seasoned AI full stack developer, based in Valencia, Spain, with
        over 15 years of experience in the IT industry.
      </Typography>
    </Stack>
  );
}
