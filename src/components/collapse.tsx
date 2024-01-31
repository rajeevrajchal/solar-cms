import {
  ActionIcon,
  Flex,
  Stack,
  Collapse as MCollapse,
  Text,
} from "@mantine/core";
import { ReactElement, useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa6";

interface CollapseProps {
  content: ReactElement;
  title: string | ReactElement;
  isOpen?: boolean;
}

const Collapse = (props: CollapseProps) => {
  const { content, title, isOpen = false } = props;
  const [open, setOpen] = useState<boolean>(isOpen);

  return (
    <Stack gap={0}>
      <Flex align="center" gap={4}>
        {typeof title === "string" ? <Text fw="bold">{title}</Text> : title}
        <ActionIcon
          onClick={() => setOpen(!open)}
          variant="transparent"
          color="black"
        >
          {!open ? <FaCaretRight size={20} /> : <FaCaretDown size={20} />}
        </ActionIcon>
      </Flex>
      <MCollapse in={open}>{content}</MCollapse>
    </Stack>
  );
};

export default Collapse;
