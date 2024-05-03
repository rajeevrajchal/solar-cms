import { ResponsivePie } from "@nivo/pie";

interface PieChartData {
  data?: any;
}

const PieChart = (props: PieChartData) => {
  const { data } = props;

  return (
    <ResponsivePie
      data={data}
      innerRadius={0.5}
      padAngle={3}
      cornerRadius={4}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
    />
  );
};

export default PieChart;
