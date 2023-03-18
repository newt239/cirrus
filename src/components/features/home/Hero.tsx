import { Box, Title } from "@mantine/core";

const Hero: React.FC = () => {
  return (
    <main>
      <Box
        sx={{
          textAlign: "center",
          margin: "30vh 0px",
        }}
      >
        <Title order={1}>動画制作を、もっと手軽に。</Title>
        <p>右上のサインインボタンをクリック</p>
      </Box>
    </main>
  );
};

export default Hero;
