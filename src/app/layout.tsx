import "server-only";

import "~/app/globals.css";

import RootStyleRegistry from "./emtion";

import SupabaseListener from "~/components/common/SupabaseListner";
import SupabaseProvider from "~/components/common/SupabaseProvider";
import Wrapper from "~/components/features/header/Wrapper";
import supabase from "~/utils/supabase";

type Props = {
  children: React.ReactNode;
};

export const revalidate = 0;

export default async function RootLayout({ children }: Props) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="ja">
      <body>
        <SupabaseProvider>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <RootStyleRegistry>
            <Wrapper>{children}</Wrapper>
          </RootStyleRegistry>
        </SupabaseProvider>
      </body>
    </html>
  );
}
