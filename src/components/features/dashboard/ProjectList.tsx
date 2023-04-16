"use client";

import { useEffect, useState } from "react";

import { Grid } from "~/libs/mantine/core";

import NewProject from "~/components/features/dashboard/NewProject";
import Project from "~/components/features/dashboard/Project";
import { ProjectDBProps } from "~/types/db";
import { getProjects } from "~/utils/db";

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<ProjectDBProps[]>([]);

  useEffect(() => {
    getProjects().then((r) => {
      setProjects(r);
    });
  }, []);

  return (
    <Grid m={4}>
      <Grid.Col lg={3} md={4} sm={6} xs={12}>
        <NewProject />
      </Grid.Col>
      {projects.map((project) => (
        <Grid.Col key={project.id} lg={3} md={4} sm={6} xs={12}>
          <Project id={project.id} name={project.name} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ProjectList;
