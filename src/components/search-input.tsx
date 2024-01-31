import { CloseButton, TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";

const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "" || value === null) {
      params.delete("search");
    } else {
      params.set("search", value);
    }
    setSearchParams(params);
  };

  return (
    <TextInput
      leftSection={<CiSearch />}
      placeholder="Search"
      rightSection={
        searchParams.get("search") ? (
          <CloseButton onClick={() => handleSearch("")} />
        ) : (
          ""
        )
      }
      value={searchParams.get("search") || ""}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default SearchInput;
