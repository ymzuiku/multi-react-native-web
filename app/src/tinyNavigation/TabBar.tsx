import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { history } from './routerHistory';

interface IItemProps {
  style?: React.CSSProperties;
  title?: string;
  onPress?: Function;
  path?: string;
  state?: any;
}

class TabBarItem extends React.PureComponent<IItemProps, object> {
  handleOnPress = () => {
    if (this.props.onPress) {
      this.props.onPress();
    }
    if (this.props.path) {
      history.push(this.props.path, this.props.state);
    }
  };
  render() {
    return (
      <TouchableOpacity style={ssc.item} onPress={this.handleOnPress}>
        <Text>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

interface IProps {
  isIPhoneX?: boolean;
  items: Array<IItemProps>;
}

class TabBar extends React.PureComponent<IProps, object> {
  render() {
    return (
      <View
        style={[
          ssc.container,
          {
            maxHeight: !this.props.isIPhoneX ? 48 : 60,
            minHeight: !this.props.isIPhoneX ? 48 : 60,
            paddingBottom: !this.props.isIPhoneX ? 0 : 22,
          },
        ]}
      >
        {this.props.items.map((v, i) => {
          return <TabBarItem key={v.title} {...v} />;
        })}
      </View>
    );
  }
}

const ssc = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 48,
    minHeight: 48,
    width: '100%',
    backgroundColor: '#f3f3f3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default TabBar;
