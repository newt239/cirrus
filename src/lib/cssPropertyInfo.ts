import { CSSProperties } from "react";

type PropertyInfo = { label: string } & (
  | {
      component: "text";
      default: string;
    }
  | {
      component: "number";
      default: number;
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
};
