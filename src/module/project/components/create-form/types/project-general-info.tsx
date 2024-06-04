import { PROJECT_TYPE } from "@enum/project-type.enum";
import { Fieldset, Grid, GridCol, Select, TextInput } from "@mantine/core";
import { map } from "lodash";

interface ProjectGeneralInfoProps {
  form: any;
}

const ProjectGeneralInfo = (props: ProjectGeneralInfoProps) => {
  const { form } = props;

  return (
    <Fieldset legend="General">
      <Grid>
        <Grid.Col
          span={{
            md: 3,
          }}
        >
          <TextInput
            label="Name"
            placeholder="Project Name"
            name="project.name"
            onChange={form.handleChange}
            value={form.values.project.name}
            withAsterisk
            error={
              form.touched?.project?.name &&
              form.errors?.project?.name &&
              form.errors?.project?.name
            }
          />
        </Grid.Col>
        <GridCol
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
            label="Project Type"
            placeholder="Select Type"
            clearable
            value={form.values.project.type}
            data={map(PROJECT_TYPE, (v, k) => ({
              label: k,
              value: v,
            }))}
            onChange={(value) => form.setFieldValue("project.type", value)}
          />
        </GridCol>
      </Grid>
    </Fieldset>
  );
};

export default ProjectGeneralInfo;
