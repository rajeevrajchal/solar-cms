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
    onSubmit: (values) => {
      onSubmit(values?.csv?.[0]);
    },
  });

  return (
    <>
      <Button
        leftSection={<TbFileTypeCsv size={14} />}
        variant="light"
        onClick={() => setUploadCsv(true)}
      >
        Upload CSV
      </Button>
      <Modal opened={uploadCsv} close={() => setUploadCsv(false)}>
        <>
          <Dropzone
            maxFiles={1}
            files={uploadCsvFormik.values.csv || []}
            showPreview
            setFiles={(files: FileWithPath[]) =>
              uploadCsvFormik.setFieldValue("csv", files)
            }
          />
          <Group justify="flex-end">
            <Button variant="subtle" disabled={loading}>
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
