import React, { FC, useEffect } from 'react';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectGlobalErrors, selectGlobalSuccess } from 'src/store/global/global.selectors';
import Snackbar from 'react-native-snackbar';
import useAppDispatch from 'src/hooks/useAppDispatch';
import { clearErrors, clearSuccess } from 'src/store/global/global.slice';
import { useTheme } from '@rneui/themed';
import Config from 'react-native-config';
import MainStack from './Main.stack';

const linking: LinkingOptions<any> = {
  prefixes: [`https://${Config.REDIRECT_URL}/`, `${Config.SCHEMA}://`],
  config: {
    screens: {},
  },
};

const MainNavigator: FC = () => {
  const dispatch = useAppDispatch();
  const { errors, errorMessage } = useSelector(selectGlobalErrors);
  const { success, successMessage } = useSelector(selectGlobalSuccess);
  const { theme } = useTheme();

  useEffect(() => {
    if (
      errors &&
      errors.errors?.findIndex(
        (err: any) => err.domain === 'global' || err.domain === 'nonFieldErrors'
      ) !== -1
    ) {
      Snackbar.show({
        text: errorMessage || 'Something went wrong',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: theme.colors.error,
        textColor: theme.colors.white,
        fontFamily: theme.fontFamily.medium,
      });

      dispatch(clearErrors());
    }
  }, [
    dispatch,
    errorMessage,
    errors,
    theme.colors.error,
    theme.colors.white,
    theme.fontFamily.medium,
  ]);

  useEffect(() => {
    if (success && successMessage) {
      Snackbar.show({
        text: successMessage,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: theme.colors.grey5,
        textColor: theme.colors.black,
        fontFamily: theme.fontFamily.medium,
      });

      dispatch(clearSuccess());
    }
  }, [
    dispatch,
    success,
    successMessage,
    theme.colors.black,
    theme.colors.grey5,
    theme.fontFamily.medium,
  ]);

  return (
    <NavigationContainer linking={linking}>
      <MainStack />
    </NavigationContainer>
  );
};

export default MainNavigator;
