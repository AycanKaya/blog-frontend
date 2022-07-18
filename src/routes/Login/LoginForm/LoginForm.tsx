import { FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
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
      </form>
    </FormikProvider>
  );
}
