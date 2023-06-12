import { nanoid } from "nanoid";

import supabase from "./supabase";

import { BlockDBProps, ProjectDBProps, StyleDBProps } from "~/types/db";

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

export const updateBlockConfig = async (
  id: string,
  key: keyof BlockDBProps,
  value: string | number
) => {
  const { data, error } = await supabase
    .from("blocks")
    .update({ [key]: value })
    .eq("id", id);
};

export const addStyle = async (block_id: string, style_name: string) => {
  const { data, error } = await supabase.from("styles").insert({
    id: `${block_id}_${style_name}`,
    block_id,
    key: style_name,
  });
};

export const updateStyle = async (
  id: string,
  type: "initial_style" | "final_style",
  value: string
) => {
  const { data, error } = await supabase
    .from("styles")
    .update({ id, [type]: value })
    .eq("id", id);
};

export const deleteStyle = async (id: string) => {
  const { data, error } = await supabase.from("styles").delete().eq("id", id);
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
