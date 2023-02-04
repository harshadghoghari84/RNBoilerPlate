import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  Details: {
    id: string;
  };
};

export type MainStackScreenProps<T extends keyof MainStackParamList> = NativeStackScreenProps<
  MainStackParamList,
  T
>;
