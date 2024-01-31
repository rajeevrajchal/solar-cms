import Table from "@components/table";
import { DataTableColumn } from "mantine-datatable";
import VendorHeader from "../components/vendor-header";
import useVendors from "@hook/data/vendor/user-vendors";
import VendorAction from "../components/vendor-action";
import VendorCreateEdit from "../components/vendor-create-edit";

const VendorList = () => {
  const { loading, vendors } = useVendors();

  const columns: DataTableColumn[] = [
    {
      accessor: "name",
      title: "Name",
      sortable: true,
      textAlign: "left",
      ellipsis: true,
    },
    {
      accessor: "code",
      title: "Code",
      sortable: true,
      textAlign: "left",
      ellipsis: true,
    },
    {
      accessor: "id",
      title: "",
      textAlign: "left",
      width: 100,
      ellipsis: true,
      render: (record: any) => {
        if (record?.code?.toLowerCase() !== "UN-O1".toLowerCase()) {
          return <VendorAction vendor_id={record.id} />;
        }
        return null;
      },
    },
  ];

  return (
    <>
      <Table
        label="Vendors"
        headerContent={<VendorHeader />}
        columns={columns}
        data={vendors || []}
        fetching={loading}
      />
      <VendorCreateEdit />
    </>
  );
};

export default VendorList;
