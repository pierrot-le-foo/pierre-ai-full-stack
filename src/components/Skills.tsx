import Stack from "@mui/material/Stack";
import skills from "@/skills.json";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import uniq from "lodash/uniq";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import range from "lodash/range";
import orderBy from "lodash/orderBy";
import TextField from "@mui/material/TextField";

const allCategories = uniq(skills.map((skill) => skill.category));

export default function Skills() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] =
    useState<(typeof skills)[0][]>(skills);
  const [categories, setCategories] = useState(allCategories);

  useEffect(() => {
    if (search) {
      setSelectedSkills(
        skills.filter((skill) =>
          skill.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setSelectedSkills(skills);
      setCategories(allCategories);
    }
  }, [search]);

  useEffect(() => {
    setCategories(uniq(selectedSkills.map((skill) => skill.category)));
  }, [selectedSkills]);

  return (
    <Stack>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <Tabs
        value={tab}
        onChange={(e, v) => {
          setTab(v);
        }}
        variant="scrollable"
        scrollButtons="auto"
      >
        {categories.map((category, index) => (
          <Tab key={index} label={category} />
        ))}
      </Tabs>

      <List>
        {orderBy(
          selectedSkills.filter((skill) => skill.category === categories[tab]),
          ["stars", "title"],
          ["desc", "asc"]
        ).map((skill, index) => (
          <ListItem key={index}>
            <ListItemButton sx={{ borderRadius: 2 }}>
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
