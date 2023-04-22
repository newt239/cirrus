import "server-only";

import "~/app/globals.css";

import { Flex } from "~/libs/mantine/core";

import RootStyleRegistry from "./emtion";

import SupabaseProvider from "~/components/common/SupabaseProvider";
import Header from "~/components/features/header/Header";

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
            <Flex direction="column" h="100vh">
              <Header />
              <Flex h="100%">{children}</Flex>
            </Flex>
          </RootStyleRegistry>
        </SupabaseProvider>
      </body>
    </html>
  );
};

export default RootLayout;
