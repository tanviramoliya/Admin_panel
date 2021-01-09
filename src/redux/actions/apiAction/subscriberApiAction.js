import {
  getSubscriberList,
  } from "../index";
  import { api } from '../../../api/api';

  export const subscriberListApi = () => {
    return async (dispatch) => {
      await api('subscription/getAll', {}, 'get')
        .then((res) => {
          dispatch(getSubscriberList(res.data.data));
        })
        .catch((error) => {
          console.log(error)
          // toastr.error('Can not able to get Category list');
        });
    };
  };

  export const deleteSubscriberApi = async (data) => {
    const deleteSubscriber = await api(`subscription/delete`, data, 'delete');
    if (deleteSubscriber) {
      return deleteSubscriber;
    }
  };
  export const addSubscriberApi = async (data) => {
    const createSubscriber = await api(
      "subscription/userSignUp",
      data,
      "post"
    );
    if (createSubscriber) {
      return createSubscriber;
    }
  };
  
  export const updateSubscriberApi = async (data) => {
    const updateSubscriber = await api(
      `newsHeadLine/updateNewsHeadline`,
      data,
      "put"
    );
    if (updateSubscriber) {
      return updateSubscriber;
    }
  };