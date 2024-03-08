import { Button, Group } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { useFormik } from "formik";
import { useState } from "react";
import { TbFileTypeCsv } from "react-icons/tb";
import * as Yup from "yup";
import Dropzone from "./dropzone";
import Modal from "./modal/modal";

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
    validationSchema: Yup.object().shape({
      csv: Yup.array()
        .min(1, "Csv file is required")
        .required("Csv file is required"),
    }),
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
            error={
              uploadCsvFormik?.errors.csv && uploadCsvFormik?.touched?.csv
                ? (uploadCsvFormik?.errors.csv as string)
                : ""
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
