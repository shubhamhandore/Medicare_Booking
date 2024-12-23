const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloud_name = import.meta.env.VITE_CLOUD_NAME;

const uploadImageToCloudinary = async (file) => {
  // Check if file is provided and valid
  if (!file || !(file instanceof Blob)) {
    throw new Error("Invalid file. Please select a valid image.");
  }

  // Prepare data for uploading
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: uploadData,
      }
    );

    if (!res.ok) {
      throw new Error("Failed to upload image. Please try again.");
    }

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error.message || "Error uploading image.");
    }

    return data; // Return the response data, typically containing the image URL
  } catch (error) {
    console.error("Upload failed: ", error.message);
    throw new Error(error.message); // Throw error for the caller to handle
  }
};

export default uploadImageToCloudinary;
