"use client";

import { useEffect, useState } from "react";

import { Grid } from "@mantine/core";

import NewProject from "../NewProject";
import Project from "../Project";

import useStyles from "./styles";

import { ProjectDBProps } from "@/types/db";
import { getProjects } from "@/utils/db";

const ProjectList: React.FC = () => {
  const { classes } = useStyles();
  const [projects, setProjects] = useState<ProjectDBProps[]>([]);

  useEffect(() => {
    getProjects().then((r) => {
      setProjects(r);
    });
  }, []);

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
