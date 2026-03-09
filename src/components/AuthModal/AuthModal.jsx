import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import IconButton from "@mui/material/IconButton";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { setLocalData } from "@/utility/Function";
import Image from "next/image";
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogTitle-root": {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.grey[500],
}));

const ActionButton = styled(Button)(({ theme }) => ({
  width: "100%",
  borderRadius: 25,
  padding: "12px",
  backgroundColor: "#3366FF",
  color: "white",
  textTransform: "none",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#2952cc",
    boxShadow: "none",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 25,
    backgroundColor: "#f5f5f5",
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
    "&:hover fieldset": {
      borderColor: "#e0e0e0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e0e0e0",
      borderWidth: "1px",
    },
    "& input": {
      padding: "14px 14px",
    },
    "& input::placeholder": {
      color: "#757575",
      opacity: 1,
    },
  },
}));

export default function AuthModal({ open, handleClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(true); // Toggles between Register and Login forms
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false); // Track registration success
  const [isLoginSuccess, setIsLoginSuccess] = useState(false); // Track login success
  const [otp, setOtp] = useState(""); // OTP field val

  const {
    authUser,
    setAuthUser,
    user,
    googleSignIn,
    userId,
    setUserId,
    logout,
  } = useAuth();
  const handleTogglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const handleSignIn = async () => {
    googleSignIn();
    handleClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegister) {
      setIsLoginSuccess(true);
      const formData = new FormData(event.currentTarget);
      const values = {
        first_name: formData.get("firstName"),
        last_name: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
      };

      // Registration API request
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Send form data as JSON
      });

      const data = await response.json();

      setIsLoginSuccess(false);
      if (data.status === 200) {
        toast.success("Please check your email for OTP");
        setIsRegistrationSuccess(true); // Show OTP form upon successful registration
      } else {
        if (data.error === "User already exists") {
          toast.error("User already exists");
        } else {
          toast.error("oops! Registration failed");
        }
      }
    } else {
      setIsLoginSuccess(true);
      const formData = new FormData(event.currentTarget);
      const values = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Send form data as JSON
      });

      const data = await response.json();
      if (data.status === 200) {
        toast.success(data.message);

        const userDetails = {
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          type: data.data.type,
          email: data.data.email,
          photoURL: null,
          userId: data.data.userId,
        };

        

        setLocalData("authUser", JSON.stringify(userDetails));
        //setUserId(data.data.userId);
        setAuthUser(userDetails);
        handleClose();
      } else {
        toast.error(data.message);
      }
      setIsLoginSuccess(false);
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    setIsLoginSuccess(true);
    const formData = new FormData(event.currentTarget);
    const otp = formData.get("otp");

    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ otp }), // Include the OTP and the email sent to the user
    });

    const data = await response.json();
    if (data.status === 200) {
      const userDetails = {
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        type: data.data.type,
        email: data.data.email,
        photoURL: null,
        userId: data.data.userId,
      };
       
      setLocalData("authUser", JSON.stringify(userDetails));
      //setUserId(data.data.userId);
      setAuthUser(userDetails);
      // setLocalData("authUser", JSON.stringify(data.data));
      // setAuthUser(data.data);
      // // setUserId(data.data.id);
      handleClose();
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setIsLoginSuccess(false);
  };

  return (
    // <StyledDialog
    //   open={open}
    //   onClose={handleClose}
    //   aria-labelledby="auth-dialog-title"
    //   aria-describedby="auth-dialog-description"
    //   className="auth-dialog"
    // >
    //   <Toaster />
    //   <CloseButton onClick={handleClose}>
    //     <CloseIcon />
    //   </CloseButton>
    //   <DialogTitle id="auth-dialog-title">
    //     {isRegister ? "Create a new account" : "Login to your account"}
    //   </DialogTitle>
    //   <DialogContent sx={{ width: "400px" }}>
    //     <DialogContentText id="auth-dialog-description" component="div">
    //       <Box
    //         component="form"
    //         onSubmit={isRegistrationSuccess ? handleOtpSubmit : handleSubmit}
    //         sx={{
    //           display: "flex",
    //           flexDirection: "column",
    //           gap: 3,
    //           mb: 2,
    //         }}
    //       >
    //         {/* Registration Form */}
    //         {!isRegistrationSuccess && isRegister && (
    //           <>
    //             <StyledTextField
    //               fullWidth
    //               required
    //               placeholder="First Name"
    //               name="firstName"

    //               InputProps={{
    //                 startAdornment: (
    //                   <PersonOutlineIcon
    //                     sx={{ color: "text.secondary", mr: 1 }}
    //                   />
    //                 ),
    //               }}
    //             />
    //             <StyledTextField
    //               fullWidth
    //               required
    //               placeholder="Last Name"
    //               name="lastName"
    //               InputProps={{
    //                 startAdornment: (
    //                   <PersonOutlineIcon
    //                     sx={{ color: "text.secondary", mr: 1 }}
    //                   />
    //                 ),
    //               }}
    //             />
    //             <StyledTextField
    //               fullWidth
    //               required
    //               placeholder="Email"
    //               name="email"
    //               type="email"
    //               InputProps={{
    //                 startAdornment: (
    //                   <EmailOutlinedIcon
    //                     sx={{ color: "text.secondary", mr: 1 }}
    //                   />
    //                 ),
    //               }}
    //             />
    //             <StyledTextField
    //               fullWidth
    //               required
    //               placeholder="Password"
    //               type={showPassword ? "text" : "password"}
    //               name="password"
    //               InputProps={{
    //                 startAdornment: (
    //                   <LockOutlinedIcon
    //                     sx={{ color: "text.secondary", mr: 1 }}
    //                   />
    //                 ),
    //                 endAdornment: (
    //                   <InputAdornment position="end">
    //                     <IconButton
    //                       aria-label="toggle password visibility"
    //                       onClick={handleTogglePasswordVisibility}
    //                       edge="end"
    //                     >
    //                       {showPassword ? <VisibilityOff /> : <Visibility />}
    //                     </IconButton>
    //                   </InputAdornment>
    //                 ),
    //               }}
    //             />
    //             <Box sx={{ display: "flex", justifyContent: "center" }}>
    //               <Button
    //                 variant="contained"
    //                 className="btn-theme2"
    //                 type="submit"
    //                 disabled={isLoginSuccess}
    //               >
    //                 {isLoginSuccess ? "Loading..." : "Register"}
    //               </Button>
    //             </Box>
    //           </>
    //         )}
    //         {!isRegistrationSuccess && !isRegister && (
    //           <>
    //             <StyledTextField
    //               fullWidth
    //               placeholder="Email"
    //               required
    //               name="email"
    //               type="email"
    //               InputProps={{
    //                 startAdornment: (
    //                   <EmailOutlinedIcon
    //                     sx={{ color: "text.secondary", mr: 1 }}
    //                   />
    //                 ),
    //               }}
    //             />
    //             <StyledTextField
    //               fullWidth
    //               placeholder="Password"
    //               required
    //               type={showPassword ? "text" : "password"}
    //               name="password"
    //               InputProps={{
    //                 startAdornment: (
    //                   <LockOutlinedIcon
    //                     sx={{ color: "text.secondary", mr: 1 }}
    //                   />
    //                 ),
    //                 endAdornment: (
    //                   <InputAdornment position="end">
    //                     <IconButton
    //                       aria-label="toggle password visibility"
    //                       onClick={handleTogglePasswordVisibility}
    //                       edge="end"
    //                     >
    //                       {showPassword ? <VisibilityOff /> : <Visibility />}
    //                     </IconButton>
    //                   </InputAdornment>
    //                 ),
    //               }}
    //             />

    //             <Button
    //               variant="contained"
    //               className="btn-theme2"
    //               type="submit"
    //               disabled={isLoginSuccess}
    //             >
    //               {isLoginSuccess ? "Loading..." : "Login"}
    //             </Button>
    //           </>
    //         )}
    //         {/* OTP Form */}
    //         {isRegistrationSuccess && (
    //           <>
    //             <StyledTextField
    //               fullWidth
    //               required
    //               placeholder="Enter OTP"
    //               name="otp"
    //               type="text"
    //               value={otp}
    //               onChange={(e) => setOtp(e.target.value)}
    //             />
    //             <Button
    //               variant="contained"
    //               className="btn-theme2"
    //               type="submit"
    //               disabled={isLoginSuccess}
    //             >
    //               {isLoginSuccess ? "Loading..." : "Verify OTP"}
    //             </Button>
    //           </>
    //         )}

    //         {/* Toggle between Register and Login */}
    //         <Box sx={{ textAlign: "center", mt: 2 }}>
    //           <Typography
    //             color="text.secondary"
    //             fontSize="0.875rem"
    //             display="inline"
    //           >
    //             {isRegister
    //               ? "Already have an account? "
    //               : "Don't have an account? "}
    //           </Typography>
    //           <Typography
    //             component="span"
    //             sx={{
    //               color: "#3366FF",
    //               fontSize: "0.875rem",
    //               fontWeight: 500,
    //               cursor: "pointer",
    //               "&:hover": {
    //                 textDecoration: "underline",
    //               },
    //             }}
    //             onClick={() => setIsRegister(!isRegister)}
    //           >
    //             {isRegister ? "Login" : "Register"}
    //           </Typography>
    //         </Box>
    //       </Box>
    //       <Box
    //         sx={{
    //           display: "flex",
    //           gap: 2,
    //           mt: 2,
    //           justifyContent: "center", // Centers the buttons in the container
    //         }}
    //       >
    //         <Button
    //           onClick={handleSignIn}
    //           startIcon={
    //             <Image src="/google.jpeg" alt="Google" width={20} height={20} />
    //           }
    //           sx={{
    //             width: "70%",
    //             textTransform: "none",
    //             border: "1px solid rgba(0, 0, 0, 0.2)", // Light border
    //             borderRadius: "30px",
    //             backgroundColor: "transparent",
    //             color: "#000",
    //             padding: "10px 20px",
    //             "&:hover": {
    //               backgroundColor: "rgba(0, 0, 0, 0.1)", // Slight hover effect
    //             },
    //           }}
    //         >
    //           Login With Google
    //         </Button>
    //       </Box>
    //     </DialogContentText>
    //   </DialogContent>
    // </StyledDialog>
    <StyledDialog
  open={open}
  onClose={handleClose}
  aria-labelledby="auth-dialog-title"
  aria-describedby="auth-dialog-description"
  className="auth-dialog"
  sx={{
    "& .MuiDialog-paper": {
      width: "90%", // Set width to 90% for mobile
      maxWidth: "500px", // Max width for larger screens
      margin: "auto", // Center the dialog
    },
  }}
>
  <Toaster />
  <CloseButton onClick={handleClose}>
    <CloseIcon />
  </CloseButton>
  <DialogTitle id="auth-dialog-title">
    {isRegister ? "Create a new account" : "Login to your account"}
  </DialogTitle>
  <DialogContent sx={{ width: "100%" }}>
    <DialogContentText id="auth-dialog-description" component="div">
      <Box
        component="form"
        onSubmit={isRegistrationSuccess ? handleOtpSubmit : handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          mb: 2,
        }}
      >
        {/* Registration Form */}
        {!isRegistrationSuccess && isRegister && (
          <>
            <StyledTextField
              fullWidth
              required
              placeholder="First Name"
              name="firstName"
              InputProps={{
                startAdornment: (
                  <PersonOutlineIcon sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
            <StyledTextField
              fullWidth
              required
              placeholder="Last Name"
              name="lastName"
              InputProps={{
                startAdornment: (
                  <PersonOutlineIcon sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
            <StyledTextField
              fullWidth
              required
              placeholder="Email"
              name="email"
              type="email"
              InputProps={{
                startAdornment: (
                  <EmailOutlinedIcon sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
            <StyledTextField
              fullWidth
              required
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              InputProps={{
                startAdornment: (
                  <LockOutlinedIcon sx={{ color: "text.secondary", mr: 1 }} />
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                className="btn-theme2"
                type="submit"
                disabled={isLoginSuccess}
                sx={{ width: "100%" }} // Ensure button takes full width on mobile
              >
                {isLoginSuccess ? "Loading..." : "Register"}
              </Button>
            </Box>
          </>
        )}

        {/* Login Form */}
        {!isRegistrationSuccess && !isRegister && (
          <>
            <StyledTextField
              fullWidth
              placeholder="Email"
              required
              name="email"
              type="email"
              InputProps={{
                startAdornment: (
                  <EmailOutlinedIcon sx={{ color: "text.secondary", mr: 1 }} />
                ),
              }}
            />
            <StyledTextField
              fullWidth
              placeholder="Password"
              required
              type={showPassword ? "text" : "password"}
              name="password"
              InputProps={{
                startAdornment: (
                  <LockOutlinedIcon sx={{ color: "text.secondary", mr: 1 }} />
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              className="btn-theme2"
              type="submit"
              disabled={isLoginSuccess}
              sx={{ width: "100%" }} // Ensure button takes full width on mobile
            >
              {isLoginSuccess ? "Loading..." : "Login"}
            </Button>
          </>
        )}

        {/* OTP Form */}
        {isRegistrationSuccess && (
          <>
            <StyledTextField
              fullWidth
              required
              placeholder="Enter OTP"
              name="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              variant="contained"
              className="btn-theme2"
              type="submit"
              disabled={isLoginSuccess}
              sx={{ width: "100%" }} // Ensure button takes full width on mobile
            >
              {isLoginSuccess ? "Loading..." : "Verify OTP"}
            </Button>
          </>
        )}

        {/* Toggle between Register and Login */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography color="text.secondary" fontSize="0.875rem" display="inline">
            {isRegister ? "Already have an account? " : "Don't have an account? "}
          </Typography>
          <Typography
            component="span"
            sx={{
              color: "#3366FF",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </Typography>
        </Box>
      </Box>

      {/* Google Sign-In Button */}
      <Box sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "center" }}>
        <Button
          onClick={handleSignIn}
          startIcon={<Image src="/google.jpeg" alt="Google" width={20} height={20} />}
          sx={{
            width: "70%",
            textTransform: "none",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "30px",
            backgroundColor: "transparent",
            color: "#000",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          Login With Google
        </Button>
      </Box>
    </DialogContentText>
  </DialogContent>
</StyledDialog>

  );
}
