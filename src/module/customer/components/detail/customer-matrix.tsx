import BarChart from "@components/charts/bar-chart";
import { Box } from "@mantine/core";

const CustomerMatrix = () => {
  return (
    <Box p="md" mt="-md">
      <Box h="40vh" w="100%">
        <BarChart
          data={[
            {
              country: "AD",
              "hot dog": 99,
              "hot dogColor": "hsl(108, 70%, 50%)",
              burger: 186,
              burgerColor: "hsl(77, 70%, 50%)",
              sandwich: 57,
              sandwichColor: "hsl(130, 70%, 50%)",
              kebab: 181,
              kebabColor: "hsl(3, 70%, 50%)",
              fries: 145,
              friesColor: "hsl(292, 70%, 50%)",
              donut: 137,
              donutColor: "hsl(258, 70%, 50%)",
            },
            {
              country: "AE",
              "hot dog": 104,
              "hot dogColor": "hsl(47, 70%, 50%)",
              burger: 166,
              burgerColor: "hsl(149, 70%, 50%)",
              sandwich: 70,
              sandwichColor: "hsl(27, 70%, 50%)",
              kebab: 31,
              kebabColor: "hsl(117, 70%, 50%)",
              fries: 178,
              friesColor: "hsl(181, 70%, 50%)",
              donut: 166,
              donutColor: "hsl(48, 70%, 50%)",
            },
            {
              country: "AF",
              "hot dog": 14,
              "hot dogColor": "hsl(60, 70%, 50%)",
              burger: 147,
              burgerColor: "hsl(30, 70%, 50%)",
              sandwich: 133,
              sandwichColor: "hsl(284, 70%, 50%)",
              kebab: 18,
              kebabColor: "hsl(306, 70%, 50%)",
              fries: 75,
              friesColor: "hsl(24, 70%, 50%)",
              donut: 131,
              donutColor: "hsl(247, 70%, 50%)",
            },
            {
              country: "AG",
              "hot dog": 56,
              "hot dogColor": "hsl(159, 70%, 50%)",
              burger: 87,
              burgerColor: "hsl(315, 70%, 50%)",
              sandwich: 78,
              sandwichColor: "hsl(8, 70%, 50%)",
              kebab: 59,
              kebabColor: "hsl(297, 70%, 50%)",
              fries: 140,
              friesColor: "hsl(21, 70%, 50%)",
              donut: 131,
              donutColor: "hsl(147, 70%, 50%)",
            },
            {
              country: "AI",
              "hot dog": 159,
              "hot dogColor": "hsl(4, 70%, 50%)",
              burger: 48,
              burgerColor: "hsl(39, 70%, 50%)",
              sandwich: 124,
              sandwichColor: "hsl(215, 70%, 50%)",
              kebab: 108,
              kebabColor: "hsl(291, 70%, 50%)",
              fries: 4,
              friesColor: "hsl(5, 70%, 50%)",
              donut: 26,
              donutColor: "hsl(83, 70%, 50%)",
            },
            {
              country: "AL",
              "hot dog": 54,
              "hot dogColor": "hsl(8, 70%, 50%)",
              burger: 50,
              burgerColor: "hsl(65, 70%, 50%)",
              sandwich: 151,
              sandwichColor: "hsl(155, 70%, 50%)",
              kebab: 132,
              kebabColor: "hsl(309, 70%, 50%)",
              fries: 6,
              friesColor: "hsl(159, 70%, 50%)",
              donut: 189,
              donutColor: "hsl(301, 70%, 50%)",
            },
            {
              country: "AM",
              "hot dog": 11,
              "hot dogColor": "hsl(359, 70%, 50%)",
              burger: 125,
              burgerColor: "hsl(233, 70%, 50%)",
              sandwich: 18,
              sandwichColor: "hsl(332, 70%, 50%)",
              kebab: 134,
              kebabColor: "hsl(352, 70%, 50%)",
              fries: 74,
              friesColor: "hsl(220, 70%, 50%)",
              donut: 151,
              donutColor: "hsl(238, 70%, 50%)",
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default CustomerMatrix;
