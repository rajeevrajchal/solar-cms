import type { BadgeProps } from "@mantine/core";
import { Badge, Tooltip } from "@mantine/core";

interface CustomBadgeProps extends BadgeProps {
  tooltip?: string;
}

const CustomBadge = (props: CustomBadgeProps) => {
  const {
    children,
    size = "md",
    radius = "lg",
    variant = "light",
    color,
    tooltip,
    ...rest
  } = props;

  return (
    <Tooltip label={String(tooltip)} tt="capitalize" className="cursor-pointer">
      <Badge
        size={size}
        radius={radius}
        variant={variant}
        color={color}
        w="150px"
        py="sm"
        {...rest}
        className="cursor-pointer"
      >
        {children}
      </Badge>
    </Tooltip>
  );
};

export default CustomBadge;
