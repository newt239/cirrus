import "server-only";

import "~/app/globals.css";

import RootStyleRegistry from "./emtion";

import SupabaseProvider from "~/components/common/SupabaseProvider";
import Wrapper from "~/components/features/header/Wrapper";

type Props = {
  children: React.ReactNode;
};

export const revalidate = 0;

const RootLayout = async ({ children }: Props) => {
  return (
    <html lang="ja">
      <body>
        <SupabaseProvider>
          <RootStyleRegistry>
            <Wrapper>{children}</Wrapper>
          </RootStyleRegistry>
        </SupabaseProvider>
      </body>
    </html>
  );
};

export default RootLayout;
