import { UnstyledButton } from "@mantine/core";

import useStyles from "./SignInWithGoogleButton.styles";

const SignInWithGoogleButton = () => {
  const { classes } = useStyles();
  return (
    <UnstyledButton className={classes.google_button}>
      Sign in with Google
    </UnstyledButton>
  );
};

export default SignInWithGoogleButton;
