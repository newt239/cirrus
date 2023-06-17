import Dexie, { Table } from "dexie";

import { BlockDBProps, ImageDBProps, StyleDBProps } from "~/types/db";

export class MySubClassedDexie extends Dexie {
  blocks!: Table<BlockDBProps>;
  styles!: Table<StyleDBProps>;
  images!: Table<ImageDBProps>;

  constructor() {
    super("cirrus");
    this.version(1).stores({
      blocks:
        "id, project_id, created_at, updated_at, name, start, duration, is_visible, type, change, layer",
      styles:
        "id, created_at, block_id, key, initial_style, final_style, change, available",
      images: "block_id, project_id, source, width, height",
    });
  }
}

export const db = new MySubClassedDexie();
