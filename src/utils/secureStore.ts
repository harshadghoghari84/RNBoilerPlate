import * as SecureStore from 'expo-secure-store';

// get value from secure store
const getSecureValue = async (key: string) => {
  let result;
  try {
    result = await SecureStore.getItemAsync(key);
  } catch (e) {
    console.log(e);
  }
  return result ?? null;
};

// save value in secure store
const setSecureValue = async (key: string, value: string) => {
  try {
    return await SecureStore.setItemAsync(key, value);
  } catch (e) {
    console.log(e);
  }
  return null;
};

// delete secure store value
const deleteSecureValue = async (key: string) => {
  try {
    return await SecureStore.deleteItemAsync(key);
  } catch (e) {
    console.log(e);
  }

  return null;
};

export { getSecureValue, setSecureValue, deleteSecureValue };
