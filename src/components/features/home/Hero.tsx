import { BackgroundImage, Box, clsx, Text, Title } from "~/lib/mantine/core";

const Hero: React.FC = () => {
  return (
    <BackgroundImage h="100vh" src="/images/hero.png">
      <Box p="lg">
        <Title className={clsx("w-fit", "bg-white")} order={1}>
          動画制作を、もっと手軽に。
        </Title>
        <Text color="white">右上のサインインボタンをクリック</Text>
      </Box>
    </BackgroundImage>
  );
};

export default Hero;
