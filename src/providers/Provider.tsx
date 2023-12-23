"use client";
import { PropsWithChildren } from "react";
import ThemeProvider from "./ThemeProvider";

export default function Provider({ children }: PropsWithChildren<{}>) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
