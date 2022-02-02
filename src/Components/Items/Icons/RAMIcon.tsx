import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as ramIcon } from "../../../Assets/ram.svg";

export default function RamIcon(props: SvgIconProps) {
  return <SvgIcon component={ramIcon} inheritViewBox fontSize="inherit" />;
}
