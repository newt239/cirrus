import supabase from "./supabase";

import { ProjectDBProps } from "@/types/db";

export const getProjects = async () => {
  const { data, error } = await supabase.from("projects").select("*");
  return data as ProjectDBProps[];
};
