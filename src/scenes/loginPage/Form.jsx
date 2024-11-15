import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ConvertKit API keys and IDs
let convertKitAPIKey = process.env.REACT_APP_CONVERTKIT_API_KEY;
let convertKitFormID = process.env.REACT_APP_CONVERTKIT_FORM_ID;

let registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  occupation: yup.string().required("required"),
});

let initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  occupation: "",
};

const Form = () => {
  let { palette } = useTheme();
  let navigate = useNavigate();
  let isNonMobile = useMediaQuery("(min-width:600px)");
  let [loading, setLoading] = useState(false);

  const submitToConvertKit = async (values) => {
    try {
      let obj = {
        api_key: convertKitAPIKey,
        email: values.email,
        first_name: `${values.firstName} ${values.lastName}`, // Combine first and last name
        fields: {
          occupation: values.occupation,
        },
      };
      console.log(convertKitAPIKey, convertKitFormID, obj);
      let response = await axios.post(
        `https://api.convertkit.com/v3/forms/${convertKitFormID}/subscribe`,
        obj
      );
      console.log(response.data);
    } catch (error) {
      console.error("ConvertKit subscription error:", error);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    setLoading(true);
    await submitToConvertKit(values);
    setLoading(false);
    onSubmitProps.resetForm();
    navigate("/"); // Navigate to homepage
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName || ""}
              name="firstName"
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName || ""}
              name="lastName"
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email || ""}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="occupation"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.occupation || ""}
              name="occupation"
              error={Boolean(touched.occupation) && Boolean(errors.occupation)}
              helperText={touched.occupation && errors.occupation}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          <Box mt={2} display="flex" justifyContent="center">
            <Button
              type="submit"
              disabled={loading}
              sx={{
                width: "65%", // Adjust button width to fit content
                p: "1rem 2rem", // Adjust padding for better size control
                backgroundColor: "#2C654299", // Base color
                color: palette.background.alt,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Shadow for separation
                border: "1px solid rgba(0, 0, 0, 0.1)", // Light border for extra separation
                borderRadius: "12px", // Round the button corners
                "&:hover": {
                  backgroundColor: "#1E472F", // Darker green on hover
                  color: "#fff", // Ensures text is readable on hover
                },
              }}
            >
              {loading ? "JOINING..." : "JOIN"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
