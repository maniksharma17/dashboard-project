import {
  Box,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  useTheme,
  styled
} from "@mui/material";

import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserTypes from "../Types/User";

interface SidebarInputTypes {
  user: UserTypes,
  isSidebarOpen: boolean,
  setIsSidebarOpen: (s: boolean)=>void,
  drawerWidth: string,
}
const Sidebar = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
  drawerWidth,
}: SidebarInputTypes) => {

  const { pathname } = useLocation();
  const [ active, setActive ] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(()=>{
    setActive(pathname.substring(1))
  }, [pathname])

  return <Box>
    {isSidebarOpen && (
    <Drawer open={isSidebarOpen}
      onClose={()=>{setIsSidebarOpen(false)}}
      variant="persistent"
      anchor="left"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          color: theme.palette.secondary.light,
          bgcolor: theme.palette.background.default,
          boxSixing: "border-box",
          borderWidth: "1px",
          width: drawerWidth
        }
      }}>
        <Box width="100%">
          <Box m="1.5rem 1rem 1rem 3rem">
            <FlexBetween color={theme.palette.secondary.light}>
              <Box display="flex" gap="0.5rem" alignItems="center">
                <Typography variant="h4" fontWeight="bold">AVONTECH</Typography>
              </Box>
              
              <CustomIconButton onClick={()=>{setIsSidebarOpen(!isSidebarOpen)}}><ChevronLeft></ChevronLeft></CustomIconButton>
              
            </FlexBetween>
          </Box>
          
          <List>
            {NavItems.map(({text, icon}) => {
              if(!icon) {
                return (
                  <Typography key={text} sx={{
                    margin: "1rem 1rem 1rem 3rem",
                  }}>{text}</Typography>
                )
              } 

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={()=>{
                    navigate(`/${text.toLowerCase()}`)
                    setActive(text.toLowerCase())
                  }}
                  sx={{
                    bgcolor: active===text.toLowerCase() ? (theme.palette.primary.light) : 'transparent',
                    color: active===text.toLowerCase() ? theme.palette.secondary.dark : theme.palette.secondary.light,
                    "&:hover": {
                      bgcolor: active===text.toLowerCase()?  theme.palette.primary.light : theme.palette.background.paper
                    }       
                  }}
                  >

                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        color: active===text.toLowerCase() ? theme.palette.secondary.dark : theme.palette.secondary.light,
                        "&:hover": {
                          color: theme.palette.secondary.dark
                        }
                      }}
                    >{icon}
                    </ListItemIcon>

                    <ListItemText primary={text}>
                      {text}
                    </ListItemText>

                    {active===text.toLowerCase() && (<ChevronRightOutlined />)}

                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
        
        <Box>
          <Divider/>
          <Box justifyContent="center" gap="1rem" display="flex" m="1.5rem 0rem 2rem 0rem">
            <Box
              component="img"
              alt="profile"
              src={"src/assets/imageAvatar.jpg"}
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
      </Box>
    </Drawer>

    )}

      
  </Box>;
};

const CustomIconButton = styled(IconButton)({
  '&:focus': {
      boxShadow: 'none',
      outline: 'none'
    }
});

const NavItems = [
  {
    text: 'Dashboard',
    icon: <HomeOutlined />
  },
  {
    text: 'Client Facing',
    icon: null
  },
  {
    text: 'Products',
    icon: <ShoppingCartOutlined />
  },
  {
    text: 'Customers',
    icon: <Groups2Outlined />
  },
  {
    text: 'Transactions',
    icon: <ReceiptLongOutlined />
  },
  {
    text: 'Geography',
    icon: <PublicOutlined />
  },
  {
    text: 'Sales',
    icon: null
  },
  {
    text: 'Overview',
    icon: <PointOfSaleOutlined />
  },
  {
    text: 'Daily',
    icon: <TodayOutlined />
  },
  {
    text: 'Monthly',
    icon: <CalendarMonthOutlined />
  },
  {
    text: 'Breakdown',
    icon: <PieChartOutlined />
  },
  {
    text: 'Management',
    icon: null
  },
  {
    text: 'Admin',
    icon: <AdminPanelSettingsOutlined />
  },
  {
    text: 'Performance',
    icon: <TrendingUpOutlined />
  },
]

export default Sidebar;
