import { Button, Group } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useState } from "react";
import { TbFileTypeCsv } from "react-icons/tb";
import Modal from "./modal/modal";
import { useFormik } from "formik";
import Dropzone from "./dropzone";

interface UploadCSVProps {
  loading?: boolean;
  onSubmit: (values: FileWithPath) => void;
}
const UploadCSV = (props: UploadCSVProps) => {
  const { loading, onSubmit } = props;
  const [uploadCsv, setUploadCsv] = useState<boolean>(false);
  const uploadCsvFormik = useFormik({
    initialValues: {
      csv: [],
    },
    onSubmit: async (values, { resetForm }) => {
      await onSubmit(values?.csv?.[0]);
      setUploadCsv(false);
      resetForm();
    },
  });

  const handleCloseUploadCSV = () => {
    uploadCsvFormik?.resetForm();
    setUploadCsv(false);
  };

  return (
    <>
      <Button
        leftSection={<TbFileTypeCsv size={14} />}
        variant="light"
        onClick={() => {
          setUploadCsv(true);
          uploadCsvFormik.resetForm();
        }}
      >
        Upload CSV
      </Button>
      <Modal opened={uploadCsv} close={() => setUploadCsv(false)}>
        <>
          <Dropzone
            maxFiles={1}
            accept={{
              "text/html": [".csv"],
            }}
            files={uploadCsvFormik.values.csv || []}
            showPreview
            setFiles={(files: FileWithPath[]) =>
              uploadCsvFormik.setFieldValue("csv", files)
            }
          />
          <Group justify="flex-end">
            <Button
              variant="subtle"
              disabled={loading}
              onClick={() => handleCloseUploadCSV()}
            >
              Cancel
            </Button>
            <Button
              variant="light"
              loading={loading}
              disabled={loading}
              onClick={() => uploadCsvFormik.handleSubmit()}
            >
              Upload
            </Button>
          </Group>
        </>
      </Modal>
    </>
  );
};

export default UploadCSV;
