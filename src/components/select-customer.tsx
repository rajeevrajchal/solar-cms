import useCustomers from "@hook/data/customer/use-customers";
import { Loader, Select } from "@mantine/core";
import { USER } from "@model/user";
import { filter, map } from "lodash";

interface SelectCustomerProps {
  value: string | null;
  label?: string;
  placeholder?: string;
  onChange: () => void;
}

const SelectCustomer = (props: SelectCustomerProps) => {
  const { value, onChange, label, placeholder = "select options" } = props;
  const { customers, loading } = useCustomers();

  return (
    <Select
      searchable
      styles={{
        option: {
          textTransform: "capitalize",
        },
      }}
      label={label}
      placeholder={placeholder}
      clearable
      rightSection={
        loading ? <Loader color="blue" size="xs" type="dots" /> : ""
      }
      value={value}
      data={[
        ...map(
          filter(customers, (customer) => customer.type !== "guest"),
          (customer: USER) => {
            return {
              label: `${customer.name} [${customer.email}] [${customer.phone}]`,
              value: customer.id,
            };
          }
        ),
      ]}
      onChange={onChange}
    />
  );
};

export default SelectCustomer;
