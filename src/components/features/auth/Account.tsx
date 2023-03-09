"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ActionIcon, Avatar, Menu } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useSetAtom } from "jotai";

import type { User } from "@supabase/supabase-js";

import { sessionAtom } from "@/store/jotai";
import supabase from "@/utils/supabase";

const Account = () => {
  const router = useRouter();
  const setSesion = useSetAtom(sessionAtom);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then((r) => {
      setUser(r.data.user);
      console.log(r.data.user);
    });
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSesion(null);
    router.push("/");
  };

  return (
    <Menu arrowPosition="side">
      <Menu.Target>
        <Avatar
          src={user ? user.user_metadata.avatar_url : null}
          alt="アカウント情報"
          component={ActionIcon}
          color="blue"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={signOut} icon={<IconLogout />}>
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Account;
