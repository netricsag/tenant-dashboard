import { Paper, Stack, Typography, Divider, Box } from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system";
import SlackIcon from "../../Icons/SlackIcon";

interface IMessageCard {
  userRealName: string;
  message: string;
  timestamp: string;
  messageLink: string;
  userAvatarUrl: string;
  //children: JSX.Element | JSX.Element[];
}

export default function MessageCard(props: IMessageCard) {
  var date = new Date(parseInt(props.timestamp, 10) * 1000);

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        width: {
          xs: "85vw",
          sm: "85vw",
          md: "60vw",
          lg: "60vw",
          xl: "60vw",
        },
      }}
    >
      <Stack direction="column" spacing={5} padding={3} paddingTop={3}>
        <Typography variant="body1">{props.message}</Typography>
      </Stack>
      <Divider variant="middle" />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding={2}
        spacing={5}
      >
        <Stack direction="column" alignItems="left" spacing={1}>
          <Typography variant="caption" component="div" color="#818589">
            {date.toLocaleString()}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              component="img"
              sx={{
                height: "30px",
                width: "30px",
                maxHeight: { xs: "30px", md: "30px" },
                maxWidth: { xs: "30px", md: "30px" },
              }}
              style={{ borderRadius: 90 }}
              alt="Profile Picture"
              src={props.userAvatarUrl}
            />
            <Typography variant="subtitle1" component="div">
              {props.userRealName}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant="h5">
          <a href={props.messageLink} target="_blank">
            <SlackIcon />
          </a>
        </Typography>
      </Stack>
    </Paper>
  );
}
