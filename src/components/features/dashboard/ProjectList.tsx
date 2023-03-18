"use client";

import { useEffect, useState } from "react";

import NewProject from "@/components/features/dashboard/NewProject";
import Project from "@/components/features/dashboard/Project";
import { Grid } from "@/lib/mantine/core";
import { ProjectDBProps } from "@/types/db";
import { getProjects } from "@/utils/db";

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<ProjectDBProps[]>([]);

  useEffect(() => {
    getProjects().then((r) => {
      setProjects(r);
    });
  }, []);

  return (
    <Grid m={4}>
      <Grid.Col xs={12} sm={6} md={4} lg={3}>
        <NewProject />
      </Grid.Col>
      {projects.map((project) => (
        <Grid.Col key={project.id} xs={12} sm={6} md={4} lg={3}>
          <Project id={project.id} name={project.name} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ProjectList;
