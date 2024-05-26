import axios from "axios";

export const extractImageText = async (imageData, page) => {
  const form = new FormData();
  form.append("file", {
    uri: imageData.uri,
    type: imageData.mimeType,
    name: imageData.fileName ? imageData.fileName : "",
  });
  form.append("page", page);

  try {
    const res = await axios.post(
      "https://3b54-2407-4d00-1c03-7cae-bc0b-1a75-cd98-12b5.ngrok-free.app/extract_text",
      form,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
