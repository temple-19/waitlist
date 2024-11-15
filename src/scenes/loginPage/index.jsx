import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box position="relative" height="100vh" overflow="hidden">
      {/* Header */}
      <Box
        width="100%"
        p="1rem 6%"
        textAlign="left" // Aligns text to the left
        sx={{
          ml: isNonMobileScreens ? "7rem" : "1.5rem", // Left margin for spacing
          mt: "7rem", // Adds space at the top of the header
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography fontWeight="normal" fontSize="52px">
            Join The Waitlist
          </Typography>
        </Link>
      </Box>

      {/* Background Accent (Green Triangle) */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderBottom: "100vh solid #2C654299", // Triangle height and color
          borderLeft: "50vw solid transparent", // Triangle base width
          zIndex: -1, // Place behind the form
        }}
      />

      {/* Form Container */}
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        sx={{
          textAlign: "left",
          ml: isNonMobileScreens ? "3rem" : "1.5rem", // Left margin for spacing
          mt: "1rem", // Adds space at the top of the form
        }}
      >
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
