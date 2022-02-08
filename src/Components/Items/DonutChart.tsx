import {
  PieChart,
  Pie,
  Cell,
  Label,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@mui/system";

interface Props {
  primaryValue: number;
  secondaryValue: number;
  innerText: string;
}

export default function DonutChart(props: Props) {
  const data = [
    { name: "Belegt", value: props.primaryValue, unit: "GB" },
    {
      name: "Frei",
      value: props.secondaryValue - props.primaryValue,
      unit: "GB",
    },
  ];

  const theme = useTheme();
  return (
    <ResponsiveContainer
      minHeight={"20vh"}
      minWidth={"20vh"}
      height="100%"
      width="100%"
      debounce={1}
    >
      <PieChart>
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

        <Tooltip formatter={(value: any) => value + " GB"} />
      </PieChart>
    </ResponsiveContainer>
  );
}
