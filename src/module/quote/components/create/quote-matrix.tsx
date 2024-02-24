import { Grid, Stack, Text, TextInput } from "@mantine/core";
import { formatCurrency } from "@utils/functions/format-currency";
import { includes } from "lodash";
import { useEffect } from "react";

interface QuoteMatrixProps {
  form: any;
  isEdit?: boolean;
}

const vat = 13;

const QuoteMatrix = (props: QuoteMatrixProps) => {
  const { form, isEdit } = props;

  const handleQuoteMatrixCalculation = () => {
    const { discount, equipment_total, installation_cost, adjustment, vat } =
      form.values;
    const projectTotal = +equipment_total + +installation_cost;
    const discountAmount = (projectTotal * discount) / 100;
    const totalAfterDiscount = projectTotal - discountAmount;
    const totalAfterAdjustment = +totalAfterDiscount - +adjustment;
    const vatAmount = (totalAfterAdjustment * vat) / 100;
    const netTotal = totalAfterAdjustment + vatAmount;

    form.setFieldValue("discount_amount", discountAmount);
    form.setFieldValue("total_after_discount", totalAfterDiscount);
    form.setFieldValue("total_after_adjustment", totalAfterAdjustment);
    form.setFieldValue("vat_amount", vatAmount);
    form.setFieldValue("net_total", netTotal);
  };

  useEffect(() => {
    handleQuoteMatrixCalculation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values]);

  return (
    <Stack gap={4}>
      <Text fw="bold">Quote Matrix</Text>
      <Grid align="center">
        <Grid.Col span={6}>
          <Grid>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              Equipment Total
            </Grid.Col>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              {formatCurrency(form.values.equipment_total)}
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={6}>
          <Grid>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              Installation Cost
            </Grid.Col>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              {isEdit ? (
                <TextInput
                  placeholder="Installation Cost"
                  type="number"
                  name="installation_cost"
                  value={form.values.installation_cost}
                  onChange={form.handleChange}
                  rightSection={import.meta.env.VITE_APP_CURRENCY_SYMBOL || "$"}
                />
              ) : (
                formatCurrency(form?.values?.installation_cost)
              )}
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      <Grid align="center">
        <Grid.Col span={6}>
          <Grid>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              Total Cost
            </Grid.Col>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              {formatCurrency(
                +form.values.equipment_total + +form.values.installation_cost
              )}
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={6}>
          <Grid>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              Variance
            </Grid.Col>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              5%
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>

      {!includes(["", 0, null], form.values.discount) && (
        <Grid align="center">
          <Grid.Col span={6}>
            <Grid align="center">
              <Grid.Col
                span={{
                  base: 6,
                  md: 6,
                  lg: 4,
                }}
              >
                Discount
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 6,
                  md: 6,
                  lg: 4,
                }}
              >
                {isEdit ? (
                  <TextInput
                    rightSection="%"
                    placeholder="Discount"
                    type="number"
                    name="discount"
                    onChange={form.handleChange}
                    value={form.values.discount}
                  />
                ) : (
                  `${form.values.discount} %`
                )}
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={6}>
            <Grid>
              <Grid.Col
                span={{
                  base: 6,
                  md: 6,
                  lg: 4,
                }}
              >
                Discount Amount
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 6,
                  md: 6,
                  lg: 4,
                }}
              >
                {formatCurrency(form.values.discount_amount)}
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      )}

      <Grid align="center">
        <Grid.Col span={6}>
          <Grid align="center">
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              Amount Adjustment
            </Grid.Col>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              {isEdit ? (
                <TextInput
                  placeholder="Adjustment"
                  type="number"
                  name="adjustment"
                  value={form.values.adjustment}
                  onChange={form.handleChange}
                  rightSection={import.meta.env.VITE_APP_CURRENCY_SYMBOL || "$"}
                />
              ) : (
                formatCurrency(form.values.adjustment)
              )}
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={6}>
          <Grid>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              Total
            </Grid.Col>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              {formatCurrency(form.values.total_after_adjustment)}
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      <Grid align="center">
        <Grid.Col span={6}>
          <Grid>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              Vat Amount ({vat}%)
            </Grid.Col>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              {formatCurrency(form.values.vat_amount)}
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={6}>
          <Grid>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              <Text fw="bold">Net Total</Text>
            </Grid.Col>
            <Grid.Col
              span={{
                base: 6,
                md: 6,
                lg: 4,
              }}
            >
              <Text fw="bold">{formatCurrency(form.values.net_total)}</Text>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default QuoteMatrix;
