"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Header from "@/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Container maxWidth="md" disableGutters={!matches}>
      <Paper
        sx={
          {
            // overflow: "auto",
          }
        }
        elevation={5}
      >
        <Stack sx={{ height: "100dvh" }}>
          <Header />

          <main style={{ flex: 1, overflow: "auto" }}>
            <Stack p={0}>{children}</Stack>
          </main>
        </Stack>
      </Paper>
    </Container>
  );
}
