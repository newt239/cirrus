"use client";

import NextLink from "next/link";

import { Button, Card, Group, Image, Text } from "@mantine/core";

type Props = {
  id: string;
  name: string;
  thumbnail?: string;
};

const Project: React.FC<Props> = ({ id, name, thumbnail }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={thumbnail ? thumbnail : null}
          height={160}
          alt={`${name}のサムネイル`}
          withPlaceholder
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{name}</Text>
      </Group>
      <NextLink href={`/${id}/studio`}>
        <Button fullWidth variant="light">
          開く
        </Button>
      </NextLink>
    </Card>
  );
};

export default Project;
