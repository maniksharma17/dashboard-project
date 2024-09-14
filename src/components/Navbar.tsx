import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../state";
import { AppBar, Button, IconButton, InputBase, Toolbar, useTheme, Box, Typography } from "@mui/material";
import { styled } from "@mui/material";
import UserTypes from "../Types/User";

const CustomIconButton = styled(IconButton)({
  '&:focus': {
      boxShadow: 'none',
      outline: 'none'
    }
});

interface NavbarInputTypes {
  user: UserTypes,
  isSidebarOpen: boolean,
  setIsSidebarOpen: (s: boolean)=>void,
}

const Navbar = ({user, isSidebarOpen, setIsSidebarOpen}: NavbarInputTypes) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",

        width: "100%",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* LEFT SIDE */}
        <FlexBetween sx={{ gap: "1rem" }}>
          <CustomIconButton
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <MenuIcon />
          </CustomIconButton>

          <FlexBetween
            bgcolor={theme.palette.background.paper}
            borderRadius={"9px"}
            gap={"1rem"}
            p={"0.1rem 1.5rem"}
          >
            <InputBase placeholder="Search..." />
            <CustomIconButton>
              <Search />
            </CustomIconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap={"1rem"}>
          <CustomIconButton
            onClick={() => {
              dispatch(setMode());
            }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </CustomIconButton>

          <CustomIconButton>
            <SettingsOutlined />
          </CustomIconButton>

          <FlexBetween>
            <Button
              
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
                '&:focus': {outline: 'none'}
              }}
            >
              <Box justifyContent="center" gap="1rem" display="flex" m="1rem 0rem">
                <Box
                  component="img"
                  alt="profile"
                  src={"https://i.pinimg.com/736x/0d/a7/64/0da7647b0ba9716a310a97d98c1bb8c2.jpg"}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{objectFit: "cover"}}
                ></Box>

                <Box textAlign="left">
                  <Typography fontWeight="bold" fontSize="0.9rem" sx={{color: theme.palette.primary.light}}>
                    {user.name}
                  </Typography>
                  <Typography fontSize="0.8rem" sx={{color: theme.palette.primary.light}}>
                    {user.occupation}
                  </Typography>
                </Box>
              </Box>
              <ArrowDropDownOutlined></ArrowDropDownOutlined>
            </Button>

          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
