import { Fieldset, Grid, NumberInput } from "@mantine/core";

interface ProjectOutputInfoProps {
  form: any;
}

const ProjectOutputInfo = (props: ProjectOutputInfoProps) => {
  const { form } = props;
  return (
    <Fieldset legend="Output Info" className="capitalize">
      <Grid>
        <Grid.Col
          span={{
            md: 3,
          }}
        >
          <NumberInput
            label="Watt (Output)"
            placeholder="watt"
            name="project.power_out_watt"
            min={0}
            step={0.1}
            onChange={(value) =>
              form.setFieldValue("project.power_out_watt", value)
            }
            value={form.values.project.power_out_watt}
            withAsterisk
            error={
              form.touched?.project?.power_out_watt &&
              form.errors?.project?.power_out_watt &&
              form.errors?.project?.power_out_watt
            }
          />
        </Grid.Col>
        <Grid.Col
          span={{
            md: 3,
          }}
        >
          <NumberInput
            label="Voltage (Output)"
            placeholder="voltage"
            name="project.power_out_voltage"
            min={0}
            step={0.1}
            onChange={(value) =>
              form.setFieldValue("project.power_out_voltage", value)
            }
            value={form.values.project.power_out_voltage}
            withAsterisk
            error={
              form.touched?.project?.power_out_voltage &&
              form.errors?.project?.power_out_voltage &&
              form.errors?.project?.power_out_voltage
            }
          />
        </Grid.Col>
        <Grid.Col
          span={{
            md: 3,
          }}
        >
          <NumberInput
            label="Reserve Power For"
            placeholder="reserve_power_for"
            name="project.reserve_power_for"
            min={0}
            step={1}
            onChange={(value) =>
              form.setFieldValue("project.reserve_power_for", value)
            }
            value={form.values.project.reserve_power_for}
            error={
              form.touched?.project?.reserve_power_for &&
              form.errors?.project?.reserve_power_for &&
              form.errors?.project?.reserve_power_for
            }
          />
        </Grid.Col>
      </Grid>
    </Fieldset>
  );
};

export default ProjectOutputInfo;
