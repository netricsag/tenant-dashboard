# tenant-dashboard

The dashboard frontend of tenants

## Environment variables

To configure the tenant dashboard with your settings, fill your information in the env-config.json.

### Description

| Env Variable               | Type                           | Description                                                                                    |
| -------------------------- | :----------------------------- | ---------------------------------------------------------------------------------------------- |
| `REACT_APP_CLIENT_ID`     | [string] <YOUR_CLIENT_ID_HERE> | GitHub App client ID                                                                           |
| `REACT_APP_REDIRECT_URI`  | [string] <REDIRECT_URL>        | GitHub App redirect URL (Should point back at the frontend, i.e. https://yourdomain.com/login) |
| `REACT_APP_API_OAUTH_URI` | [string] <OAUTH_URL>           | GitHub OAuth URL                                                                               |
