import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as NatronLogoWhite } from "../../Assets/logo_big_white.svg";

export default function NatronIconWhite(props: SvgIconProps) {
  return (
    <SvgIcon component={NatronLogoWhite} inheritViewBox fontSize="inherit" />
  );
}
