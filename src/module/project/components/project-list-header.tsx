import { Button, CloseButton, Flex, Select, TextInput } from "@mantine/core";
import { map } from "lodash";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";

import { PROJECT_TYPE_NAME } from "@enum/project-type.enum";
import { STATUS_NAME } from "@enum/status.enum";
import AppRoute from "@routes/route.constant";
import { useSearchParams } from "react-router-dom";

const ProjectListHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleStatusFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value === "" || value === null) {
      params.delete(key);
    } else {
      params.set(key, value.toLowerCase());
    }
    setSearchParams(params);
  };

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "" || value === null) {
      params.delete("query");
    } else {
      params.set("query", value.toLowerCase());
    }
    setSearchParams(params);
  };

  return (
    <Flex align="center" gap="md" wrap="wrap">
      <TextInput
        leftSection={<CiSearch />}
        placeholder="Search"
        className="w-full md:w-fit"
        rightSection={
          searchParams.get("query") ? (
            <CloseButton onClick={() => handleSearch("")} />
          ) : (
            ""
          )
        }
        value={searchParams.get("query") || ""}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Select
        searchable
        className="w-full md:w-fit"
        placeholder="Pick Type"
        data={map(PROJECT_TYPE_NAME, (v, k) => {
          return {
            label: v,
            value: k,
          };
        })}
        styles={{
          option: {
            textTransform: "capitalize",
          },
        }}
        clearable
        value={searchParams.get("p_type")?.toUpperCase() || ""}
        onChange={(value: string | null) => handleStatusFilter("p_type", value)}
        style={{
          textTransform: "capitalize",
        }}
      />
      <Select
        styles={{
          option: {
            textTransform: "capitalize",
          },
        }}
        searchable
        placeholder="Pick status"
        data={map(STATUS_NAME, (v, k) => {
          return {
            label: v,
            value: k,
          };
        })}
        clearable
        value={searchParams.get("status")?.toUpperCase() || ""}
        onChange={(value: string | null) => handleStatusFilter("status", value)}
        style={{
          textTransform: "capitalize",
        }}
      />
      <Button
        leftSection={<IoMdAdd size={14} />}
        variant="light"
        component="a"
        className="w-full md:w-fit"
        href={AppRoute.create_project}
      >
        Create
      </Button>
    </Flex>
  );
};

export default ProjectListHeader;
