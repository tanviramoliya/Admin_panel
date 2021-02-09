import {
  getInquiryList,
  } from "../index";
  import { api } from '../../../api/api';

  export const inquiryListApi = () => {
    return async (dispatch) => {
      await api('inquiry/getAll', {}, 'get')
        .then((res) => {
          dispatch(getInquiryList(res.data.data));
        })
        .catch((error) => {
          console.log(error)
          // toastr.error('Can not able to get Category list');
        });
    };
  };

  export const deleteInquiryApi = async (data) => {
    const deleteInquiry = await api(`inquiry/deleteInquiry`, data, 'delete');
    if (deleteInquiry) {
      return deleteInquiry;
    }
  };
  export const addSubscriberApi = async (data) => {
    const createSubscriber = await api(
      "inquiry/addInquiry",
      data,
      "post"
    );
    if (createSubscriber) {
      return createSubscriber;
    }
  };
  export const submitReplyApi = async (data) => {
    const submitReply = await api(
      "inquiry/reply/addReply",
      data,
      "post"
    );
    if (submitReply) {
      return submitReply;
    }
  };
  