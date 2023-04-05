import { Box, Button, type ButtonProps } from "~/lib/mantine/core";

type Props = {
  children: React.ReactNode;
} & ButtonProps;

const MenuBarButton = ({ children, ...props }: Props) => {
  return (
    <Button
      h="100%"
      size="xs"
      sx={{ borderRadius: "0.25rem 0.25rem 0px 0px", borderBottom: "none" }}
      variant="default"
      {...props}
    >
      {children}
    </Button>
  );
};

export default MenuBarButton;
