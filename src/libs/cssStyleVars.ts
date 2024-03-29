export type StyleVarsProps = { label: string } & (
  | {
      component: "text";
      default: string;
      change: boolean;
    }
  | {
      component: "number";
      default: number;
      min: number;
      max: number;
      precision: number;
      change: boolean;
    }
  | {
      component: "color";
      default: string;
      change: boolean;
    }
  | {
      component: "select";
      options: { value: string; label: string }[];
      default: string;
      change: boolean;
    }
);

export const styleVars: { [key in keyof gsap.TweenVars]: StyleVarsProps } = {
  textContent: {
    component: "text",
    label: "テキスト",
    default: "",
    change: false,
  },
  color: {
    component: "color",
    label: "文字色",
    default: "#ffffff",
    change: true,
  },
  backgroundColor: {
    component: "color",
    label: "背景色",
    default: "#ffffff",
    change: true,
  },
  borderRadius: {
    component: "number",
    label: "角丸",
    default: 0,
    min: 0,
    max: 100,
    precision: 2,
    change: true,
  },
  opacity: {
    component: "number",
    label: "透明度",
    default: 1,
    min: 0,
    max: 1,
    precision: 2,
    change: true,
  },
  scale: {
    component: "number",
    label: "大きさ",
    default: 1,
    min: 0,
    max: 100,
    precision: 2,
    change: true,
  },
  translateX: {
    component: "number",
    label: "X軸移動",
    default: 0,
    min: -1000,
    max: 1000,
    precision: 2,
    change: true,
  },
  translateY: {
    component: "number",
    label: "Y軸移動",
    default: 0,
    min: -1000,
    max: 1000,
    precision: 2,
    change: true,
  },
};
