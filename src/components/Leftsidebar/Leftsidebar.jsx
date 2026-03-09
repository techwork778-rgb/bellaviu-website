"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import BookIcon from '@mui/icons-material/Book';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EventBusyOutlined from '@mui/icons-material/EventBusyOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import Image from "next/image";
import PaymentIcon from '@mui/icons-material/Payment';
import { Avatar } from "@mui/material";
import {
  Bell,
  CalendarDays,
  LayoutDashboard,
  House,
  UserIcon,
  Users,
  Contact,
  HousePlus,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "./leftsidebar.css";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function Leftsidebar({ children }) {
  const { authUser } = useAuth();
  const [open, setOpen] = React.useState(true);
  const pathname = usePathname(); // Get current route

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const MenuList = [
    { name: "Dashboard", icon: <LayoutDashboard />, path: "/admin" },
    { name: "Add Blog", icon: < BookIcon />, path: "/admin/add-blog" },
    { name: "All Propertys", icon: <HousePlus />, path: "/admin/all-bellaviu-property" },
    { name: "Transaction", icon: <PaymentIcon />, path: "/admin/all_transaction" },
    { name: "Booking", icon: <CalendarDays />, path: "/admin/all-booking" },
    { name: "Cancel Booking", icon: <EventBusyOutlined />, path: "/admin/all-cancel-booking" },
    { name: "Customer", icon: <Users />, path: "/admin/all-customer-data" },
    { name: "User Properties", icon: <HousePlus />, path: "/admin/all-user-property" },
    { name: "Contacts us List", icon: <Contact />, path: "/admin/all-contact-data" },
    { name: "Career", icon: <WorkOutlineOutlinedIcon />, path: "/admin/all_career" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        color="#fff"
        className="header-wrapper"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} className="leftsidebar-wrapper">
        <DrawerHeader
          className="py-2 px-3 gap-2"
          sx={{ borderBottom: "1px solid #e5e9f26b" }}
        >
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon sx={{ color: "#8094ae" }} />
          </IconButton>
          <Image
            src={"/logo1.png"}
            alt="logo"
            width={180}
            height={40}
            layout="constrained"
          />
        </DrawerHeader>
        <Divider />
        <List className="leftsidebar-list">
          {MenuList.map((row, index) => (
            <ListItem
              key={index}
              disablePadding
              className="leftsidebar-list-item mb-2"
              sx={{
                display: "block",
              }}
            >
              <ListItemButton
                component={Link}
                href={row.path}
                className="leftsidebar-list-item-button"
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  { color: pathname === row.path ? "#fff" : "#526484"},
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  className="leftsidebar-list-item-icon"
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {row.icon}
                </ListItemIcon>
                <ListItemText
                  className="leftsidebar-list-item-name"
                  primary={row.name}
                  sx={[
                    
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3,overflow: "scroll"}} >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
