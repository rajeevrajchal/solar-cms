import SearchInput from "@components/search-input";
import { QUOTE_STATUS, QUOTE_STATUS_NAME } from "@enum/quote-status.enum";
import { Button, Flex, Select } from "@mantine/core";
import AppRoute from "@routes/route.constant";
import { IoMdAdd } from "react-icons/io";
import { useSearchParams } from "react-router-dom";

const QuoteHeader = () => {
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

  return (
    <Flex align="center" gap="md">
      <SearchInput />
      <Select
        searchable
        placeholder="Select Status"
        data={[
          {
            label: QUOTE_STATUS_NAME[QUOTE_STATUS.DRAFT],
            value: QUOTE_STATUS.DRAFT,
          },
          {
            label: QUOTE_STATUS_NAME[QUOTE_STATUS.REJECTED],
            value: QUOTE_STATUS.REJECTED,
          },
          {
            label: QUOTE_STATUS_NAME[QUOTE_STATUS.ACCEPTED],
            value: QUOTE_STATUS.ACCEPTED,
          },
        ]}
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
        href={AppRoute.create_quote()}
      >
        Create Quote
      </Button>
    </Flex>
  );
};

export default QuoteHeader;
