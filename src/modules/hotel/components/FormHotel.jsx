import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

import { useSelector } from "react-redux";
import { useUploadClodninary } from "../../../hooks/useUploadClodninary";
import { useSaveHotel } from "../hooks/useSaveHotel";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useEditHotel } from "../hooks/useEditHotel";

import * as yup from "yup";
import { voavaTheme } from "../../../theme";
import { useNavigate } from "react-router-dom";

const red = voavaTheme.palette.error.main;

export const FormHotel = ({ initialValues, id = null }) => {
  const { t } = useTranslation();
  const { isSaving } = useSelector((state) => state.hotel);
  const { editHotel } = useEditHotel();
  const { saveHotel } = useSaveHotel();
  const { uploadImages } = useUploadClodninary();
  const navigate = useNavigate();

  // ToDo Refactor this with a Hook ValidationForm maybe
  const validationSchema = yup.object({
    name: yup
      .string()
      .min(8, t("HOTEL.NAME_ERROR"))
      .required(t("COMMON.FIELD_ERROR")),

    description: yup
      .string()
      .min(300, t("HOTEL.DESCRIPTION_ERROR"))
      .required(t("COMMON.FIELD_ERROR")),
    country: yup.string().required(t("COMMON.FIELD_ERROR")),
    logo: yup.string().required(t("HOTEL.LOGO_ERROR")),
    department: yup.string().required(t("COMMON.FIELD_ERROR")),
    municipality: yup.string().required(t("COMMON.FIELD_ERROR")),
    type_hotel: yup.string().required(t("COMMON.FIELD_ERROR")),
    images: yup.array().required().min(2, t("HOTEL.IMAGES_ERROR")),
    roomtypes: yup.object({
      two_twin_bedroom: yup.object({
        state: yup.boolean(),
        value: yup.string().when("state", {
          is: true,
          then: yup
            .string()
            .required(t("COMMON.FIELD_ERROR"))
            .matches(/^[1-9]+[0-9]*$/, t("HOTEL.NUMBER_VALIDATION"))
            .max(5, t("HOTEL.NUMBER_ROOMS_MAX")),
        }),
      }),
      single_room: yup.object({
        state: yup.boolean(),
        value: yup.string().when("state", {
          is: true,
          then: yup
            .string()
            .required(t("COMMON.FIELD_ERROR"))
            .matches(/^[1-9]+[0-9]*$/, t("HOTEL.NUMBER_VALIDATION"))
            .max(5, t("HOTEL.NUMBER_ROOMS_MAX")),
        }),
      }),
      one_queen_bedroom: yup.object({
        state: yup.boolean(),
        value: yup.string().when("state", {
          is: true,
          then: yup
            .string()
            .required(t("COMMON.FIELD_ERROR"))
            .matches(/^[1-9]+[0-9]*$/, t("HOTEL.NUMBER_VALIDATION"))
            .max(5, t("HOTEL.NUMBER_ROOMS_MAX")),
        }),
      }),
    }),
  });

  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (id) {
        await editHotel(id, values);
      } else {
        await saveHotel(values);
      }

      navigate("/my-hotels");
    },
  });

  // Todo Optimize this
  const onFileInputChangeLogo = async ({ target }) => {
    if (target.files === 0) return;
    const image = await uploadImages(target.files);
    setValues({ ...values, logo: image[0] });
  };

  const onFileInputChangeMultiple = async ({ target }) => {
    if (target.files === 0) return;
    const image = await uploadImages(target.files);
    setValues({ ...values, images: [...values.images, image].flat() });
  };

  // ToDO Delete image from cloudinary and the list ?

  return (
    <>
      <form onSubmit={handleSubmit} aria-label="submit-form">
        <Grid container>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt={values.name}
              src={values.logo}
              sx={{ width: 160, height: 160, border: "1px solid black" }}
            />
            <Button
              variant="outlined"
              component="label"
              sx={{ mt: 1 }}
              disabled={isSaving}
            >
              <Typography sx={{ px: 2, mx: 1 }}>
                {t("COMMON.UPLOAD")}
              </Typography>
              {isSaving ? <CircularProgress size={20} /> : <PhotoCamera />}
              <input
                hidden
                accept="image/*"
                onChange={onFileInputChangeLogo}
                type="file"
              />
            </Button>
            {errors.logo && values.logo.length == 0 && (
              <span style={{ color: red }}>{errors.logo}</span>
            )}
          </Grid>

          <Grid item xs={12} sm={8} sx={{ p: 2 }}>
            <TextField
              autoComplete="off"
              fullWidth
              label={t("HOTEL.NAME_HOTEL")}
              name="name"
              inputProps={{ "data-testid": "name_hotel" }}
              placeholder="Hotel Decameron"
              type="text"
              onBlur={handleBlur}
              helperText={touched.name && errors.name}
              error={touched.name && Boolean(errors.name)}
              onChange={handleChange}
              value={values.name}
              sx={{ my: 2 }}
              variant="standard"
            />
            <TextField
              helperText={touched.description && errors.description}
              error={touched.description && Boolean(errors.description)}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              name="description"
              variant="standard"
              id="outlined-multiline-static"
              label={t("HOTEL.DESCRIPTION")}
              multiline
              rows={4}
              fullWidth
              sx={{ my: 2 }}
              placeholder={t("HOTEL.PLACEHOLDER_DESC")}
            />
          </Grid>

          <Grid item xs={12} sm={4} sx={{ p: 2 }}>
            <FormControl
              fullWidth
              error={touched.country && Boolean(errors.country)}
            >
              <InputLabel id="country_field">{t("HOTEL.COUNTRY")}</InputLabel>
              <Select
                labelId="country_field"
                id="country_field-select"
                name="country"
                onBlur={handleBlur}
                value={values.country}
                label={t("HOTEL.COUNTRY")}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Colombia"}>Colombia</MenuItem>
                <MenuItem value={"Mexico"}>Mexico</MenuItem>
                <MenuItem value={"Estado Unidos"}>Estados Unidos</MenuItem>
              </Select>
              {touched.country && errors.country && (
                <FormHelperText>{errors.country}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} sx={{ p: 2 }}>
            <FormControl
              fullWidth
              error={touched.department && Boolean(errors.department)}
            >
              <InputLabel id="department-field">
                {t("HOTEL.DEPARTMENT")}
              </InputLabel>
              <Select
                name="department"
                labelId="department-field"
                id="department-field-select-helper"
                value={values.department}
                onBlur={handleBlur}
                label={t("HOTEL.DEPARTMENT")}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Cundinamarca"}>Cundinamarca</MenuItem>
                <MenuItem value={"Huila"}>Huila</MenuItem>
                <MenuItem value={"Guaviare"}>Guaviare</MenuItem>
              </Select>
              {touched.department && errors.department && (
                <FormHelperText>{errors.department}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} sx={{ p: 2 }}>
            <FormControl
              fullWidth
              error={touched.municipality && Boolean(errors.municipality)}
            >
              <InputLabel id="municipality-label">
                {t("HOTEL.MUNICIPALITY")}
              </InputLabel>
              <Select
                name="municipality"
                labelId="municipality-label"
                id="municipality-label-select-helper"
                value={values.municipality}
                onBlur={handleBlur}
                label={t("HOTEL.MUNICIPALITY")}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"La Santillana"}>La Santillana</MenuItem>
                <MenuItem value={"Unidos Altos"}>Unidos Altos</MenuItem>
                <MenuItem value={"San Pablo"}>San Pablo</MenuItem>
              </Select>
              {touched.municipality && errors.municipality && (
                <FormHelperText>{errors.municipality}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={8} sx={{ p: 2 }}>
            <FormControl
              fullWidth
              error={touched.type_hotel && Boolean(errors.type_hotel)}
            >
              <InputLabel id="typeroom-label">
                {t("HOTEL.TYPE_HOTEL")}
              </InputLabel>
              <Select
                name="type_hotel"
                labelId="typeroom-label"
                id="typeroom-label-select-helper"
                value={values.type_hotel}
                onBlur={handleBlur}
                label={t("HOTEL.TYPE_ROOM")}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={3}>3 Estrellas</MenuItem>
                <MenuItem value={4}>4 Estrellas</MenuItem>
                <MenuItem value={5}>5 Estrellas</MenuItem>
              </Select>
              {touched.type_hotel && errors.type_hotel && (
                <FormHelperText>{errors.type_hotel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4} sx={{ p: 2 }}>
            <InputLabel id="score">{t("HOTEL.SCORE")}</InputLabel>
            <Rating
              name="score"
              value={+values.score}
              onChange={handleChange}
              precision={0.5}
            />
          </Grid>

          <Grid item xs={12} sm={12} sx={{ p: 2 }}>
            <Divider textAlign="left">{t("HOTEL.ROOM_AVAILABLE")}</Divider>
          </Grid>

          <Grid item xs={4} sm={4} sx={{ p: 2 }}>
            <FormControlLabel
              sx={{ pt: 2 }}
              control={
                <Checkbox
                  checked={values.roomtypes.two_twin_bedroom.state}
                  onChange={handleChange}
                  name="roomtypes.two_twin_bedroom.state"
                />
              }
              label={t("HOTEL.TWO_TWIN_BEDROOM")}
            />
          </Grid>
          <Grid item xs={8} sm={8} sx={{ p: 2 }}>
            <TextField
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={
                touched.roomtypes?.two_twin_bedroom?.value &&
                errors.roomtypes?.two_twin_bedroom?.value
              }
              error={Boolean(errors.roomtypes?.two_twin_bedroom?.value)}
              value={values.roomtypes.two_twin_bedroom.value}
              name="roomtypes.two_twin_bedroom.value"
              placeholder="5"
              type="number"
              sx={{
                my: 2,
                width: "40%",
                display: values.roomtypes.two_twin_bedroom.state
                  ? "block"
                  : "none",
              }}
              variant="standard"
            />
          </Grid>

          <Grid item xs={4} sm={4} sx={{ p: 2 }}>
            <FormControlLabel
              sx={{ pt: 2 }}
              control={
                <Checkbox
                  checked={values.roomtypes.single_room.state}
                  onChange={handleChange}
                  name="roomtypes.single_room.state"
                />
              }
              label={t("HOTEL.SIMPLE_BEDROOM")}
            />
          </Grid>
          <Grid item xs={8} sm={8} sx={{ p: 2 }}>
            <TextField
              fullWidth
              label=""
              onBlur={handleBlur}
              helperText={
                touched.roomtypes?.single_room?.value &&
                errors.roomtypes?.single_room?.value
              }
              error={Boolean(errors.roomtypes?.single_room?.value)}
              value={values.roomtypes.single_room.value}
              onChange={handleChange}
              name="roomtypes.single_room.value"
              placeholder="5"
              type="number"
              sx={{
                my: 2,
                width: "40%",
                display: values.roomtypes.single_room.state ? "block" : "none",
              }}
              variant="standard"
            />
          </Grid>

          <Grid item xs={4} sm={4} sx={{ p: 2 }}>
            <FormControlLabel
              sx={{ pt: 2 }}
              control={
                <Checkbox
                  checked={values.roomtypes.one_queen_bedroom.state}
                  onChange={handleChange}
                  name="roomtypes.one_queen_bedroom.state"
                />
              }
              label={t("HOTEL.ONE_QUEEN_BEDROOM")}
            />
          </Grid>
          <Grid item xs={8} sm={8} sx={{ p: 2 }}>
            <TextField
              fullWidth
              label=""
              onBlur={handleBlur}
              helperText={
                touched.roomtypes?.one_queen_bedroom?.value &&
                errors.roomtypes?.one_queen_bedroom?.value
              }
              error={Boolean(errors.roomtypes?.one_queen_bedroom?.value)}
              value={values.roomtypes.one_queen_bedroom.value}
              onChange={handleChange}
              name="roomtypes.one_queen_bedroom.value"
              placeholder="5"
              type="number"
              sx={{
                my: 2,
                width: "40%",
                display: values.roomtypes.one_queen_bedroom.state
                  ? "block"
                  : "none",
              }}
              variant="standard"
            />
          </Grid>

          <Grid item xs={12} sm={8} sx={{ p: 2 }}>
            <Divider textAlign="left">{t("HOTEL.IMAGE_GALLERY")}</Divider>
          </Grid>

          <Grid item xs={12} sm={4} sx={{ p: 2 }}>
            <Button variant="outlined" component="label" disabled={isSaving}>
              <Typography sx={{ px: 2, mx: 1 }}>
                {t("COMMON.UPLOAD")}
              </Typography>
              {isSaving ? <CircularProgress size={20} /> : <PhotoCamera />}
              <input
                hidden
                onChange={onFileInputChangeMultiple}
                accept="image/*"
                multiple
                type="file"
              />
            </Button>
          </Grid>
          {errors.images && values.images.length < 2 && (
            <span style={{ color: red }}>{errors.images}</span>
          )}

          {values.images.map((image) => (
            <Grid item xs={6} sm={4} sx={{ p: 1 }} key={image}>
              <img
                src={image}
                style={{ borderRadius: "12px", width: "100%", height: 220 }}
                alt={image}
              />
            </Grid>
          ))}

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {/* <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid> */}

            <Grid item xs={12} sm={6} sx={{ p: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSaving}
                fullWidth
              >
                {id ? t("HOTEL.EDIT_HOTEL") : t("HOTEL.SAVE_HOTEL")}
              </Button>
              {isSaving && <LinearProgress color="secondary" />}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
