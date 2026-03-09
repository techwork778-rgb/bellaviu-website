"use client";
import React, { useEffect, useState } from "react";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
  Tooltip,
  Badge,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  FormControl,
  MenuItem as MuiMenuItem,
  Select,
  InputLabel,
  Divider,
  Skeleton,
  Avatar,
  ListItemIcon,
  InputAdornment,
} from "@mui/material";
import AuthModal from "@/components/AuthModal/AuthModal";
import {
  Menu as MenuIcon,
  KeyboardArrowDown,
  ExpandLess,
  ExpandMore,
  PersonAdd,
  Settings,
  Logout,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LanguageIcon from "@mui/icons-material/Language";

import "./Header.css";
import Link from "next/link";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const navigationItems = [
  { title: "HOME", items: [], link: "/" },
  {
    title: "SEARCH PROPERTY",
    items: [],
    link: "/hotel-filter",
  },
  { title: "LIST PROPERTY", items: [], link: "/add-property" },
  { title: "COMPANY", items: [{ title: "ABOUT US", link: "/about-us" },{ title: "OUR SERVICES", link: "/our-services" },{ title: "HOW TO BOOK AS A GUEST", link: "/how-to-book-as-a-guest" } ], link: "" },

  { title: "BLOG", items: [], link: "/blogs" },
  { title: "CONTACT US", items: [], link: "/contact-us" },
];
const currentYear = new Date().getFullYear();
const Header = () => {
  const {
    authUser,
    setAuthUser,
    user,
    googleSignIn,
    userId,
    logout,
  } = useAuth();

  const { currency, setCurrency, currencySymbol } = useCurrency();
  const theme = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [menuState, setMenuState] = useState({
    anchorEls: Array(navigationItems.length).fill(null),
    mobileOpen: false,
    openSubMenus: {},
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [openWishlist, setOpenWishlist] = React.useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");
  
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);

  const isProfileMenuOpen = Boolean(profileMenuAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleSignIn = async () => {
    googleSignIn();
  };

  useEffect(() => {
    // Initialize Google Translate only once
    if (typeof window !== 'undefined' && !window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en", includedLanguages: "en,ar,es,fr,de,zh" },
            "google_translate_element"
          );
        }
      };
    }
  }, []);
  const handleLanguageChange = (langCode) => {
    const googleTranslateFrame = document.querySelector(".goog-te-combo");
    if (googleTranslateFrame) {
      googleTranslateFrame.value = langCode;
      googleTranslateFrame.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };
  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistCount(storedWishlist.length);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Throttle scroll event for better performance
    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledHandleScroll);
    
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Throttle function for performance optimization
  const throttle = (func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  };
  const handleOpenNavMenu = (event, index) => {
    const newAnchorEls = [...menuState.anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setMenuState({ ...menuState, anchorEls: newAnchorEls });
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleCloseNavMenu = (index) => {
    const newAnchorEls = [...menuState.anchorEls];
    newAnchorEls[index] = null;
    setMenuState({ ...menuState, anchorEls: newAnchorEls });
  };

  const handleDrawerToggle = () => {
    setMenuState({ ...menuState, mobileOpen: !menuState.mobileOpen });
  };

  const handleSubMenuToggle = (title) => {
    setMenuState((prevState) => ({
      ...prevState,
      openSubMenus: {
        ...prevState.openSubMenus,
        [title]: !prevState.openSubMenus[title],
      },
    }));
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  
  const drawer = (
    <Box
      className="mobile-drawer"
      sx={{ width: 250, padding: "0px 16px 0px 16px" }}
    >
      {/* <List>
        {navigationItems.map((item) => (
          <React.Fragment key={item.title}>
            <Link
              href={item.link}
              key={item.title}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => setMenuState({ ...menuState, mobileOpen: false })}
            >
              <ListItemButton>
                <ListItemText primary={item.title} />
                {item.items.length > 0 &&
                  (menuState.openSubMenus[item.title] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  ))}
              </ListItemButton>
            </Link>
            {item.items.length > 0 && (
              <Collapse
                in={menuState.openSubMenus[item.title]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.items.map((subItem) => (
                    <Link
                      href={subItem.link}
                      key={subItem.title}
                      style={{ textDecoration: "none", color: "inherit" }}
                      onClick={() =>
                        setMenuState({ ...menuState, mobileOpen: false })
                      }
                    >
                      <ListItemButton className="sub-menu-item">
                        <ListItemText primary={subItem.title} />
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List> */}
      <List>
  {navigationItems.map((item) => (
    <React.Fragment key={item.title}>
      {item.items.length > 0 ? (
        // Has submenu: toggle open on click, no immediate navigation
        <ListItemButton
          onClick={() =>
            setMenuState({
              ...menuState,
              openSubMenus: {
                ...menuState.openSubMenus,
                [item.title]: !menuState.openSubMenus[item.title],
              },
            })
          }
        >
          <ListItemText primary={item.title} />
          {menuState.openSubMenus[item.title] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      ) : (
        // No submenu: normal link navigation, close drawer on click
        <Link
          href={item.link}
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={() => setMenuState({ ...menuState, mobileOpen: false })}
        >
          <ListItemButton>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </Link>
      )}

      {/* Submenu items */}
      {item.items.length > 0 && (
        <Collapse
          in={menuState.openSubMenus[item.title]}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {item.items.map((subItem) => (
              <Link
                href={subItem.link}
                key={subItem.title}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => setMenuState({ ...menuState, mobileOpen: false })}
              >
                <ListItemButton className="sub-menu-item">
                  <ListItemText primary={subItem.title} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  ))}
</List>

      <List>
        <ListItemButton
          onClick={() => {
            handleModalOpen();
            setMenuState({ ...menuState, mobileOpen: false });
          }}
        >
          {/* <ListItemText primary="Profile" /> */}
        </ListItemButton>
      </List>
    </Box>
  );

  const handleLogout = () => {
    setAuthUser(null);
    logout();
    localStorage.removeItem("authUser");
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  const normalizedUser =
    user ||
    (authUser && {
      uid: authUser.id,
      displayName:
        authUser.displayName || `${authUser.firstName} ${authUser.lastName}`,
      email: authUser.email,
      photoURL: authUser.photoURL,
    });
  return (
    <>
      <Toaster />
      <AppBar
        // className={`header-appbar  scrolled`}
        className={`header-appbar ${scrolled ? "scrolled" : ""}`}
        // className={`header-appbar `}
        style={{
          backgroundColor: "black",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          height: "70px",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              className="logo"
            >
              <img
                src="/logo.png"
                alt="Bella Viu"
                style={{
                  width: "220px",
                  filter: "drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.5))",
                }}
              />
            </Typography>
            <Box
                  id="google_translate_element"
                  style={{ display: "none" }}
                ></Box>
            {isMobile ? (
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleDrawerToggle}
                className="mobile-menu-button"
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box className="desktop-nav">
                {loading ? (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    {Array.from({ length: navigationItems.length }).map(
                      (_, idx) => (
                        <Skeleton
                          key={idx}
                          variant="text"
                          width={100}
                          height={32}
                          animation="wave"
                        />
                      )
                    )}
                  </Box>
                ) : (
                  // <Box className="desktop-nav">
                  //   {navigationItems.map((item, index) => (
                  //     <Box key={item.title}>
                  //       {item.items.length > 0 ? (
                  //         <>
                  //           <Button
                  //             onClick={(e) => handleOpenNavMenu(e, index)}
                  //             endIcon={<KeyboardArrowDown />}
                  //             className={`nav-button ${
                  //               pathname === item.link ? "active" : ""
                  //             }`}
                  //             style={{
                  //               color:
                  //                 pathname === item.link ? "#E2B5B0" : "white", // Change color for active link
                  //             }}
                  //           >
                  //             {item.title}
                  //           </Button>
                  //           <Menu
                  //             anchorEl={menuState.anchorEls[index]}
                  //             open={Boolean(menuState.anchorEls[index])}
                  //             onClose={() => handleCloseNavMenu(index)}
                  //             MenuListProps={{
                  //               "aria-labelledby": "basic-button",
                  //             }}
                  //           >
                  //             {item.items.map((subItem) => (
                  //               <MenuItem
                  //                 key={subItem}
                  //                 onClick={() => handleCloseNavMenu(index)}
                  //               >
                  //                 <Link
                  //                   href={subItem.link}
                  //                   style={{
                  //                     textDecoration: "none",
                  //                     color: "black",
                  //                   }}
                  //                 >
                  //                   {subItem.title}
                  //                 </Link>
                  //               </MenuItem>
                  //             ))}
                  //           </Menu>
                  //         </>
                  //       ) : (
                  //         <Link
                  //           href={item.link}
                  //           style={{ textDecoration: "none" }}
                  //         >
                  //           <Button
                  //             className={`nav-button ${
                  //               pathname === item.link ? "active" : ""
                  //             }`}
                  //             style={{
                  //               color:
                  //                 pathname === item.link ? "#E2B5B0" : "white", // Change color for active link
                  //             }}
                  //           >
                  //             {item.title}
                  //           </Button>
                  //         </Link>
                  //       )}
                  //     </Box>
                  //   ))}
                  // </Box>
                  <Box className="desktop-nav">
  {navigationItems.map((item, index) => (
    <Box key={item.title} sx={{ position: "relative", display: "inline-block" }}>
      {item.items.length > 0 ? (
        <>
          <Button
            onClick={(e) => handleOpenNavMenu(e, index)}
            endIcon={<KeyboardArrowDown />}
            className={`nav-button ${pathname === item.link ? "active" : ""}`}
            sx={{
              color: pathname === item.link ? "#E2B5B0" : "white",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "16px",
              padding: "8px 16px",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            {item.title}
          </Button>
          <Menu
            anchorEl={menuState.anchorEls[index]}
            open={Boolean(menuState.anchorEls[index])}
            onClose={() => handleCloseNavMenu(index)}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 150,
                boxShadow:
                  "0px 4px 20px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.08)",
              },
            }}
          >
            {item.items.map((subItem) => (
              <Link
                key={subItem.title}
                href={subItem.link}
                style={{ textDecoration: "none" }}
              >
                <MenuItem
                  onClick={() => handleCloseNavMenu(index)}
                  sx={{
                    fontSize: "15px",
                    color: "black",
                    paddingY: "10px",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      color: "",
                    },
                  }}
                >
                  {subItem.title}
                </MenuItem>
              </Link>
            ))}
          </Menu>
        </>
      ) : (
        <Link href={item.link} style={{ textDecoration: "none" }}>
          <Button
            className={`nav-button ${pathname === item.link ? "active" : ""}`}
            sx={{
              color: pathname === item.link ? "#E2B5B0" : "white",
              textTransform: "none",
              fontWeight: 500,
              fontSize: "16px",
              padding: "8px 16px",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            {item.title}
          </Button>
        </Link>
      )}
    </Box>
  ))}
</Box>

                )}
              </Box>
              
            )}

            {!isMobile && (
              <Box className="header-actions">
                <FormControl size="small" sx={{ mx: 2 }}>
                  {/* <Select
                    value={currency}
                    onChange={(e) => {
                      setCurrency(e.target.value);
                      localStorage.setItem("currency", e.target.value);
                    }}
                    sx={{
                      // borderRadius: "30px",
                      height: "30px",
                      textAlign: "center",
                      color: "white",
                      fontSize: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      "& .MuiSelect-icon": {
                        color: "#fff",
                      },
                      border: "none",
                      outline: "none",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                    displayEmpty
                  >
                    <MuiMenuItem value="AED">AED</MuiMenuItem>
                    <MuiMenuItem value="USD">USD</MuiMenuItem>
                    <MuiMenuItem value="EUR">EUR</MuiMenuItem>
                    <MuiMenuItem value="INR">INR</MuiMenuItem>
                    <MuiMenuItem value="GBP">GBP</MuiMenuItem>
                    <MuiMenuItem value="JPY">JPY</MuiMenuItem>
                  </Select> */}
                </FormControl>

                {/* =======================whislist======================== */}
                <FormControl size="small" sx={{ mx: 2 }} translate="no">
                  <Select
                    value={language}
                    onChange={(e) => {
                      const selectedLang = e.target.value;
                      setLanguage(selectedLang);
                      handleLanguageChange(selectedLang);
                    }}
                    sx={{
                      height: "30px",
                      textAlign: "center",
                      color: "white",
                      fontSize: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      "& .MuiSelect-icon": {
                        color: "#fff",
                      },
                      border: "none",
                      outline: "none",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                    displayEmpty
                    inputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LanguageIcon sx={{ fontSize: 20, color: "white" }} />
                        </InputAdornment>
                      ),
                    }}
                    translate="no" // Add this here too
                  >
                    <MenuItem value="en" translate="no">
                      EN
                    </MenuItem>
                    <MenuItem value="ar" translate="no">
                      AR
                    </MenuItem>
                    <MenuItem value="es" translate="no">
                      ES
                    </MenuItem>
                    <MenuItem value="fr" translate="no">
                      FR
                    </MenuItem>
                    <MenuItem value="de" translate="no">
                      DE
                    </MenuItem>
                  </Select>
                </FormControl>

                {/* Invisible Google Translate element */}
                {/* <Box
                  id="google_translate_element"
                  style={{ display: "none" }}
                ></Box> */}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <IconButton
                    aria-label="account-circle"
                    color="primary"
                    aria-controls={
                      isProfileMenuOpen ? "profile-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={isProfileMenuOpen ? "true" : undefined}
                    onClick={
                      normalizedUser ? handleProfileMenuOpen : handleModalOpen
                    }
                  >
                    {normalizedUser ? (
                      <Tooltip
                        title={
                          <div style={{ textAlign: "left" }}>
                            <div>
                              <strong>Name:</strong>{" "}
                              {normalizedUser.displayName}
                            </div>
                            <div>
                              <strong>Email:</strong> {normalizedUser.email}
                            </div>
                          </div>
                        }
                        arrow
                      >
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: "#9c6c69",
                            color: "#fff",
                          }}
                          src={normalizedUser.photoURL || ""}
                        >
                          {!normalizedUser.photoURL &&
                            normalizedUser.displayName
                              ?.split(" ")
                              .map((n) => n.charAt(0).toUpperCase())
                              .join("")}
                        </Avatar>
                      </Tooltip>
                    ) : (
                      <AccountCircleIcon
                        sx={{
                          fontSize: 30,
                          cursor: "pointer",
                          color: "#fff",
                          ml: 2,
                        }}
                      />
                    )}
                  </IconButton>
                  <Menu
                    id="profile-menu"
                    anchorEl={profileMenuAnchorEl}
                    open={isProfileMenuOpen}
                    onClose={handleProfileMenuClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 0,
                        top: "80px !important",
                        ///left: "1200px !important",
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 15,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                  >
                    <MenuItem onClick={handleProfileMenuClose}>
                      <Link
                        href="/profile"
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <ListItemIcon>
                          <AccountCircleIcon fontSize="small" />
                        </ListItemIcon>
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleLogout();
                        handleProfileMenuClose();
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            )}
          </Toolbar>
        </Container>

     
        <Drawer
          variant="temporary"
          anchor="left"
          open={menuState.mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              background: "rgba(255, 255, 255, 0.03)", // Semi-transparent background
              backdropFilter: "blur(10px)", // Apply blur effect
              color: "white",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.3)", // Subtle shadow
              borderRadius: "8px", // Optional: rounded corners for the drawer
            },
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              mb: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "Black", // Set desired background color
              padding: "0px 16px 0px 16px", // Optional: Adds padding around content
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              className="logo"
            >
              <img
                src="./logo1.png"
                alt="Bella Viu"
                style={{ height: "60px", width: "140px", paddingTop: "10px" }}
              />
            </Typography>
          </Box>

          {/* User Info Section */}
          <Box
            sx={{
              padding: "16px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.2)", // Divider
            }}
          >
            {normalizedUser ? (
              <Box>
                <Typography
                  variant="body1"
                  color="inherit"
                  sx={{ fontWeight: "bold" }}
                >
                  Welcome, {normalizedUser.displayName}
                </Typography>
                <Typography
                  variant="body2"
                  color="inherit"
                  sx={{ opacity: 0.8 }}
                >
                  {normalizedUser.email}
                </Typography>

                <MenuItem
                  onClick={() => {
                    handleDrawerToggle(); // Close drawer
                  }}
                  sx={{
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                  }}
                >
                   <Link
                        href="/profile"
                        style={{
                          textDecoration: "none",
                          color: "white",
                        }}
                      >
                  <ListItemIcon>
                    <AccountCircleIcon
                      fontSize="small"
                      sx={{ color: "white" }}
                    />
                  </ListItemIcon>
                  PROFILE
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleDrawerToggle(); // Close drawer
                  }}
                  sx={{
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" sx={{ color: "white" }} />
                  </ListItemIcon>
                  LOGOUT
                </MenuItem>
              </Box>
            ) : (
              <Box>
                <Typography variant="body1" color="inherit">
                  Please log in to access your profile.
                </Typography>
                <MenuItem
                  onClick={() => {
                    handleModalOpen();
                    handleDrawerToggle(); // Close drawer
                  }}
                  sx={{
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                  }}
                >
                  <ListItemIcon>
                    <AccountCircleIcon
                      fontSize="small"
                      sx={{ color: "white" }}
                    />
                  </ListItemIcon>
                  LOGIN
                </MenuItem>
              </Box>
            )}
          </Box>
          <FormControl size="small" sx={{ mx: 2 }} translate="no">
                  <Select
                    value={language}
                    onChange={(e) => {
                      const selectedLang = e.target.value;
                      setLanguage(selectedLang);
                      handleLanguageChange(selectedLang);
                    }}
                    sx={{
                      height: "30px",
                      textAlign: "center",
                      color: "white",
                      fontSize: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      "& .MuiSelect-icon": {
                        color: "#fff",
                      },
                      border: "none",
                      outline: "none",
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                    }}
                    displayEmpty
                    inputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LanguageIcon sx={{ fontSize: 20, color: "white" }} />
                        </InputAdornment>
                      ),
                    }}
                    translate="no" // Add this here too
                  >
                    <MenuItem value="en" translate="no">
                      EN
                    </MenuItem>
                    <MenuItem value="es" translate="no">
                      ES
                    </MenuItem>
                    <MenuItem value="ar" translate="no">
                      AR
                    </MenuItem>
                    <MenuItem value="fr" translate="no">
                      FR
                    </MenuItem>
                  </Select>
                </FormControl>
                <Box
                  id="google_translate_element"
                  style={{ display: "none" }}
                ></Box>
          {/* Drawer Content Section */}
          <Box sx={{ padding: "16px" }}>{drawer}</Box>

          {/* Footer Section */}
          <Box
            sx={{
              marginTop: "auto",
              padding: "16px",
              textAlign: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography variant="caption" color="inherit" sx={{ opacity: 0.8 }}>
              © {currentYear} Bella Viu. All rights reserved.
            </Typography>
          </Box>
        </Drawer>
      </AppBar>

      {/* Login/Sign-Up Modal */}
      <AuthModal
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        open={modalOpen}
        handleClose={handleModalClose}
      />
    </>
  );
};

export default Header;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 99999,
};
