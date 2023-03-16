import useStyles from "./styles";

import { UnstyledButton } from "@/lib/mantine/core";

const SignInWithGoogleButton = ({
  ...props
}: React.ComponentPropsWithRef<"button">) => {
  const { classes } = useStyles();
  return (
    <UnstyledButton className={classes.google_button} {...props}>
      Sign in with Google
    </UnstyledButton>
  );
};

export default SignInWithGoogleButton;
