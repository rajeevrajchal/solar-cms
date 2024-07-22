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
          step={0.1}
          onChange={(value) => form.setFieldValue("project.roof_area", value)}
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
          required
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
          onChange={(value) =>
            form.setFieldValue("project.solar_irradiance", value)
          }
          step={0.1}
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
          onChange={(value) =>
            form.setFieldValue("project.shading_factors", value)
          }
          step={0.1}
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
          label="Tilt Angle"
          placeholder="Tilt Angle"
          name="project.tilt_angle"
          step={0.1}
          onChange={(value) => form.setFieldValue("project.tilt_angle", value)}
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
          required
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
