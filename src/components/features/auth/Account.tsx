"use client";

import { useEffect, useState } from "react";

import { Avatar, Box, Button, Popover, Text } from "@mantine/core";

import type { User } from "@supabase/supabase-js";

import supabase from "@/utils/supabase";

const Account = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then((r) => {
      setUser(r.data.user);
    });
    console.log(user);
  }, []);

  return (
    <Box>
      <Popover>
        <Popover.Target>
          <Avatar
            src={user?.user_metadata.avatar_url}
            alt="ユーザーアバター"
            component={Button}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <Text>hi</Text>
        </Popover.Dropdown>
      </Popover>
    </Box>
  );
};

export default Account;
