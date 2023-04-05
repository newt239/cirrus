import { Box, Button, type ButtonProps } from "~/lib/mantine/core";

type Props = {
  children: React.ReactNode;
} & ButtonProps;

const MenuBarButton = ({ children, ...props }: Props) => {
  return (
    <Button
      h="100%"
      size="sm"
      sx={(theme) => ({
        borderRadius: "0.25rem 0.25rem 0px 0px",
        borderColor: "transparent",
        borderBottomColor: theme.colors.gray[2],
        ":hover": {
          borderColor: theme.colors.gray[2],
        },
      })}
      variant="default"
      {...props}
    >
      {children}
    </Button>
  );
};

export default MenuBarButton;
