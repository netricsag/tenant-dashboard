import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as NatronLogo } from "../../../Assets/logo_big_color.svg";

export default function NatronIcon(props: SvgIconProps) {
  return <SvgIcon component={NatronLogo} inheritViewBox fontSize="inherit" />;
}
