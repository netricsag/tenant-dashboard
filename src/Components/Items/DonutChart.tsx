import { PieChart, Pie, Cell, Label, Tooltip } from "recharts";
import { useTheme } from "@mui/system";

interface Props {
  primaryValue: number;
  secondaryValue: number;
  innerText: string;
}

export default function DonutChart(props: Props) {
  const data = [
    { name: "Belegt", value: props.primaryValue, unit: "%" },
    { name: "Frei", value: props.secondaryValue, unit: "%" },
  ];

  const theme = useTheme();
  return (
    <PieChart width={200} height={180}>
      <Pie
        data={data}
        innerRadius={55}
        outerRadius={80}
        paddingAngle={3}
        dataKey="value"
      >
        <Cell key={"cell-0"} fill={theme.palette.primary.main} />
        <Cell key={"cell-"} fill={theme.palette.secondary.main} />
        <Label value={props.innerText} position="center" />
      </Pie>

      <Tooltip formatter={(value: any) => value + "%"} />
    </PieChart>
  );
}
