import { createStyles } from "@mantine/core";

export default createStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    position: "sticky",
    top: 0,
    zIndex: 1100,
    backdropFilter: "blur(8px)",
    boxShadow: "inset 0px -1px 1px #e7ebf0",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
}));
