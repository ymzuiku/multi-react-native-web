import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {
  history,
  hashChange,
  Router,
  NaviRoute,
  NaviBar,
} from './tinyNavigation';
import Test from './test';

const instructions = Platform.select({
  web: 'Press Cmd+R to reload web',
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const assets = {
  test: require('./assets/test.png'),
};

class Desktop extends React.Component {
  componentDidMount(){
    console.log('render-desktop')
  }
  render() {
    return (
      <View>
        <NaviBar root />
        <Button title="Desktop" onPress={history.goBack} />
      </View>
    );
  }
}
class Discover extends React.Component {
  componentDidMount(){
    console.log('render-Discover')
  }
  render() {
    return (
      <View>
        <NaviBar />
        <Button title="Discover" onPress={history.goBack} />
      </View>
    );
  }
}
class Root extends React.Component {
  goDiscover = () => {
    history.push('/Discover/');
  };
  goDesktop = () => {
    history.push('/Desktop/');
  };
  goTest = () => {
    history.push('/Test/');
  };
  render() {
    return (
      <View style={ssc.full}>
        <NaviBar root />
        <View style={ssc.container}>
          <Image source={assets.test} style={{ width: 100, height: 100 }} />
          <Text style={ssc.welcome}>Welcome to React Native!</Text>
          <Text style={ssc.instructions}>To get started, edit App.js</Text>
          <Text style={ssc.instructions}>{instructions}</Text>
          <TouchableOpacity onPress={this.goDiscover}>
            <Text>go to discover</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goDesktop}>
            <Text>go to desktop</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goTest}>
            <Text>go to test</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default class App extends React.Component {
  componentDidMount() {
    // if begin use other URL page, to be use hashChange()
    history.push('/home/');
    // hashChange();
  }

  render() {
    return (
      <Router history={history}>
        <View style={ssc.container}>
          <NaviRoute root={true} exact path="/home/*" component={Root} />
          <NaviRoute root={true} exact path="/home/*" component={Root} />
          <NaviRoute exact path="/Discover/*" component={Discover} />
          <NaviRoute exact path="/Desktop/*" component={Desktop} />
          <NaviRoute exact path="/Test/*" component={Test} />
        </View>
      </Router>
    );
  }
}

const ssc = StyleSheet.create({
  full: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
