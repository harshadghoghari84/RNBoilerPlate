import React from 'react';
import { View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import { MainStackScreenProps } from 'src/types/navigation.types';

interface DetailsScreenProps extends MainStackScreenProps<'Details'> {}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const styles = useStyles();
  console.log(route.params);
  return <View style={styles.container} />;
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors?.background,
  },
}));

export default DetailsScreen;
