import useBreadcrumb from "@hook/store/use-breadcrumb";
import { Anchor, Breadcrumbs } from "@mantine/core";
import { BiHomeAlt } from "react-icons/bi";

const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <Breadcrumbs separatorMargin="xs" fs="xs">
      {breadcrumbs.map((item, index) => (
        <Anchor href={item.path} key={index} size="xs">
          {item.name === "home" ? (
            <BiHomeAlt />
          ) : (
            <span
              style={{
                textTransform: "capitalize",
              }}
            >
              {item.name}
            </span>
          )}
        </Anchor>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
