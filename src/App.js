/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  ListView,
  Image,
  Dimensions,
  View
} from 'react-native';

// 屏幕长宽
const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;
// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 判断iphoneX
 */
function isIphoneX() {
  return Platform.OS === 'ios' &&
    (
      (screenH === X_HEIGHT && screenW === X_WIDTH) ||
      (screenH === X_WIDTH && screenW === X_HEIGHT)
    )
}

const containerTop = Platform.select({
  ios: isIphoneX() ? 44 : 20,
  android: 0,
  web: 0,
})
const containerBottom = Platform.select({
  ios: isIphoneX() ? 34 : 0,
  android: 0,
  web: 0,
})

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class App extends Component {
  state = {
    list: ds.cloneWithRows(new Array(20).fill({
      name: '炒鸡好吃的甜甜圈',
      source: require('../assets/img_01.png'),
      spec: '25g',
      price: '￥4.4',
    },))
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          style={{flex: 1}}
          dataSource={this.state.list}
          renderRow={(rowData) => (
            <View style={styles.listItem}>
              <Image style={styles.img} source={rowData.source}/>
              <View style={styles.introduction}>
                <Text style={styles.name}>
                  {rowData.name}
                </Text>
                <Text style={styles.spec}>
                  {`规格：${rowData.spec}`}
                </Text>
                <Text style={styles.price}>
                  {rowData.price}
                </Text>
              </View>
              <View style={styles.add}>
                <Text style={styles.addIcon}>+</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: containerTop,
    paddingBottom: containerBottom,
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'solid',
    position: 'relative',
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 18,
    color: '#333',
  },
  spec: {
    color: '#666',
    marginTop: 4,
  },
  price: {
    fontSize: 22,
    marginTop: 10,
    color: '#ea6f5a',
  },
  introduction: {
    flex: 1,
    paddingLeft: 10,
  },
  add: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    borderWidth: 1,
    borderColor: '#ea6f5a',
    borderStyle: 'solid',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    fontSize: 18,
    color: '#ea6f5a',
  },
  img: {
    width: 80,
    height: 80,
  },
  welcome: {
    fontSize: 24,
    marginBottom: 20
  }
});
