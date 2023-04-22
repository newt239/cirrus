import { Button, clsx, type ButtonProps } from "~/libs/mantine/core";

type Props = {
  children: React.ReactNode;
} & ButtonProps;

const MenuBarButton = ({ children, ...props }: Props) => {
  return (
    <Button
      className={clsx(
        "border-transparent",
        "rounded-t",
        "border-b-mantine-gray-2",
        "hover:border-mantine-gray-2"
      )}
      h="100%"
      px="sm"
      py="sm"
      size="md"
      variant="default"
      {...props}
    >
      {children}
    </Button>
  );
};

export default MenuBarButton;
