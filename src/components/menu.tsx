/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu as MMenu } from "@mantine/core";
import { filter, omit } from "lodash";
import React, { ReactNode, useState } from "react";

interface MenuGroup {
  label: string;
  items: any[];
}

type MenuEntry = any | MenuGroup;

interface MenuProps {
  trigger: ReactNode;
  position?: any;
  menu: MenuEntry[];
}

const Menu = (props: MenuProps) => {
  const { trigger, menu, position } = props;
  const [opened, setOpened] = useState<boolean>(false);

  const handleToggle = () => {
    setOpened((prevOpened: boolean) => !prevOpened);
  };

  return (
    <MMenu
      opened={opened}
      onChange={handleToggle}
      shadow="md"
      withArrow
      arrowSize={12}
      position={position}
    >
      <MMenu.Target>{trigger}</MMenu.Target>
      <MMenu.Dropdown
        style={{
          minWidth: "150px",
        }}
      >
        {filter(menu, (menuItem) => !menuItem.disable).map((entry, index) => (
          <React.Fragment key={index}>
            {"label" in entry ? (
              <React.Fragment>
                <MMenu.Label>{entry.label}</MMenu.Label>
                {filter(
                  entry.items,
                  (menuItemEntry) => !menuItemEntry.disable
                ).map((item: any, itemIndex: number) => (
                  <MMenu.Item key={itemIndex} {...omit(item, "disable")} />
                ))}
              </React.Fragment>
            ) : (
              <MMenu.Item {...entry} />
            )}
          </React.Fragment>
        ))}
      </MMenu.Dropdown>
    </MMenu>
  );
};

export default Menu;
