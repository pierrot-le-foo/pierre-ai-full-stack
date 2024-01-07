import { useState, useEffect } from "react";

export default function Ellipse() {
  const [ellipse, setEllipse] = useState("");

  useEffect(() => {
    const e = setTimeout(() => {
      if (ellipse === "") {
        setEllipse(".");
      } else if (ellipse === ".") {
        setEllipse("..");
      } else if (ellipse === "..") {
        setEllipse("...");
      } else if (ellipse === "...") {
        setEllipse("");
      }
    }, 500);
    return () => {
      clearTimeout(e);
    };
  }, [ellipse]);

  return <span style={{ display: "inline-block", width: 40 }}>{ellipse}</span>;
}