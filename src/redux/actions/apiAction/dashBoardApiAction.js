import { api } from "../../../api/api";


export const getAdminCountApi = async () => {
  const adminCount = await api("dashBoard/getAdminCount", {} , "get");
    if (adminCount) {
        return adminCount;
      }
      
  };

export const getSubscriberCountApi = async () => {
  const subscriberCount = await api(
    `dashBoard/getSubscriberCount`,
    {},
    "get"
  );
  if (subscriberCount) {
    return subscriberCount;
  }
};
export const getInquiryCountApi = async () => {
  const inquiryCount = await api(
    `dashBoard/getInqueryCount`,
    {},
    "get"
  );
  if (inquiryCount) {
    return inquiryCount;
  }
};
export const getMasterCountApi = async () => {
  const masterCount = await api(
    `dashBoard/getActiveCount`,
    {},
    "get"
  );
  if (masterCount) {
    return masterCount;
  }
};

export const getNewsHeadlineCountApi = async () => {
  const newsHeadlineCount = await api(
    `dashBoard/getNewsHeadlineCount`,
    {},
    "get"
  );
  if (newsHeadlineCount) {
    return newsHeadlineCount;
  }
};

export const getNewsByNewsTypeCountApi = async () => {
  const newsHeadlineCount = await api(
    `dashBoard/getNewsByNewsTypeCount`,
    {},
    "get"
  );
  if (newsHeadlineCount) {
    return newsHeadlineCount;
  }
};


