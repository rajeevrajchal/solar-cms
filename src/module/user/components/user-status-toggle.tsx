import ConfirmationModal from "@components/modal/confirmation-modal";
import useUserMutate from "@hook/data/users/use-user-mutate";
import { Switch } from "@mantine/core";
import { USER } from "@model/user";
import { PropsWithChildren, useState } from "react";

interface UserStatusToggleProps extends PropsWithChildren {
  user: USER;
}
const UserStatusToggle = (props: UserStatusToggleProps) => {
  const { user } = props;
  const { toggleUser } = useUserMutate();
  const [toggle, setToggle] = useState<boolean>(false);

  const handleCloseModal = () => {
    setToggle(false);
  };

  return (
    <>
      <Switch checked={user.is_active} onChange={() => setToggle(true)} />
      <ConfirmationModal
        opened={toggle}
        close={handleCloseModal}
        confirm={() =>
          toggleUser.mutate(user.id, {
            onSuccess: () => {
              handleCloseModal();
            },
          })
        }
        loading={toggleUser.isPending}
        title="Delete Confirmation"
        description="Are you sure you want to delete this user."
      />
    </>
  );
};

export default UserStatusToggle;
