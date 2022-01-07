import { Paper, Stack, Typography, Divider } from "@mui/material";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import DynamicFormTwoToneIcon from "@mui/icons-material/DynamicFormTwoTone";
import DonutChart from "./DonutChart";
import { ResponsiveStyleValue } from "@mui/system";

interface Props {
  title: string;
  titleIcon: React.ReactElement<any>;
  children: JSX.Element | JSX.Element[];
  stackDirection?: ResponsiveStyleValue<
    "column" | "row" | "row-reverse" | "column-reverse"
  >;
  contentSpacing?: number;
  titleSpacing?: number;
}

export default function CardComponent(props: Props) {
  let stackDir: ResponsiveStyleValue<
    "column" | "row" | "row-reverse" | "column-reverse"
  >;
  let contentSpac: number;
  let titleSpac: number;

  props.stackDirection === undefined
    ? (stackDir = "column")
    : (stackDir = props.stackDirection);

  props.contentSpacing === undefined
    ? (contentSpac = 5)
    : (contentSpac = props.contentSpacing);
  props.titleSpacing === undefined
    ? (titleSpac = 5)
    : (titleSpac = props.titleSpacing);

  return (
    <Paper elevation={3} sx={{ borderRadius: 2 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding={2}
        spacing={titleSpac}
      >
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>

        {props.titleIcon}
      </Stack>
      <Divider variant="middle" />
      <Stack
        direction={stackDir}
        justifyContent="space-around"
        alignItems="center"
        style={{ paddingTop: 10 }}
        spacing={contentSpac}
        padding={1}
      >
        {props.children}
      </Stack>
    </Paper>
  );
}
