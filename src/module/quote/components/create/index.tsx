import { QUOTE_STATUS } from "@enum/quote-status.enum";
import { Button, Flex, Stack, Text } from "@mantine/core";
import { QUOTE } from "@model/quote";
import useQuoteMutate from "@module/quote/hooks/use-quote-mutate";
import AppRoute from "@routes/route.constant";
import { useFormik } from "formik";
import { includes, isEmpty } from "lodash";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import QuoteListAction from "../quote-list-action";
import QuoteCreateValidation from "./quote-create.validation";
import QuoteInfo from "./quote-info";

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
          ) : includes([QUOTE_STATUS.PENDING], data?.status?.toLowerCase()) ? (
            <Button
              variant="light"
              disabled={createQuote.isPending}
              onClick={() => setEdit(true)}
            >
              Edit
            </Button>
          ) : null}
          {!isEmpty(data) && !edit && (
            <>
              <Button
                loading={downloadQuote.isPending}
                onClick={() => downloadQuote.mutate(data?.id)}
              >
                Download
              </Button>
              {data?.status?.toLowerCase() !== QUOTE_STATUS.ACCEPTED && (
                <QuoteListAction hideDetail quote={data as QUOTE} />
              )}
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
