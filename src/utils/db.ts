import { nanoid } from "nanoid";

import supabase from "./supabase";

import { ProjectDBProps, StyleDBProps } from "~/types/db";

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

export const getBlock = async (id: string) => {
  const { data, error } = await supabase
    .from("blocks")
    .select("*, styles ( * )")
    .eq("id", id);
  if (error || !data || data.length !== 1) {
    return null;
  } else {
    if (!data[0]) {
      return null;
    } else if (!data[0].styles || !Array.isArray(data[0].styles)) {
      return { ...data[0], styles: [] };
    } else {
      return { ...data[0], styles: data[0].styles };
    }
  }
};

export const getProjectSource = async (project_id: string) => {
  const { data, error } = await supabase
    .from("blocks")
    .select("*, styles ( * )")
    .eq("project_id", project_id);
  if (error || !data) {
    return null;
  } else {
    const styleData: StyleDBProps[] = [];
    const editedData = data.map((block) => {
      if (block.styles && Array.isArray(block.styles)) {
        styleData.push(...block.styles);
      }
      const { styles, ...rest } = block;
      return rest;
    });
    return { blocks: editedData, styles: styleData };
  }
};

export const addBlock = async (project_id: string) => {
  const id = nanoid();
  await supabase.from("blocks").insert([
    {
      id,
      project_id,
      name: "無題のプロジェクト",
    },
  ]);
  const { data: newBlock } = await supabase
    .from("blocks")
    .select("*")
    .eq("id", id);
  return newBlock ? newBlock[0] : null;
};
