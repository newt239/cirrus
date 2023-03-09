import "server-only";

import "@/app/globals.css";

import SupabaseListener from "@/components/supabase-listener";
import SupabaseProvider from "@/components/supabase-provider";
import supabase from "@/utils/supabase";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="ja">
      <head />
      <body>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
