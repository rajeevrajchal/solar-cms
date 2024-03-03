import { Box, Flex, Stack, Text } from "@mantine/core";
import sortBy from "lodash/sortBy";
import {
  DataTable,
  DataTableColumn,
  DataTableProps,
  DataTableRowExpansionProps,
  DataTableSortStatus,
  DataTableVerticalAlign,
} from "mantine-datatable";
import { ReactElement, useEffect, useState } from "react";

const PAGE_SIZE = 15;

interface TableProps extends Omit<DataTableProps, "columns" | "fetching"> {
  columns: DataTableColumn[];
  data: any;
  fetching?: boolean;
  isNested?: boolean;
  idAccessor?: string;
  headerContent?: ReactElement | null;
  headerLeftContent?: ReactElement | null;
  rowExpansion?: DataTableRowExpansionProps;
  rowColor?: any;
  rowClassName?: any;
  rowBackgroundColor?: any;
  label?: string;
  verticalAlign?: DataTableVerticalAlign;
  totalRecords?: number;
  currentPage?: number;
  changeCurrentPage?: (page: number) => void;
}

const Table = (props: TableProps) => {
  const {
    data,
    columns,
    fetching,
    rowExpansion,
    idAccessor,
    headerContent,
    headerLeftContent,
    rowColor,
    rowBackgroundColor,
    label,
    totalRecords,
    verticalAlign = "center",
    currentPage,
    changeCurrentPage,
  } = props;

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<any>>({
    columnAccessor: "system_name",
    direction: "asc",
  });

  const getData = (rows: any) => {
    const dataS = sortBy(rows, sortStatus.columnAccessor);
    return sortStatus.direction === "desc" ? dataS.reverse() : dataS;
  };

  const [page, setPage] = useState<number>(1);
  const [records, setRecords] = useState(data.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(data.slice(from, to));
  }, [page, data]); // Include 'data' in the dependencies

  useEffect(() => {
    if (currentPage) {
      const from = (currentPage - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE;
      setRecords(data.slice(from, to));
      setPage(currentPage);
    }
  }, [currentPage, data]);

  return (
    <Stack w="auto" gap="xs">
      <Flex
        align={{
          base: label || headerLeftContent ? "flex-start" : "flex-end",
          sm: "center",
        }}
        justify={label || headerLeftContent ? "space-between" : "flex-end"}
        gap={{
          base: "xs",
          sm: "md",
        }}
        w="100%"
        direction={{
          base: "column",
          sm: "row",
        }}
      >
        {label && (
          <Text w="w-fit" fw="bold">
            {label}
          </Text>
        )}
        {headerLeftContent && <Box>{headerLeftContent}</Box>}
        <Box>{headerContent}</Box>
      </Flex>
      <DataTable
        withTableBorder
        borderRadius="md"
        verticalAlign={verticalAlign}
        striped
        highlightOnHover
        fetching={fetching}
        records={getData(currentPage ? data : records) || []}
        columns={columns}
        noRecordsText="No records to show"
        idAccessor={idAccessor || "id"}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        rowExpansion={rowExpansion}
        rowColor={rowColor}
        rowBackgroundColor={rowBackgroundColor}
        minHeight={250}
        totalRecords={totalRecords || data.length || 0}
        recordsPerPage={PAGE_SIZE}
        page={currentPage || page}
        onPageChange={changeCurrentPage ? changeCurrentPage : (p) => setPage(p)}
      />
    </Stack>
  );
};

export default Table;
