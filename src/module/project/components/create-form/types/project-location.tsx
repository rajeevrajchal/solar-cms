import { Fieldset, Grid, NumberInput, Stack } from "@mantine/core";

interface ProjectLocationProps {
  form: any;
}

const ProjectLocation = (props: ProjectLocationProps) => {
  const { form } = props;

  return (
    <Fieldset legend="Location">
      <Stack>
        <Grid>
          <Grid.Col
            span={{
              md: 3,
            }}
          >
            <NumberInput
              label="Latitude"
              placeholder="latitude"
              name="project.latitude"
              min={0}
              step={0.1}
              onChange={(value) =>
                form.setFieldValue("project.latitude", value)
              }
              value={form.values.project.latitude}
              error={
                form.touched?.project?.latitude &&
                form.errors?.project?.latitude &&
                form.errors?.project?.latitude
              }
            />
          </Grid.Col>
          <Grid.Col
            span={{
              md: 3,
            }}
          >
            <NumberInput
              label="Longitude"
              placeholder="longitude"
              name="project.longitude"
              min={0}
              step={0.1}
              onChange={(value) =>
                form.setFieldValue("project.longitude", value)
              }
              value={form.values.project.longitude}
              error={
                form.touched?.project?.longitude &&
                form.errors?.project?.longitude &&
                form.errors?.project?.longitude
              }
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </Fieldset>
  );
};

export default ProjectLocation;
