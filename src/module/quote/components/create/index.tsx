import { Button, Flex, Stack, Text } from "@mantine/core";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import useQuoteMutate from "@hook/data/quote/use-quote-mutate";
import QuoteCreateValidation from "./quote-create.validation";
import QuoteInfo from "./quote-info";
import { QUOTE } from "@model/quote";
import { useState } from "react";
import AppRoute from "@routes/route.constant";
import { QUOTE_STATUS } from "@enum/quote-status.enum";
import { includes, isEmpty } from "lodash";

interface CreateQuoteFormProps {
  data?: Partial<QUOTE>;
}

const CreateQuoteForm = (props: CreateQuoteFormProps) => {
  const { data } = props;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { createQuote, updateQuote, downloadQuote } = useQuoteMutate();
  const [edit, setEdit] = useState<boolean>(data?.id ? false : true);

  const projectForm = useFormik({
    initialValues: {
      project_id: data?.project_id || searchParams?.get("pi") || "",
      equipment_total: 0,
      installation_cost: data?.installation_cost || "",
      discount: data?.discount || "",
      adjustment: data?.adjustment || "",
      discount_amount: 0,
      total_after_discount: 0,
      total_after_adjustment: 0,
      net_total: 0,
      vat: 13,
      vat_amount: 0,
    },
    validationSchema: QuoteCreateValidation,
    onSubmit: (values) => {
      const payload = {
        project_id: values.project_id,
        discount: +values.discount,
        adjustment: +values.adjustment,
        installation_cost: +values.installation_cost,
      };
      if (data?.id) {
        updateQuote.mutate(
          {
            ...payload,
            quote_id: data?.id,
          },
          {
            onSuccess: () => {
              setEdit(false);
            },
          }
        );
      } else {
        createQuote.mutate(payload);
      }
    },
  });

  return (
    <Stack gap="md">
      <Flex align="center" justify={data?.id ? "flex-end" : "space-between"}>
        {!data?.id && (
          <Text size="lg" fw="bold">
            Create Quote
          </Text>
        )}
        <Flex align="center" justify="flex-end" gap="md">
          {!includes(
            [QUOTE_STATUS.ACCEPTED, QUOTE_STATUS.REJECTED],
            data?.status?.toLowerCase()
          ) && (
            <>
              {edit ? (
                <>
                  <Button
                    variant="subtle"
                    disabled={createQuote.isPending}
                    onClick={
                      data?.id
                        ? () => setEdit(false)
                        : () => navigate(AppRoute.quote)
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={createQuote.isPending}
                    loading={createQuote.isPending}
                    variant="outlined"
                    onClick={() => projectForm.handleSubmit()}
                  >
                    {data?.id ? "Update" : "Create"}
                  </Button>
                </>
              ) : (
                <Button
                  variant="light"
                  disabled={createQuote.isPending}
                  onClick={() => setEdit(true)}
                >
                  Edit
                </Button>
              )}
            </>
          )}
          {!isEmpty(data) && (
            <>
              <Button onClick={() => downloadQuote.mutate(data?.id)}>
                Download
              </Button>
            </>
          )}
        </Flex>
      </Flex>
      <QuoteInfo
        isEdit={edit}
        status={data?.status || null}
        project_info={data?.project}
        form={projectForm}
      />
    </Stack>
  );
};

export default CreateQuoteForm;
