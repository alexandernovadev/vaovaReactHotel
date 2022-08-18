import React from "react"; // Test Required react here
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link as RouterLink } from "react-router-dom";

import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { AuthLayout } from "../layouts/AuthLayout";
import { useRegister } from "../hooks/useRegister";

export const RegisterPage = () => {
  const { t } = useTranslation();
  const { status, errorMessage } = useSelector((state) => state.auth);
  const { register } = useRegister();

  const validationSchema = yup.object({
    displayName: yup
      .string()
      .min(5, t("AUTH.NAME_ERROR"))
      .required(t("AUTH.NAME_REQUIRED")),

    email: yup
      .string()
      .email(t("AUTH.INVALID_EMAIL"))
      .required(t("AUTH.REQUIRED_EMAIL")),

    password: yup
      .string()
      .min(8, t("AUTH.PASSWORD_ERROR"))
      .required(t("AUTH.PASSWORD_REQUIRED")),
  });

  const { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      register(values);
    },
  });

  return (
    <AuthLayout title={t("AUTH.CREATE_ACCOUNT")}>
      <form
        aria-label="submit-form"
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              autoComplete="off"
              error={touched.displayName && Boolean(errors.displayName)}
              fullWidth
              helperText={touched.displayName && errors.displayName}
              label={t("AUTH.FULL_NAME")}
              name="displayName"
              onChange={handleChange}
              inputProps={{ "data-testid": "displayName" }}
              placeholder={t("AUTH.FULL_NAME")}
              type="text"
              value={values.displayName}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              autoComplete="off"
              error={touched.email && Boolean(errors.email)}
              fullWidth
              helperText={touched.email && errors.email}
              label={t("AUTH.EMAIL")}
              name="email"
              onChange={handleChange}
              inputProps={{ "data-testid": "email" }}
              placeholder="correo@google.com"
              type="email"
              value={values.email}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              autoComplete="off"
              error={touched.password && Boolean(errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              label={t("AUTH.PASSWORD")}
              name="password"
              inputProps={{ "data-testid": "password" }}
              onChange={handleChange}
              placeholder={t("AUTH.PASSWORD")}
              type="password"
              value={values.password}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                disabled={status === "checking"}
                fullWidth
              >
                {t("AUTH.REGISTER")}
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>{t("AUTH.ALREADY_ACCOUNT")}</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              {t("AUTH.LOGIN")}
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
