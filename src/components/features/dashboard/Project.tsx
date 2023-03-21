"use client";

import NextLink from "next/link";

import { Button, Card, Group, Image, Text } from "@/lib/mantine/core";

type Props = {
  id: string;
  name: string;
  thumbnail?: string;
};

const Project: React.FC<Props> = ({ id, name, thumbnail }) => {
  return (
    <Card p="lg" radius="md" shadow="sm" withBorder>
      <Card.Section>
        <Image
          alt={`${name}のサムネイル`}
          height={160}
          src={thumbnail ? thumbnail : null}
          withPlaceholder
        />
      </Card.Section>

      <Group mb="xs" mt="md" position="apart">
        <Text weight={500}>{name}</Text>
      </Group>
      <NextLink href={`/${id}/`}>
        <Button fullWidth variant="light">
          開く
        </Button>
      </NextLink>
    </Card>
  );
};

export default Project;
