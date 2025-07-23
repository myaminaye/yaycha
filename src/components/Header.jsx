import { useApp } from "../ThemedApp";
import { Box, AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import { Menu as MenuIcon, Add as AddIcon, LightMode as LightModeIcon, DarkMode as DarkModeIcon, Search as SearchIcon, NotificationAdd } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchNotis } from "../libs/fetcher";

export default function Header() {
  const navigate = useNavigate();
  const { showForm, setShowForm, mode, setMode, setShowDrawer, auth } = useApp();
  const { isLoading, isError, data } = useQuery(["notis", auth], fetchNotis);

  function notiCount() {
    if (!auth) return 0;
    if (isLoading || isError) return 0;
    return data.filter((noti) => !noti.read).length;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={() => setShowDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography sx={{ flexGrow: 1, ml: 2 }}>Yaycha</Typography> {/* take full width */}
        <Box>
          <IconButton color="inherit" onClick={() => setShowForm(!showForm)}>
            <AddIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => navigate("/search")}>
            <SearchIcon />
          </IconButton>
          {auth && (
            <IconButton color="inherit" onClick={() => navigate("/notis")}>
              <Badge color="error" badgeContent={notiCount()}>
                <NotificationAdd />
              </Badge>
            </IconButton>
          )}
          {mode === "dark" ? (
            <IconButton color="inherit" edge="end" onClick={() => setMode("light")}>
              <LightModeIcon />
            </IconButton>
          ) : (
            <IconButton color="inherit" edge="end" onClick={() => setMode("dark")}>
              <DarkModeIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
