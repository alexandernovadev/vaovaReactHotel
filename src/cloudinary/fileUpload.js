export const fileUpload = async (file) => {
  if (!file) throw new Error("No tenemos ningúna archivo a subir");

  // ToDo: Set ID on .env file
  // const ID = process.env.IDCLOUDINARY
  const ID = "dv8wurqdp";
  const API = "https://api.cloudinary.com/v1_1";

  const cloudUrl = `${API}/${ID}/upload`;

  const formData = new FormData();
  formData.append("upload_preset", "vaovahotels");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("Error to upload Image");
    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
