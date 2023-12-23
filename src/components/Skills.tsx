import Stack from "@mui/material/Stack";
import skills from "@/skills.json";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import uniq from "lodash/uniq";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import range from "lodash/range";
import orderBy from "lodash/orderBy";

export default function Skills() {
  const categories = uniq(skills.map((skill) => skill.category));
  const [tab, setTab] = useState(0);

  return (
    <Stack>
      <Tabs
        value={tab}
        onChange={(e, v) => {
          setTab(v);
        }}
      >
        {categories.map((category, index) => (
          <Tab key={index} label={category} />
        ))}
      </Tabs>

      <List>
        {orderBy(
          skills.filter((skill) => skill.category === categories[tab]),
          ["stars", "title"],
          ["desc", "asc"]
        ).map((skill, index) => (
          <ListItem key={index}>
            <ListItemButton sx={{borderRadius:2}}>
              <ListItemText primary={skill.title} />
              {range(0, skill.stars).map((index) => (
                <StarIcon key={index} />
              ))}
              {range(skill.stars, 5).map((index) => (
                <StarBorderIcon key={index} />
              ))}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
