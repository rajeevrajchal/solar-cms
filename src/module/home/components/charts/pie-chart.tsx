import { ResponsivePie } from "@nivo/pie";

const randomData = [
  {
    id: "css",
    label: "css",
    value: 480,
    color: "hsl(343, 70%, 50%)",
  },
  {
    id: "hack",
    label: "hack",
    value: 202,
    color: "hsl(341, 70%, 50%)",
  },
  {
    id: "elixir",
    label: "elixir",
    value: 229,
    color: "hsl(49, 70%, 50%)",
  },
  {
    id: "stylus",
    label: "stylus",
    value: 539,
    color: "hsl(257, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 398,
    color: "hsl(79, 70%, 50%)",
  },
];

interface PieChartData {
  data?: any;
}

const PieChart = (props: PieChartData) => {
  const { data } = props;
  console.log("data", data);

  return (
    <ResponsivePie
      data={randomData}
      margin={{ bottom: 80, top: 0 }}
      innerRadius={0.5}
      padAngle={5}
      cornerRadius={4}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      fit={true}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
    />
  );
};

export default PieChart;
