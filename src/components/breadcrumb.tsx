import useBreadcrumb from "@hook/store/use-breadcrumb";
import { Anchor, Breadcrumbs } from "@mantine/core";
import { BiHomeAlt } from "react-icons/bi";

const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <Breadcrumbs separatorMargin="xs" fs="xs" className="flex-wrap">
      {breadcrumbs.map((item, index) => (
        <Anchor
          href={item.path}
          key={index}
          size="xs"
          className="capitalize max-w-[100px] md:w-fit md:max-w-fit overflow-hidden whitespace-nowrap text-ellipsis "
        >
          {item.name === "home" ? <BiHomeAlt /> : item.name}
        </Anchor>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
