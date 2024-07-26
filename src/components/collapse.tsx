import {
  ActionIcon,
  Flex,
  Collapse as MCollapse,
  Stack,
  Text,
} from "@mantine/core";
import { ReactElement, useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa6";

interface CollapseProps {
  content: ReactElement;
  title: string | ReactElement;
  isOpen?: boolean;
  is_normal_title?: boolean;
  smaller?: boolean;
}

const Collapse = (props: CollapseProps) => {
  const { content, title, isOpen = false, is_normal_title, smaller } = props;
  const [open, setOpen] = useState<boolean>(isOpen);

  return (
    <Stack gap={2}>
      <Flex
        align="center"
        gap={4}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      >
        {typeof title === "string" ? (
          <Text
            size={smaller ? "sm" : "md"}
            fw={is_normal_title ? "normal" : "bold"}
          >
            {title}
          </Text>
        ) : (
          title
        )}
        <ActionIcon
          variant="transparent"
          color="black"
          size={smaller ? "xs" : "sm"}
        >
          {!open ? (
            <FaCaretRight size={smaller ? 10 : 20} />
          ) : (
            <FaCaretDown size={smaller ? 10 : 20} />
          )}
        </ActionIcon>
      </Flex>
      <MCollapse in={open}>{content}</MCollapse>
    </Stack>
  );
};

export default Collapse;
