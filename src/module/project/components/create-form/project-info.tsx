import { PROJECT_TYPE } from "@enum/project-type.enum";
import {
  Fieldset,
  Grid,
  GridCol,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { map } from "lodash";

interface ProjectInfoProps {
  form: any;
}

const ProjectInfo = (props: ProjectInfoProps) => {
  const { form } = props;

  console.log("the form", form.values);

  return (
    <Stack gap="md">
      <Fieldset legend="Info">
        <Grid>
          <GridCol
            span={{
              md: 6,
            }}
          >
            <Select
              searchable
              styles={{
                option: {
                  textTransform: "capitalize",
                },
              }}
              label="Select type"
              placeholder="Select Type"
              clearable
              value={form.values.customer.customer_id}
              data={map(PROJECT_TYPE, (v, k) => ({
                label: k,
                value: v,
              }))}
            />
          </GridCol>
        </Grid>
      </Fieldset>
      <Fieldset legend="Address">
        <Stack gap="3">
          <Grid>
            <GridCol
              span={{
                md: 6,
              }}
            >
              <TextInput
                label="Latitude"
                placeholder="latitude"
                name="project.latitude"
                value={form.values.project.latitude}
                onChange={form.handleChange}
                error={
                  form.touched?.project?.latitude &&
                  form.errors?.project?.latitude &&
                  form.errors?.project?.latitude
                }
              />
            </GridCol>
            <GridCol
              span={{
                md: 6,
              }}
            >
              <TextInput
                label="Longitude"
                placeholder="longitude"
                name="project.longitude"
                value={form.values.project.longitude}
                onChange={form.handleChange}
                error={
                  form.touched?.project?.longitude &&
                  form.errors?.project?.longitude &&
                  form.errors?.project?.longitude
                }
              />
            </GridCol>
          </Grid>
          <TextInput
            label="Location"
            placeholder="location"
            name="project.location"
            value={form.values.project.location}
            onChange={form.handleChange}
            error={
              form.touched?.project?.location &&
              form.errors?.project?.location &&
              form.errors?.project?.location
            }
          />
        </Stack>
      </Fieldset>
    </Stack>
  );
};

export default ProjectInfo;
