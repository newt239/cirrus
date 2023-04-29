import { nanoid } from "nanoid";

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

export const getBlock = async (id: string) => {
  const { data, error } = await supabase
    .from("blocks")
    .select("*, styles ( key, initial_style, final_style )")
    .eq("id", id);
  if (error || !data || data.length !== 1) {
    return null;
  } else {
    const initial_style: { [T in keyof gsap.TweenVars]: string } = {};
    const final_style: { [T in keyof gsap.TweenVars]: string } = {};
    if (data[0].styles && Array.isArray(data[0].styles)) {
      data[0].styles.map((style) => {
        initial_style[style.key as keyof gsap.TweenVars] = style.initial_style;
        if (style.key !== "textContent") {
          final_style[style.key as keyof gsap.TweenVars] = style.final_style;
        }
      });
    }
    const { styles, ...rest } = data[0];
    return { ...rest, initial_style, final_style };
  }
};

export const getBlocks = async (project_id: string) => {
  const { data, error } = await supabase
    .from("blocks")
    .select("*, styles ( key, initial_style, final_style )")
    .eq("project_id", project_id);
  if (error || !data) {
    return null;
  } else {
    const editedData = data.map((block) => {
      const initial_style: { [T in keyof gsap.TweenVars]: string } = {};
      const final_style: { [T in keyof gsap.TweenVars]: string } = {};
      if (block.styles && Array.isArray(block.styles)) {
        block.styles.map((style) => {
          initial_style[style.key as keyof gsap.TweenVars] =
            style.initial_style;
          if (style.key !== "textContent") {
            final_style[style.key as keyof gsap.TweenVars] = style.final_style;
          }
        });
      }
      const { styles, ...rest } = block;
      return { ...rest, initial_style, final_style };
    });
    return editedData;
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
