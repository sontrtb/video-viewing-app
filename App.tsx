import React from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {store} from '@app/src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from '@app/src/redux/store';

import {StatusBar} from 'react-native';

import Toast from 'react-native-toast-message';
import MyStack from '@app/src/router';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <GestureHandlerRootView style={{flex: 1}}>
            <StatusBar />
            <MyStack />
            <Toast />
          </GestureHandlerRootView>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
