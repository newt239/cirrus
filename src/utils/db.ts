import supabase from "./supabase";

import { ProjectDBProps } from "~/types/db";

export const getProjects = async () => {
  const { data, error } = await supabase.from("projects").select("*");
  if (error) {
    return [];
  } else {
    return data as ProjectDBProps[];
  }
};

export const getProjectInfo = async (id: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id);
  if (error || !data || data.length !== 1) {
    return null;
  } else {
    return data[0];
  }
};

export const deleteProject = async (id: string) => {
  await supabase.from("projects").delete().eq("id", id);
};

export const getBlocks = async (project_id: string) => {
  const { data, error } = await supabase
    .from("blocks")
    .select("*")
    .eq("project_id", project_id);
  if (error || !data) {
    return null;
  } else {
    return data;
  }
};
