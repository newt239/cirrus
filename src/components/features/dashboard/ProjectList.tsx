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
    <Grid sx={{ padding: "1rem" }}>
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
