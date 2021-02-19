import axios from "axios";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return axios.post("http://localhost:9090/aboutUs/uploadAboutUsMedia", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles(fileToken) {
    console.log()
    return axios.get("http://localhost:9090/aboutUs/getAboutUsFile")
  }
}

export default new UploadFilesService();