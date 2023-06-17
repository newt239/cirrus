import dayjs from "dayjs";
import { nanoid } from "nanoid";

import supabase from "./supabase";

import { BlockDBProps, ProjectDBProps, StyleDBProps } from "~/types/db";
import { db } from "~/utils/dexie";

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
  const timestamp = dayjs().toISOString();
  const data: BlockDBProps = {
    id,
    name: id,
    project_id,
    type: "text",
    created_at: timestamp,
    updated_at: timestamp,
    start: 0,
    duration: 3000,
    change: true,
    is_visible: true,
    layer: 1,
  };
  await db.blocks.add(data);
  await supabase.from("blocks").insert(data);
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
  await db.blocks.update(id, { [key]: value });
  await supabase
    .from("blocks")
    .update({ [key]: value })
    .eq("id", id);
};

export const addStyle = async (block_id: string, style_name: string) => {
  const data: StyleDBProps = {
    id: `${block_id}_${style_name}`,
    block_id,
    key: style_name,
    initial_style: "",
    final_style: "",
    created_at: dayjs().toISOString(),
    change: true,
    available: true,
  };
  await db.styles.add(data);
  await supabase.from("styles").insert(data);
};

export const updateStyle = async (
  id: string,
  type: "initial_style" | "final_style",
  value: string
) => {
  await db.styles.update(id, { [type]: value });
  await supabase
    .from("styles")
    .update({ id, [type]: value })
    .eq("id", id);
};

export const deleteStyle = async (id: string) => {
  await db.styles.delete(id);
  await supabase.from("styles").delete().eq("id", id);
};

export const getProjectSource = async (project_id: string) => {
  const { data, error } = await supabase
    .from("blocks")
    .select("*, styles ( * )")
    .eq("project_id", project_id);
  if (error || !data) {
    return null;
  } else {
    const editedStyles: StyleDBProps[] = [];
    const blocks = data.map((block) => {
      if (block.styles && Array.isArray(block.styles)) {
        editedStyles.push(...block.styles);
      }
      const { styles, ...rest } = block;
      return rest;
    });
    return { blocks, styles: editedStyles };
  }
};
