import { createStyles } from "@/lib/mantine/core";

export default createStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    position: "sticky",
    top: 0,
    zIndex: 1100,
    backdropFilter: "blur(8px)",
    boxShadow: "inset 0px -1px 1px #e7ebf0",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
}));
