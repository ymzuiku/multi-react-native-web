import * as React from 'react';
import { View, StyleSheet, Dimensions, Animated, Platform } from 'react-native';
import {
  history,
  Route,
  historyAddListen,
  historyRemoveListen,
} from './routerHistory';

const AnimatedView = Animated.createAnimatedComponent(View);

const iw = Dimensions.get('window').width;
const isWeb = Platform.OS === 'web';

interface IProps {
  exact?: boolean;
  path: string;
  component?: any;
  render?: any;
  children?: any;
  backgroundColor?: string;
  animed: boolean;
  moveOutFix: number;
  moveInFix: number;
  isShowdown?: boolean;
  root?: boolean;
}

class NaviRoute extends React.PureComponent<IProps, any> {
  static defaultProps = {
    moveOutFix: 1,
    moveInFix: 1,
    backgroundColor: '#fff',
    animed: true,
    isShowdown: true,
  };
  listen: number = 0;
  state = {
    nowRoute: false,
    index: this.props.root ? 1 : 0,
    staticAnime: this.props.root ? 0 : iw,
    isAnime: false,
    moveAnime: new Animated.Value(this.props.root ? 0 : iw),
  };
  componentDidMount() {
    const path = this.props.path.replace('*', '');
    this.listen = historyAddListen((h: any) => {
      let index = 0;
      for (let i = 0; i < h.entries.length; i++) {
        const r = h.entries[i];
        if (r.pathname === path) {
          index = i;
        }
      }
      if (index === h.index && !this.state.nowRoute) {
        this.setState(
          {
            nowRoute: true,
            index: 1,
          },
          () => {
            this.moveNowPage(0);
          },
        );
      } else if (index > h.index && this.state.nowRoute) {
        this.setState(
          {
            nowRoute: false,
            index: 0,
            staticAnime: 0,
            moveAnime: new Animated.Value(0),
          },
          () => {
            this.moveNowPage(iw * this.props.moveInFix);
          },
        );
      } else if (index < h.index && this.state.nowRoute) {
        this.setState(
          {
            nowRoute: false,
            index: 0,
            staticAnime: 0,
            moveAnime: new Animated.Value(0),
          },
          () => {
            this.moveNowPage(-iw * this.props.moveOutFix);
          },
        );
      }
    });
  }
  componentWillUnmount() {
    historyRemoveListen(this.listen);
  }
  moveNowPage = (x: number) => {
    if (this.props.animed) {
      this.setState({ isAnime: true });
      Animated.spring(this.state.moveAnime, {
        useNativeDriver: !isWeb,
        toValue: x,
        damping: 33,
        stiffness: 320,
      }).start();
    } else {
      this.setState({
        staticAnime: x,
        isAnime: false,
      });
    }
  };
  render() {
    const moveX = this.props.animed
      ? this.state.moveAnime
      : this.state.staticAnime;
    return (
      <AnimatedView
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: this.props.backgroundColor,
          zIndex: this.state.index * 10,
          transform: [{ translateX: moveX }],
        }}
      >
        {/* <View
          style={{
            width: 1,
            height: '100%',
            backgroundColor: '#000',
            opacity: 0.12,
            position: 'absolute',
            left: -1,
          }}
        /> */}
        <Route
          exact={this.props.exact}
          path={this.state.isAnime ? '*' : this.props.path}
          component={this.props.component}
          render={this.props.render}
          children={this.props.children}
        />
      </AnimatedView>
    );
  }
}

export default NaviRoute;
