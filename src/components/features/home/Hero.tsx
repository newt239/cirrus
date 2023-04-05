import { BackgroundImage, Box, Text, Title } from "~/lib/mantine/core";

const Hero: React.FC = () => {
  return (
    <BackgroundImage h="calc(100vh - 105px)" src="/images/hero.png">
      <Box p="lg" sx={{ textShadow: "2px 2px 2px rgba(0,0,0,0.5)" }}>
        <Title color="white" order={1}>
          動画制作を、もっと手軽に。
        </Title>
        <Text color="white">右上のサインインボタンをクリック</Text>
      </Box>
    </BackgroundImage>
  );
};

export default Hero;
