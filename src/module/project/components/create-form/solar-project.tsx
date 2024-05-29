import { panel_type } from "@constant/panel-type";
import { roof_orientations } from "@constant/roof-orientations";
import { Grid, NumberInput, Select } from "@mantine/core";
import { map } from "lodash";

interface SolarProjectProps {
  form: any;
}

const SolarProject = (props: SolarProjectProps) => {
  const { form } = props;

  return (
    <Grid>
      <Grid.Col
        span={{
          md: 3,
        }}
      >
        <NumberInput
          label="Roof Area"
          placeholder="Roof area"
          name="project.roof_area"
          min={0}
          onChange={form.handleChange}
          value={form.values.project.roof_area}
          withAsterisk
          error={
            form.touched?.project?.roof_area &&
            form.errors?.project?.roof_area &&
            form.errors?.project?.roof_area
          }
        />
      </Grid.Col>
      <Grid.Col
        span={{
          md: 3,
        }}
      >
        <Select
          searchable
          styles={{
            option: {
              textTransform: "capitalize",
            },
          }}
          label="Roof Orientation"
          placeholder="Roof Orientation"
          clearable
          value={form.values.project.roof_orientation}
          data={map(roof_orientations, (v, k) => ({
            label: v,
            value: k,
          }))}
          onChange={(value) =>
            form.setFieldValue("project.roof_orientation", value)
          }
        />
      </Grid.Col>
      <Grid.Col
        span={{
          md: 3,
        }}
      >
        <NumberInput
          label="Solar Irradiance"
          placeholder="Solar Irradiance"
          name="project.solar_irradiance"
          onChange={form.handleChange}
          value={form.values.project.solar_irradiance}
          withAsterisk
          error={
            form.touched?.project?.solar_irradiance &&
            form.errors?.project?.solar_irradiance &&
            form.errors?.project?.solar_irradiance
          }
        />
      </Grid.Col>
      <Grid.Col
        span={{
          md: 3,
        }}
      >
        <NumberInput
          label="Shading Factors"
          placeholder="Shading Factors"
          name="project.shading_factors"
          onChange={form.handleChange}
          value={form.values.project.shading_factors}
          withAsterisk
          error={
            form.touched?.project?.shading_factors &&
            form.errors?.project?.shading_factors &&
            form.errors?.project?.shading_factors
          }
        />
      </Grid.Col>
      <Grid.Col
        span={{
          md: 3,
        }}
      >
        <NumberInput
          label="Electrical Capacity"
          placeholder="Electrical Capacity"
          name="project.electrical_capacity"
          onChange={form.handleChange}
          value={form.values.project.electrical_capacity}
          withAsterisk
          min={0}
          error={
            form.touched?.project?.electrical_capacity &&
            form.errors?.project?.electrical_capacity &&
            form.errors?.project?.electrical_capacity
          }
        />
      </Grid.Col>
      <Grid.Col
        span={{
          md: 3,
        }}
      >
        <NumberInput
          label="Tilt Angle"
          placeholder="Tilt Angle"
          name="project.tilt_angle"
          onChange={form.handleChange}
          value={form.values.project.tilt_angle}
          withAsterisk
          error={
            form.touched?.project?.tilt_angle &&
            form.errors?.project?.tilt_angle &&
            form.errors?.project?.tilt_angle
          }
        />
      </Grid.Col>
      <Grid.Col
        span={{
          md: 3,
        }}
      >
        <Select
          searchable
          styles={{
            option: {
              textTransform: "capitalize",
            },
          }}
          label="Panel Type"
          placeholder="Panel Type"
          clearable
          value={form.values.project.panel_type}
          data={map(panel_type, (v, k) => ({
            label: v,
            value: k,
          }))}
          onChange={(value) => form.setFieldValue("project.panel_type", value)}
        />
      </Grid.Col>
    </Grid>
  );
};

export default SolarProject;
