import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as cpuIcon } from "../../../Assets/cpu.svg";

export default function CpuIcon(props: SvgIconProps) {
  return <SvgIcon component={cpuIcon} inheritViewBox fontSize="inherit" />;
}
