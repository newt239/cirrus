"use client";

import useStyles from "./styles";

const Hero: React.FC = () => {
  const { classes } = useStyles();
  return (
    <main>
      <div className={classes.hero}>
        <h1>動画制作を、もっと手軽に。</h1>
        <p>右上のサインインボタンをクリック</p>
      </div>
    </main>
  );
};

export default Hero;
