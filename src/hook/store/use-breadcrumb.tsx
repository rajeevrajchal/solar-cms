import { createContext, ReactElement, useContext } from "react";
import { useLocation } from "react-router-dom";

type Breadcrumb = {
  path: string;
  name: string;
  isActive: boolean;
};

interface BreadcrumbContextType {
  breadcrumbs: Breadcrumb[];
}

const breadCrumbContext = createContext<BreadcrumbContextType>({
  breadcrumbs: [],
});

const { Provider } = breadCrumbContext;

const useBreadcrumbData = () => {
  const location = useLocation();

  const paths = location.pathname.split("/").filter((p: string) => p);
  const breadcrumbs: Breadcrumb[] = [];

  paths.reduce((prevPath: string, currPath: string) => {
    const path = currPath === "document" ? "documents" : currPath;

    const breadcrumbPath = `${prevPath}/${path}`;

    breadcrumbs.push({
      path: breadcrumbPath,
      name: path === "" ? "Home" : !isNaN(Number(path)) ? path : path,
      isActive: breadcrumbPath === location.pathname,
    });

    return breadcrumbPath;
  }, "");

  return {
    breadcrumbs: [
      {
        path: "/",
        name: "home",
        isActive: location.pathname === "/",
      },
      ...breadcrumbs,
    ],
  };
};

export const BreadcrumbProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const data = useBreadcrumbData();
  return <Provider value={data}>{children}</Provider>;
};

const useBreadcrumb = () => useContext(breadCrumbContext);

// eslint-disable-next-line react-refresh/only-export-components
export default useBreadcrumb;
