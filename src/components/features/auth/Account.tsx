"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ActionIcon, Avatar, Menu } from "~/lib/mantine/core";

import { IconLogout } from "@tabler/icons-react";
import { useSetAtom } from "jotai";

import type { User } from "@supabase/supabase-js";

import { sessionAtom } from "~/store/jotai";
import supabase from "~/utils/supabase";

const Account = () => {
  const router = useRouter();
  const setSesion = useSetAtom(sessionAtom);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then((r) => {
      setUser(r.data.user);
    });
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSesion(null);
    router.push("/");
  };

  return (
    <Menu offset={0} position="bottom-end">
      <Menu.Target>
        <Avatar
          alt="アカウント情報"
          color="blue"
          component={ActionIcon}
          src={user ? user.user_metadata.avatar_url : null}
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconLogout />} onClick={signOut}>
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Account;
