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
      params.set(key, value);
    }
    setSearchParams(params);
  };

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "" || value === null) {
      params.delete("query");
    } else {
      params.set("query", value);
    }
    setSearchParams(params);
  };

  return (
    <Flex align="center" gap="md">
      <TextInput
        leftSection={<CiSearch />}
        placeholder="Search"
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
        placeholder="Pick Type"
        data={map(PROJECT_TYPE_NAME, (v, k) => {
          return {
            label: v,
            value: k,
          };
        })}
        clearable
        value={searchParams.get("p_type") || ""}
        onChange={(value: string | null) => handleStatusFilter("p_type", value)}
        style={{
          textTransform: "capitalize",
        }}
      />
      <Select
        searchable
        placeholder="Pick status"
        data={map(STATUS_NAME, (v, k) => {
          return {
            label: v,
            value: k,
          };
        })}
        clearable
        value={searchParams.get("status") || ""}
        onChange={(value: string | null) => handleStatusFilter("status", value)}
        style={{
          textTransform: "capitalize",
        }}
      />
      <Button
        leftSection={<IoMdAdd size={14} />}
        variant="light"
        component="a"
        href={AppRoute.create_project}
      >
        Create
      </Button>
    </Flex>
  );
};

export default ProjectListHeader;
