import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Link } from "react-router-dom";

export interface LoginValues {
  email: string;
  password: string;
}

const validationSchema: yup.SchemaOf<LoginValues> = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

interface LoginProps {
  onSubmit: (values: LoginValues) => void;
}

export default function LoginForm(props: LoginProps) {
  const formik = useFormik<LoginValues>({
    validationSchema,
    initialValues: { email: "", password: "" },
    onSubmit: props.onSubmit,
  });

  if (localStorage.getItem("jwToken") != null)
    return <Link to="/">Giriş Yaptınız !!!</Link>;

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <Sheet
          sx={{
            maxWidth: 400,
            mx: "auto", // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign in to continue</Typography>
          </div>

          <TextField
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

          <TextField
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
          <Button variant="contained" type="submit">
            Giriş Yap
          </Button>
        </Sheet>
      </form>
    </FormikProvider>
  );
}
