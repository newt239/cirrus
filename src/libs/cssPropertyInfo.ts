import { CSSProperties } from "react";

type PropertyInfo = { label: string } & (
  | {
      component: "text";
      default: string;
    }
  | {
      component: "number";
      default: number;
      min: number;
      max: number;
    }
  | {
      component: "color";
      default: string;
    }
  | {
      component: "select";
      options: { value: string; label: string }[];
      default: string;
    }
);

export const cssPropertyInfo: { [key in keyof CSSProperties]: PropertyInfo } = {
  color: {
    component: "color",
    label: "文字色",
    default: "#000000",
  },
  backgroundColor: {
    component: "color",
    label: "背景色",
    default: "#ffffff",
  },
  borderRadius: {
    component: "number",
    label: "角丸",
    default: 0,
    min: 0,
    max: 100,
  },
  opacity: {
    component: "number",
    label: "透明度",
    default: 1,
    min: 0,
    max: 1,
  },
  fontSize: {
    component: "number",
    label: "文字サイズ",
    default: 16,
    min: 5,
    max: 100,
  },
};
