import "server-only";

import "~/app/globals.css";

import MantineProvider from "~/components/common/MantineProvider";
import SupabaseListener from "~/components/common/SupabaseListner";
import SupabaseProvider from "~/components/common/SupabaseProvider";
import supabase from "~/utils/supabase";

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
          <MantineProvider>{children}</MantineProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
