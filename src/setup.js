import React from 'react';
import {
  AppRegistry,
  View,
  Text,
  Button,
  ScrollView
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Chat from './containers/Chat';

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <Text>{banner}</Text>
    <Button
      onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
      title="Go to a profile screen"
    />
    <Button
      onPress={() => navigation.navigate('Photos', { name: 'Jane' })}
      title="Go to a photos screen"
    />
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </ScrollView>
);

const MyHomeScreen = ({ navigation }) => (
  <MyNavScreen banner="Home Screen" navigation={navigation} />
);
MyHomeScreen.navigationOptions = {
  title: 'Welcome',
  headerStyle: { backgroundColor: 'red' },
  headerTitleStyle: { color: 'white' }
};

const MyPhotosScreen = ({ navigation }) => (
  <MyNavScreen
    banner={`${navigation.state.params.name}'s Photos`}
    navigation={navigation}
  />
);
MyPhotosScreen.navigationOptions = {
  title: 'Photos',
};

const MyProfileScreen = ({ navigation }) => (
  <MyNavScreen
    banner={`${navigation.state.params.mode === 'edit' ? 'Now Editing ' : ''}${navigation.state.params.name}'s Profile`}
    navigation={navigation}
  />
);

MyProfileScreen.navigationOptions = props => {
  const { navigation } = props;
  const { state, setParams } = navigation;
  const { params } = state;
  return {
    headerTitle: `${params.name}'s Profile!`,
    // Render a button on the right side of the header.
    // When pressed switches the screen to edit mode.
    headerRight: (
      <Button
        title={params.mode === 'edit' ? 'Done' : 'Edit'}
        onPress={() =>
          setParams({ mode: params.mode === 'edit' ? '' : 'edit' })}
      />
    ),
  };
};

const StartKit = StackNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Profile: {
    screen: MyProfileScreen,
  },
  Photos: {
    screen: MyPhotosScreen,
  },
});

AppRegistry.registerComponent('StartKit', () => StartKit);
