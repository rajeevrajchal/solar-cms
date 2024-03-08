import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { DropzoneProps, Dropzone as MDropzone } from "@mantine/dropzone";
import { FaRegFileAlt, FaTrash } from "react-icons/fa";

interface DropzonePropsInterface extends Partial<DropzoneProps> {
  setFiles: (files: any) => void;
  files: any;
  showPreview?: boolean;
  error?: string;
}
const Dropzone = (props: DropzonePropsInterface) => {
  const { setFiles, files, showPreview = false, error } = props;

  const handleRemove = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  return (
    <Stack>
      <MDropzone
        onDrop={(files) => setFiles(files)}
        {...props}
        autoFocus={false}
      >
        <Group
          justify="center"
          gap="xl"
          mih={100}
          style={{ pointerEvents: "none" }}
        >
          <MDropzone.Idle>
            <FaRegFileAlt size={40} />
          </MDropzone.Idle>
          <Text size="sm" inline>
            Drag images here or click to select files
          </Text>
        </Group>
      </MDropzone>
      {error && (
        <Text size="sm" c="red">
          {error}
        </Text>
      )}
      {showPreview ? (
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          {files.map((file: any, index: number) => {
            if (file.type.includes("image")) {
              const imageUrl = URL.createObjectURL(file);
              return (
                <Box pos="relative" key={`file-preview-${index}`}>
                  <Image
                    key={index}
                    src={imageUrl}
                    radius="md"
                    onLoad={() => URL.revokeObjectURL(imageUrl)}
                  />
                  <ActionIcon
                    pos="absolute"
                    top={-8}
                    right={-8}
                    radius="xl"
                    size="md"
                    color="gray"
                    onClick={() => handleRemove(index)}
                  >
                    <FaTrash size={18} />
                  </ActionIcon>
                </Box>
              );
            }
            return (
              <Paper
                p="md"
                withBorder
                pos="relative"
                key={`file-preview-${index}`}
              >
                <Flex align="center" gap="md">
                  <span>
                    <FaRegFileAlt size={32} />
                  </span>
                  <Text>{file.name}</Text>
                </Flex>
                <ActionIcon
                  pos="absolute"
                  top={-12}
                  right={-8}
                  radius="xl"
                  size="md"
                  color="gray"
                  onClick={() => handleRemove(index)}
                >
                  <FaTrash size={18} />
                </ActionIcon>
              </Paper>
            );
          })}
        </SimpleGrid>
      ) : null}
    </Stack>
  );
};

export default Dropzone;
