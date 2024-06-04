import { Fieldset, Grid, NumberInput } from "@mantine/core";

interface BasicProjectInputProps {
  form: any;
}

const BasicProjectInput = (props: BasicProjectInputProps) => {
  const { form } = props;
  return (
    <Fieldset legend="Basic Info" className="capitalize">
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
        <Grid.Col
          span={{
            md: 3,
          }}
        >
          <NumberInput
            label="Electrical Capacity"
            placeholder="electrical capacity"
            name="project.electrical_capacity"
            min={0}
            step={0.1}
            onChange={(value) =>
              form.setFieldValue("project.electrical_capacity", value)
            }
            value={form.values.project.electrical_capacity}
            error={
              form.touched?.project?.electrical_capacity &&
              form.errors?.project?.electrical_capacity &&
              form.errors?.project?.electrical_capacity
            }
          />
        </Grid.Col>
      </Grid>
    </Fieldset>
  );
};

export default BasicProjectInput;
