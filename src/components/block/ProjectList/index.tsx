"use client";

import { Grid } from "@mantine/core";

import NewProject from "../NewProject";
import Project from "../Project";

import useStyles from "./styles";

const ProjectList: React.FC = () => {
  const { classes } = useStyles();
  const projects = [{ id: "abcde", name: "無題のプロジェクト" }];
  return (
    <Grid className={classes.grid}>
      <Grid.Col span={4}>
        <NewProject />
      </Grid.Col>
      {projects.map((project) => (
        <Grid.Col key={project.id} span={4}>
          <Project id={project.id} name={project.name} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ProjectList;
