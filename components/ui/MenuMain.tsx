import { Button } from "@nextui-org/react";
import { Icons } from "../icons/icons";

export const MenuMain = () => {
  const onMenuButtonClick = () => {};

  return (
    <>
      <Button
        isIconOnly
        color="default"
        aria-label="Theme"
        radius="md"
        variant="flat"
        onClick={onMenuButtonClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onMenuButtonClick();
          }
        }}
      >
        <Icons.menu />
      </Button>
    </>
  );
};
