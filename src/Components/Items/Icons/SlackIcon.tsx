import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as slackIcon } from "../../../Assets/slack-new-logo.svg";

export default function SlackIcon(props: SvgIconProps) {
  return <SvgIcon component={slackIcon} inheritViewBox fontSize="inherit" />;
}
