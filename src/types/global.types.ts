import { EdgeInsets } from 'react-native-safe-area-context';

export interface GlobalState {
  errors: any;
  errorMessage: string | null;

  success: boolean;
  successMessage: string;
}

export enum LoadingState {
  FETCH = 1,
  CREATE,
  REMOVE,
}

export type ThemeProps = { insets: EdgeInsets };
