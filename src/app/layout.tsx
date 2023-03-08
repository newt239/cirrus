import "server-only";

import "@/app/globals.css";

import Header from "@/components/block/Header";
import SupabaseListener from "@/components/supabase-listener";
import SupabaseProvider from "@/components/supabase-provider";
import supabase from "@/utils/supabase";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="ja">
      <head />
      <body>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <Header />
          {children}
        </SupabaseProvider>
      </body>
    </html>
  );
}
