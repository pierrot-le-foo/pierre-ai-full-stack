"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const TABS = [
  {
    label: "about",
    path: "/",
  },
  {
    label: "career",
    path: "/career",
  },
  {
    label: "skills",
    path: "/skills",
  },
  // {
  //   label: "contact",
  //   path: "/contact",
  // },
];

export default function NavTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const [tab, setTab] = useState(() => {
    const selectedTab = TABS.findIndex((tab) => tab.path === pathname);
    return selectedTab === -1 ? 0 : selectedTab;
  });

  useEffect(() => {
    const selectedTab = TABS[tab];
    if (selectedTab) {
      router.push(selectedTab.path);
    }
  }, [router, tab]);

  return (
    <Tabs
      value={tab}
      onChange={(_event, newValue) => {
        setTab(newValue);
      }}
    >
      {TABS.map((tab, index) => (
        <Tab key={index} label={tab.label} />
      ))}
    </Tabs>
  );
}
