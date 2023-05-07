import { BackgroundImage, Box, Text, Title } from "~/libs/mantine/core";

const Hero: React.FC = () => {
  return (
    <BackgroundImage h="100vh" src="/images/hero.png">
      <Box p="lg">
        <Title bg="white" order={1} w="fit-content">
          動画制作を、もっと手軽に。
        </Title>
        <Text color="white">右上のサインインボタンをクリック</Text>
      </Box>
    </BackgroundImage>
  );
};

export default Hero;
