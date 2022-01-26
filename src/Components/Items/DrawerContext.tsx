import { createContext } from "react";

const drawerContext = createContext({
  drawerOpen: false,
  updateDrawerOpen: (open: boolean) => {},
});

export default drawerContext;
