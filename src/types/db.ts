import type { Database } from "~/libs/database.types";

export type ProjectDBProps = Database["public"]["Tables"]["projects"]["Row"];

export type BlockDBProps = Database["public"]["Tables"]["blocks"]["Row"];

export type StyleDBProps = Database["public"]["Tables"]["styles"]["Row"];

export type ImageDBProps = Database["public"]["Tables"]["images"]["Row"];

export type StyleProps = {
  key: string;
  initial_style: { [T in keyof gsap.TweenVars]: string };
  final_style: { [T in keyof gsap.TweenVars]: string };
};

export type BlockProps = BlockDBProps & StyleProps;
