import type { Database } from "~/lib/database.types";

export type ProjectDBProps = Database["public"]["Tables"]["projects"]["Row"];

export type BlockDBProps = Database["public"]["Tables"]["blocks"]["Row"];
