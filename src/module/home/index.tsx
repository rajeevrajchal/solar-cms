import { Stack } from "@mantine/core";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <Stack>
      <p>{t("api.home")}</p>
    </Stack>
  );
};

export default Home;
