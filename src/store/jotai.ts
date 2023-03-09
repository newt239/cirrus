import { Session } from "@supabase/auth-helpers-nextjs";
import { atom } from "jotai";

import { BlockDBProps } from "@/types/db";

export const sessionAtom = atom<Session | null>(null);

export const blocksAtom = atom<BlockDBProps[]>([]);
