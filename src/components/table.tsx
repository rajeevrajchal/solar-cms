/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ReactElement, useState } from "react";

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
    verticalAlign = "center",
  } = props;
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<any>>({
    columnAccessor: "system_name",
    direction: "asc",
  });

  const getData = (rows: any) => {
    const dataS = sortBy(rows, sortStatus.columnAccessor);
    return sortStatus.direction === "desc" ? dataS.reverse() : dataS;
  };

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
        records={getData(data) || []}
        columns={columns}
        noRecordsText="No records to show"
        idAccessor={idAccessor || "id"}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        rowExpansion={rowExpansion}
        rowColor={rowColor}
        rowBackgroundColor={rowBackgroundColor}
        minHeight={150}
      />
    </Stack>
  );
};

export default Table;
