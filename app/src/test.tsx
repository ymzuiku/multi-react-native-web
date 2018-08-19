import * as React from 'react';
import { NaviBar, history } from './tinyNavigation';
import { View, Button } from 'react-native';

export default class extends React.Component {
  render() {
    return (
      <View>
        <NaviBar title="test-web" />
        <Button
          title="test-web"
          onPress={() => {
            history.push('/Discover/');
          }}
        />
      </View>
    );
  }
}
