import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Copyright } from "@mui/icons-material";
import { ref } from "yup";

export interface RegisterValues {
  username: string;
  email: string;
  password: string;
}

const validationSchema: yup.SchemaOf<RegisterValues> = yup.object({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([ref("password")], "Passwords do not match"),
});

interface RegisterProps {
  onSubmit: (values: RegisterValues) => void;
}

const theme = createTheme();

export default function RegisterForm(props: RegisterProps) {
  const formik = useFormik<RegisterValues>({
    validationSchema,
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    onSubmit: props.onSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  error={!!(formik.errors.email && formik.touched.email)}
                  helperText={
                    formik.errors.email && formik.touched.email
                      ? formik.errors.email
                      : undefined
                  }
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  error={!!(formik.errors.password && formik.touched.password)}
                  helperText={
                    formik.errors.password && formik.touched.password
                      ? formik.errors.password
                      : undefined
                  }
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="confirmPassword"
                  type="password"
                  label="confirmPassword"
                  variant="outlined"
                  error={!!(formik.errors.password && formik.touched.password)}
                  helperText={
                    formik.errors.password && formik.touched.password
                      ? formik.errors.password
                      : undefined
                  }
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </FormikProvider>
  );
}
