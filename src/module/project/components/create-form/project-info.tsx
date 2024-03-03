import { batteryTypeOptions } from "@enum/battery-type.enum";
import { panelTypeOptions } from "@enum/panel-type.enum";
import {
  Checkbox,
  Fieldset,
  Grid,
  Group,
  Radio,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";

interface ProjectInfoProps {
  form: any;
}

const ProjectInfo = (props: ProjectInfoProps) => {
  const { form } = props;

  return (
    <Stack gap="md">
      <Fieldset legend="Property (Optional)">
        <Grid>
          <Grid.Col span={6}>
            <TextInput
              label="Estimated Area"
              placeholder="estimated area"
              name="project.estimated_area"
              onChange={form.handleChange}
              type="number"
              value={form.values.project.estimated_area}
              error={
                form.touched?.project?.estimated_area &&
                form.errors?.project?.estimated_area &&
                form.errors?.project?.estimated_area
              }
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <TextInput
              label="Capacity"
              placeholder="capacity"
              name="project.capacity"
              onChange={form.handleChange}
              type="number"
              value={form.values.project.capacity}
              error={
                form.touched?.project?.capacity &&
                form.errors?.project?.capacity &&
                form.errors?.project?.capacity
              }
            />
          </Grid.Col>
        </Grid>
      </Fieldset>
      <Fieldset legend="Basic Features">
        <Grid>
          <Grid.Col span={6}>
            <Select
              searchable
              styles={{
                option: {
                  textTransform: "capitalize",
                },
              }}
              label="Solar Panel Type"
              placeholder="Solar Panel Type"
              data={panelTypeOptions}
              clearable
              value={form.values.project.panel_info}
              onChange={(value) =>
                form.setFieldValue("project.panel_info", value)
              }
              error={
                form.touched?.project?.panel_info &&
                form.errors?.project?.panel_info &&
                form.errors?.project?.panel_info
              }
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              searchable
              label="Battery Type"
              placeholder="battery type"
              styles={{
                option: {
                  textTransform: "capitalize",
                },
              }}
              data={batteryTypeOptions}
              clearable
              value={form.values.project.battery_type}
              onChange={(value) =>
                form.setFieldValue("project.battery_type", value)
              }
              error={
                form.touched?.project?.battery_type &&
                form.errors?.project?.battery_type &&
                form.errors?.project?.battery_type
              }
            />
          </Grid.Col>
        </Grid>
        <Grid mt="sm">
          <Grid.Col span={6}>
            <Radio.Group
              label="Cleaning"
              name="project.cleaning"
              onChange={(value) => {
                form.setFieldValue("project.cleaning", value);
              }}
              value={form.values.project.cleaning}
              error={
                form.touched?.project?.cleaning &&
                form.errors?.project?.cleaning &&
                form.errors?.project?.cleaning
              }
            >
              <Group mt="xs">
                <Radio value="yes" label="Yes" />
                <Radio value="no" label="No" />
              </Group>
            </Radio.Group>
          </Grid.Col>
        </Grid>
      </Fieldset>
      <Fieldset legend="Location">
        <Group align="flex-start">
          <Stack
            gap={0}
            style={{
              flex: 1,
            }}
          >
            <Checkbox
              label="Mark location as customer's location"
              name="project.mark_location_customer"
              checked={form.values?.project?.mark_location_customer}
              onChange={form.handleChange}
            />
            <Grid mt="xs">
              <Grid.Col span={6}>
                <TextInput
                  label="Longitude"
                  placeholder="longitude"
                  name="project.longitude"
                  onChange={form.handleChange}
                  disabled={form.values.project.mark_location_customer}
                  type="number"
                  value={form.values.project.longitude}
                  error={
                    form.touched?.project?.longitude &&
                    form.errors?.project?.longitude &&
                    form.errors?.project?.longitude
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Latitude"
                  placeholder="latitude"
                  name="project.latitude"
                  onChange={form.handleChange}
                  type="number"
                  value={form.values.project.latitude}
                  disabled={form.values.project.mark_location_customer}
                  error={
                    form.touched?.project?.latitude &&
                    form.errors?.project?.latitude &&
                    form.errors?.project?.latitude
                  }
                />
              </Grid.Col>
            </Grid>
            <TextInput
              label="Address"
              placeholder="Location"
              mt="sm"
              name="project.location"
              onChange={form.handleChange}
              disabled={form.values.project.mark_location_customer}
              value={form.values.project.location}
              error={
                form.touched?.project?.location &&
                form.errors?.project?.location &&
                form.errors?.project?.location
              }
            />
          </Stack>
          {/* <Box
            style={{
              flex: 1,
            }}
          >
            <LocationSelector
              location={{
                lat: form.values.project.latitude,
                lng: form.values.project.longitude,
              }}
              changeLocation={(location: LOCATION_SELECTOR) => {
                form.setFieldValue("project.latitude", location.lat);
                form.setFieldValue("project.longitude", location.lat);
              }}
            />
          </Box> */}
        </Group>
      </Fieldset>
    </Stack>
  );
};

export default ProjectInfo;
