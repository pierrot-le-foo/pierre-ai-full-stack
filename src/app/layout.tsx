import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "../providers/Provider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import NavTabs from "../components/NavTabs";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pierre Drouillet",
  description: "AI Full Stack Developer",
  publisher: 'noindex, nofollow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Container maxWidth="md">
            <Paper
              sx={
                {
                  // overflow: "auto",
                }
              }
              elevation={5}
            >
              <Stack sx={{height:'100dvh'}}>
                <Stack
                  direction="row"
                  spacing={4}
                  alignItems="center"
                  p={4}
                  component={Paper}
                >
                  <Stack>
                    <Avatar src="/me.png" sx={{ width: 100, height: 100 }} />
                  </Stack>

                  <Stack sx={{ flex: 1 }}>
                    <Typography variant="h2">Pierre Drouillet</Typography>
                    <NavTabs />
                  </Stack>
                </Stack>

                <main style={{ flex: 1, overflow: "auto" }}>
                  <Stack p={4}>
                    {children}
                  </Stack>
                </main>
              </Stack>
            </Paper>
          </Container>
        </Provider>
      </body>
    </html>
  );
}
