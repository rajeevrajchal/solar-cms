import {
  Stack,
  Fieldset,
  Grid,
  TextInput,
  Select,
  Radio,
  Group,
} from "@mantine/core";
import { PROJECTS } from "@model/project";
import { useNavigate } from "react-router-dom";
import ProjectInsightHeader from "./insight-header";
import { panelTypeOptions } from "@enum/panel-type.enum";
import { batteryTypeOptions } from "@enum/battery-type.enum";
import { useFormik } from "formik";
import useProjectMutate from "@hook/data/project/use-project-mutate";

interface InfoViewSetupProps {
  project: PROJECTS;
}

const InfoViewSetup = (props: InfoViewSetupProps) => {
  const { project } = props;
  const navigate = useNavigate();
  const { projectInsight } = useProjectMutate();

  const inSightForm: any = useFormik({
    initialValues: {
      sun_hours: {
        sun_hour_summer: project?.sun_hour_summer || "",
        sun_hour_winter: project?.sun_hour_winter || "",
        sun_hour_monsoon: project?.sun_hour_monsoon || "",
      },
      project: {
        panel_info: project?.panel_info || "",
        battery_type: project?.battery_type || "",
        cleaning: project?.cleaning || "yes",
        latitude: project?.latitude || 51.505,
        longitude: project?.longitude || -0.09,
        location: project?.location || "",
        actual_area: project?.actual_area || "",
        capacity: project?.capacity || "",
      },
    },
    onSubmit: (values) => {
      projectInsight.mutate({
        id: project.id,
        ...values,
      });
    },
  });

  const onBack = () => {
    inSightForm.resetForm();
    navigate(-1);
  };

  return (
    <Stack gap="md">
      <ProjectInsightHeader
        project={project}
        loading={projectInsight.isPending}
        onContinue={() => inSightForm.handleSubmit()}
        onBack={() => onBack()}
      />

      {/* property */}
      <Fieldset legend="Property">
        <Grid>
          <Grid.Col span={4}>
            <TextInput
              label="Estimated Area"
              placeholder="estimated area"
              name="project.estimated_area"
              onChange={inSightForm.handleChange}
              type="number"
              value={inSightForm.values.project.estimated_area}
              error={
                inSightForm.touched?.project?.estimated_area &&
                inSightForm.errors?.project?.estimated_area &&
                inSightForm.errors?.project?.estimated_area
              }
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Capacity"
              placeholder="capacity"
              name="project.capacity"
              onChange={inSightForm.handleChange}
              type="number"
              value={inSightForm.values.project.capacity}
              error={
                inSightForm.touched?.project?.capacity &&
                inSightForm.errors?.project?.capacity &&
                inSightForm.errors?.project?.capacity
              }
            />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={4}>
            <TextInput
              label="Summer"
              placeholder="sun_hours.summer sun hour"
              min={1}
              type="number"
              name="sun_hours.sun_hour_summer"
              onChange={inSightForm.handleChange}
              value={inSightForm.values.sun_hours.sun_hour_summer}
              withAsterisk
              error={
                inSightForm.touched?.sun_hours?.sun_hour_summer &&
                inSightForm.errors?.sun_hours?.sun_hour_summer &&
                inSightForm.errors?.sun_hours.sun_hour_summer
              }
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Winter"
              placeholder="winter sun hour"
              min={1}
              type="number"
              name="sun_hours.sun_hour_winter"
              onChange={inSightForm.handleChange}
              value={inSightForm.values.sun_hours.sun_hour_winter}
              withAsterisk
              error={
                inSightForm.touched?.sun_hours?.sun_hour_winter &&
                inSightForm.errors?.sun_hours?.sun_hour_winter &&
                inSightForm.errors?.sun_hours.sun_hour_winter
              }
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <TextInput
              label="Monsoon"
              placeholder="monsoon sun hour"
              min={1}
              type="number"
              name="sun_hours.sun_hour_monsoon"
              onChange={inSightForm.handleChange}
              value={inSightForm.values.sun_hours.sun_hour_monsoon}
              withAsterisk
              error={
                inSightForm.touched?.sun_hours?.sun_hour_monsoon &&
                inSightForm.errors?.sun_hours?.sun_hour_monsoon &&
                inSightForm.errors?.sun_hours.sun_hour_monsoon
              }
            />
          </Grid.Col>
        </Grid>
      </Fieldset>

      {/* features and requirement */}
      <Fieldset legend="Feature and Requirements">
        <Grid>
          <Grid.Col span={6}>
            <Select
              searchable
              label="Solar Panel Type"
              placeholder="Solar Panel Type"
              data={panelTypeOptions}
              clearable
              styles={{
                option: {
                  textTransform: "capitalize",
                },
                options: {
                  textTransform: "capitalize",
                },
              }}
              value={inSightForm.values.project.panel_info}
              onChange={(value) =>
                inSightForm.setFieldValue("project.panel_info", value)
              }
              error={
                inSightForm.touched?.project?.panel_info &&
                inSightForm.errors?.project?.panel_info &&
                inSightForm.errors?.project?.panel_info
              }
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              searchable
              label="Battery Type"
              placeholder="battery type"
              data={batteryTypeOptions}
              clearable
              styles={{
                option: {
                  textTransform: "capitalize",
                },
                options: {
                  textTransform: "capitalize",
                },
              }}
              value={inSightForm.values.project.battery_type}
              onChange={(value) =>
                inSightForm.setFieldValue("project.battery_type", value)
              }
              error={
                inSightForm.touched?.project?.battery_type &&
                inSightForm.errors?.project?.battery_type &&
                inSightForm.errors?.project?.battery_type
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
                inSightForm.setFieldValue("project.cleaning", value);
              }}
              value={inSightForm.values.project.cleaning}
              error={
                inSightForm.touched?.project?.cleaning &&
                inSightForm.errors?.project?.cleaning &&
                inSightForm.errors?.project?.cleaning
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

      {/* location */}
      <Fieldset legend="Location (Optional)">
        <Group align="flex-start">
          <Stack
            gap={0}
            style={{
              flex: 1,
            }}
          >
            <Grid mt="xs">
              <Grid.Col span={6}>
                <TextInput
                  label="Longitude"
                  placeholder="longitude"
                  name="project.longitude"
                  onChange={inSightForm.handleChange}
                  disabled={inSightForm.values.project.mark_location_customer}
                  type="number"
                  value={inSightForm.values.project.longitude}
                  error={
                    inSightForm.touched?.project?.longitude &&
                    inSightForm.errors?.project?.longitude &&
                    inSightForm.errors?.project?.longitude
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  label="Latitude"
                  placeholder="latitude"
                  name="project.latitude"
                  onChange={inSightForm.handleChange}
                  type="number"
                  value={inSightForm.values.project.latitude}
                  disabled={inSightForm.values.project.mark_location_customer}
                  error={
                    inSightForm.touched?.project?.latitude &&
                    inSightForm.errors?.project?.latitude &&
                    inSightForm.errors?.project?.latitude
                  }
                />
              </Grid.Col>
            </Grid>
            <TextInput
              label="Address"
              placeholder="Location"
              mt="sm"
              name="project.location"
              onChange={inSightForm.handleChange}
              disabled={inSightForm.values.project.mark_location_customer}
              value={inSightForm.values.project.location}
              error={
                inSightForm.touched?.project?.location &&
                inSightForm.errors?.project?.location &&
                inSightForm.errors?.project?.location
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
                lat: inSightForm.values.project.latitude,
                lng: inSightForm.values.project.longitude,
              }}
              changeLocation={(location: LOCATION_SELECTOR) => {
                inSightForm.setFieldValue("project.latitude", location.lat);
                inSightForm.setFieldValue("project.longitude", location.lat);
              }}
            />
          </Box> */}
        </Group>
      </Fieldset>
    </Stack>
  );
};

export default InfoViewSetup;
