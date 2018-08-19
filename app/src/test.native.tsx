import * as React from 'react';
import { NaviBar, history } from './tinyNavigation';
import { View, Button } from 'react-native';

export default class extends React.Component {
  render() {
    return (
      <View>
        <NaviBar title="test-native" />
        <Button title="test-native" onPress={()=>{
          history.push('/Discover/')
        }} />
      </View>
    );
  }
}
