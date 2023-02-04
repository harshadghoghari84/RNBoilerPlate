import axios, { AxiosRequestConfig } from 'axios';
import { FetchResponse, FetchResponseError } from 'src/types/fetch.types';
import { AppThunk } from 'src/types/store.types';
import { setErrors } from 'src/store/global/global.slice';
import Config from 'react-native-config';
import secureStoreKeys from 'src/constants/secureStoreKeys';
import { getSecureValue } from 'src/utils/secureStore';

export const AxiosInstance = axios.create({
  baseURL: Config.API_URL,
});

export const fetch = async <T>(
  config: AxiosRequestConfig,
  isPrivate = true
): Promise<FetchResponse<T>> => {
  const result: FetchResponse<T> = {
    data: undefined,
    errors: null,
    statusCode: null,
    errorMessage: null,
    headers: null,
  };

  try {
    const token = await getSecureValue(secureStoreKeys.LOGIN_TOKEN);
    if (!token && isPrivate) {
      result.statusCode = 401;
      result.errors = {
        code: 401,
        message: 'Not logged in',
        errors: [],
      };
      result.errorMessage = 'Not logged in';

      return result;
    }

    const axConfig = { ...config };

    if (token && isPrivate) {
      const headers = {
        Authorization: `Token ${token}`,
      };

      if (axConfig?.headers) {
        axConfig.headers = { ...axConfig.headers, ...headers };
      } else {
        axConfig.headers = headers;
      }
    }

    console.log('API : ', axConfig.url, axConfig);

    const response = await AxiosInstance.request<{
      data?: T;
      errors?: FetchResponseError;
    }>(axConfig);

    if (response.status.toString().startsWith('2')) {
      // console.log('RESPONSE : ', response.data.data);

      result.data = response.data.data;
      result.statusCode = response.status;
      result.headers = response.headers;
      return result;
    }
  } catch (err: any) {
    const generalError: FetchResponseError = {
      code: null,
      message: 'Something went wrong',
      errors: [
        {
          domain: 'global',
          reason: 'server',
          message: 'Something went wrong',
        },
      ],
    };

    result.errors = generalError;
    result.errorMessage = 'Something went wrong';

    if (err.code === 'ECONNREFUSED') {
      result.errors = {
        code: null,
        message: 'Failed to connect to server',
        errors: [
          {
            domain: 'global',
            reason: 'Connection Refused',
            message: 'Failed to connect to server',
          },
        ],
      };
      result.errorMessage = 'Failed to connect to server';
    } else if (err?.response) {
      if (err?.response?.status.toString().startsWith('5')) {
        if (err?.response?.data?.error) {
          result.errors = err?.response?.data?.error || generalError;
        }
        result.statusCode = err?.response?.status;
        result.errorMessage = 'Something went wrong';
      } else {
        result.statusCode = err?.response?.status;
        result.errorMessage =
          err?.response?.data?.error?.message || err.message || 'Something went wrong!';
        result.errors = err?.response?.data?.error || generalError;
      }
    }
  }

  console.log('API Error', result);
  return result;
};

export const fetchAction =
  <T>(config: AxiosRequestConfig, isPrivate = true): AppThunk<Promise<FetchResponse<T>>> =>
  async (dispatch) => {
    const res = await fetch<T>(config, isPrivate);
    const { data, errors, errorMessage, statusCode, headers } = res;

    if (errors) {
      dispatch(setErrors(errors));
    }

    return { data, errors, errorMessage, statusCode, headers };
  };
