import { includes } from "lodash";
import VendorForm from "./vendor-form";
import { useSearchParams } from "react-router-dom";
import Modal from "@components/modal/modal";
import useVendor from "@hook/data/vendor/use-vendor";
import { Loader } from "@mantine/core";

const VendorCreateEdit = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, vendor } = useVendor();

  const handleClose = () => {
    setSearchParams({});
  };

  return (
    <Modal
      opened={includes(["create", "edit"], searchParams.get("type"))}
      close={() => {}}
    >
      {loading ? (
        <Loader />
      ) : (
        <VendorForm onClose={handleClose} data={vendor} />
      )}
    </Modal>
  );
};

export default VendorCreateEdit;
