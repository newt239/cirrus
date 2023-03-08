import { Session } from "@supabase/auth-helpers-nextjs";
import { atom } from "jotai";

export const sessionAtom = atom<null | Session>(null);
