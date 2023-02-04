import React from 'react';
import { View } from 'react-native';
import { makeStyles, Text } from '@rneui/themed';
import { MainStackScreenProps } from 'src/types/navigation.types';
import Button from 'src/components/ui/Button';

interface HomeScreenProps extends MainStackScreenProps<'Home'> {}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Details', {
            id: 'Hello',
          });
        }}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme?.colors?.background,
  },
}));

export default HomeScreen;
