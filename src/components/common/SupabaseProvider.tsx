"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "~/lib/database.types";

import { createClient } from "~/utils/supabase-browser";

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [supabase] = useState(() => createClient());
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  );
};

export default SupabaseProvider;
