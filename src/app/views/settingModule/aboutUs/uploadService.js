import axios from "axios";

import {api} from '../../../../api/api';
import {mainUrl} from '../../../../utility/config';


class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    
    return axios.post(mainUrl + "/aboutUs/uploadAboutUsMedia", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles(fileToken) {
    return api('aboutUs/getAboutUsFile',{},"get")
  }
}

export default new UploadFilesService();