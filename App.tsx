import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import theme from 'src/theme';
import { Provider } from 'react-redux';
import store from 'src/store/store';
import MainNavigator from 'src/navigation';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <MainNavigator />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
