import Dropzone from "@components/dropzone";
import category from "@constant/category";
import nature from "@constant/nature";
import useInventoryMutate from "@hook/data/inventory/use-inventory-mutate";
import useVendors from "@hook/data/vendor/user-vendors";
import {
  Stack,
  Fieldset,
  TextInput,
  Grid,
  Button,
  Group,
  Text,
  Select,
  Loader,
} from "@mantine/core";
import { VENDOR } from "@model/vendor";
import { useFormik } from "formik";
import { includes, isEmpty, map } from "lodash";
import createInventoryValidation from "../validation/inventory-form";
import AppRoute from "@routes/route.constant";
import { INVENTORY } from "@model/inventory";

interface InventoryFormProp {
  data?: Partial<INVENTORY>;
}

const InventoryForm = (props: InventoryFormProp) => {
  const { data } = props;
  const { loading, vendors } = useVendors();
  const { create, update } = useInventoryMutate();

  const inventoryForm: any = useFormik({
    initialValues: {
      name: data?.name ?? "",
      vendor_id: data?.vendor_id ?? "",
      category: data?.category ?? "",
      nature: data?.nature ?? "",
      watt: data?.watt ?? "",
      voltage: data?.voltage ?? "",
      ampere: data?.ampere ?? "",
      buying_cost: data?.buying_cost ?? "",
      selling_cost: data?.selling_cost ?? "",
      max_discount: data?.max_discount ?? "",
      max_flat_discount: data?.max_flat_discount ?? "",
      description: data?.description ?? "",
      product_image: "",
    },
    validationSchema: createInventoryValidation,
    onSubmit: (values: any) => {
      if (isEmpty(data)) {
        create.mutate(values);
      } else {
        update.mutate({
          payload: values,
          inventory_id: data?.id || null,
        });
      }
    },
  });

  return (
    <Stack>
      <Group justify="space-between" w="100%">
        <Text fw="bold">{isEmpty(data) ? "Create" : "Edit"} Inventory</Text>
        <Group justify="flex-end">
          <Button
            variant="subtle"
            disabled={create.isPending || update.isPending}
            component="a"
            href={AppRoute.inventory}
          >
            Cancel
          </Button>
          <Button
            variant="light"
            loading={create.isPending || update.isPending}
            disabled={create.isPending || update.isPending}
            onClick={() => inventoryForm.handleSubmit()}
          >
            {isEmpty(data) ? "Publish" : "Update"}
          </Button>
        </Group>
      </Group>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
          <Stack>
            <Fieldset legend="Basic Info">
              <Stack gap="xs">
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                    <TextInput
                      label="Name"
                      placeholder="Name"
                      name="name"
                      value={inventoryForm.values.name}
                      onChange={inventoryForm.handleChange}
                      error={
                        inventoryForm.touched?.name &&
                        inventoryForm.errors?.name &&
                        inventoryForm.errors?.name
                      }
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                    <Select
                      searchable
                      label="Vendor"
                      placeholder="Select Vendor"
                      clearable
                      rightSection={
                        loading ? (
                          <Loader color="blue" size="xs" type="dots" />
                        ) : (
                          ""
                        )
                      }
                      data={map(vendors || [], (vendor: VENDOR) => ({
                        value: vendor.id,
                        label: vendor.name,
                      }))}
                      value={inventoryForm.values.vendor_id}
                      onChange={(value) =>
                        inventoryForm.setFieldValue("vendor_id", value)
                      }
                      error={
                        inventoryForm.touched?.vendor_id &&
                        inventoryForm.errors?.vendor_id &&
                        inventoryForm.errors?.vendor_id
                      }
                    />
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                    <Select
                      searchable
                      label="Category"
                      placeholder="Select Product Category"
                      clearable
                      data={category}
                      value={inventoryForm.values.category}
                      onChange={(value) =>
                        inventoryForm.setFieldValue("category", value)
                      }
                      error={
                        inventoryForm.touched?.category &&
                        inventoryForm.errors?.category &&
                        inventoryForm.errors?.category
                      }
                    />
                  </Grid.Col>
                  {includes(
                    ["panel", "battery"],
                    inventoryForm?.values?.category
                  ) && (
                    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                      <Select
                        searchable
                        label="Nature"
                        placeholder="Select Nature"
                        clearable
                        data={nature[inventoryForm?.values?.nature] as any}
                        value={inventoryForm.values.nature}
                        onChange={(value) =>
                          inventoryForm.setFieldValue("nature", value)
                        }
                        error={
                          inventoryForm.touched?.nature &&
                          inventoryForm.errors?.nature &&
                          inventoryForm.errors?.nature
                        }
                      />
                    </Grid.Col>
                  )}
                </Grid>
              </Stack>
            </Fieldset>
            <Fieldset legend="Attributes">
              <Stack gap="xs">
                <Grid>
                  <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                    <TextInput
                      label="Voltage"
                      placeholder="Voltage"
                      type="number"
                      name="voltage"
                      value={inventoryForm.values.voltage}
                      onChange={inventoryForm.handleChange}
                      error={
                        inventoryForm.touched?.voltage &&
                        inventoryForm.errors?.voltage &&
                        inventoryForm.errors?.voltage
                      }
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <TextInput
                      label="Watt"
                      placeholder="Watt"
                      type="number"
                      name="watt"
                      value={inventoryForm.values.watt}
                      onChange={inventoryForm.handleChange}
                      error={
                        inventoryForm.touched?.watt &&
                        inventoryForm.errors?.watt &&
                        inventoryForm.errors?.watt
                      }
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
                    <TextInput
                      name="ampere"
                      value={inventoryForm.values.ampere}
                      onChange={inventoryForm.handleChange}
                      error={
                        inventoryForm.touched?.ampere &&
                        inventoryForm.errors?.ampere &&
                        inventoryForm.errors?.ampere
                      }
                      label="Ampere"
                      placeholder="Ampere"
                      type="number"
                    />
                  </Grid.Col>
                </Grid>
              </Stack>
            </Fieldset>
            <Fieldset legend="Costing">
              <Grid>
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                  <TextInput
                    name="buying_cost"
                    min={0}
                    value={inventoryForm.values.buying_cost}
                    onChange={inventoryForm.handleChange}
                    error={
                      inventoryForm.touched?.buying_cost &&
                      inventoryForm.errors?.buying_cost &&
                      inventoryForm.errors?.buying_cost
                    }
                    leftSection="$"
                    label="Buying Cost"
                    placeholder="Buying Cost"
                    type="number"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                  <TextInput
                    name="selling_cost"
                    min={inventoryForm.values.buying_cost}
                    value={inventoryForm?.values.selling_cost}
                    onChange={inventoryForm.handleChange}
                    leftSection="$"
                    error={
                      inventoryForm.touched?.selling_cost &&
                      inventoryForm.errors?.selling_cost &&
                      inventoryForm.errors?.selling_cost
                    }
                    label="Selling Cost"
                    placeholder="Selling Cost"
                    type="number"
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                  <TextInput
                    name="max_discount"
                    leftSection="%"
                    min={0}
                    max={100}
                    value={inventoryForm.values.max_discount}
                    onChange={inventoryForm.handleChange}
                    error={
                      inventoryForm.touched?.max_discount &&
                      inventoryForm.errors?.max_discount &&
                      inventoryForm.errors?.max_discount
                    }
                    label="Max Discount"
                    placeholder="Maximum discount applicable"
                    type="number"
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                  <TextInput
                    name="max_flat_discount"
                    leftSection="$"
                    min={0}
                    value={inventoryForm.values.max_flat_discount}
                    onChange={inventoryForm.handleChange}
                    error={
                      inventoryForm.touched?.max_flat_discount &&
                      inventoryForm.errors?.max_flat_discount &&
                      inventoryForm.errors?.max_flat_discount
                    }
                    label="Flat Discount"
                    placeholder="Maximum flat discount"
                    type="number"
                  />
                </Grid.Col>
              </Grid>
            </Fieldset>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }} h="auto">
          <Fieldset legend="Product Images">
            <Dropzone
              showPreview
              maxFiles={4}
              files={inventoryForm.values.product_image || []}
              setFiles={(files) =>
                inventoryForm.setFieldValue("product_image", files)
              }
              
            />
          </Fieldset>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default InventoryForm;
