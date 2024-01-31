import { Tabs } from "@mantine/core";
import { filter } from "lodash";
import { useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";

export type TabItem = {
  label: string;
  value: string;
  disabled?: boolean;
  component?: JSX.Element;
  icon?: JSX.Element;
};

interface TabProps {
  tabs: TabItem[];
  initial?: string | null;
}

const Tab = (props: TabProps) => {
  const { tabs, initial } = props;

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || tabs[0]?.value;

  const changeTab = (value?: string | null) => {
    if (value) {
      setSearchParams({
        tab: value === null ? "system" : value,
      });
    } else {
      setSearchParams();
    }
  };

  useLayoutEffect(() => {
    changeTab(searchParams.get("tab") ? searchParams.get("tab") : initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tabs value={activeTab} onChange={changeTab} w="100%">
      <Tabs.List
        style={{
          width: "fit-content",
        }}
      >
        {filter(tabs, (item) => !item.disabled).map((tab) => (
          <Tabs.Tab
            key={tab.value}
            value={tab.value}
            leftSection={tab?.icon}
            className="capitalize"
            disabled={tab?.disabled}
          >
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Panel key={tab.value} value={tab.value} mt="md">
          {tab.component}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default Tab;
