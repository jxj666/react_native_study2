import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import Header from '../header/header';
const Goods = require('../../base/goods/Goods');
const Variable = require('../../common/css/variable');
const Swiper = require('react-native-swiper');
const deviceWidth = Dimensions.get('window').width;
const CSS = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: Variable.colorBackground
  },
  swiperWrapper: {
    width: deviceWidth,
    height: deviceWidth / 2
  },
  swiperImg: {
    width: deviceWidth,
    height: deviceWidth / 2
  },
  dotCommon: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
  },
  activeDot: {
    backgroundColor: '#f8ee1c',
  },
  goodsCategory: {
    width: deviceWidth,
    height: 60
  },
  recommendContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2.5,
  },
  recommendHeader: {
    width: deviceWidth,
    height: 20
  },
  totalGoodsTitle: {
    fontSize: 20,
    color: '#999',
    textAlign: 'center',
    height: 50,
    lineHeight: 50,
  },
  listGoodsTitle: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    height: 40,
    lineHeight: 40,
  }
});
// Home
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goodsList: [],
      goodsList1: [],
      goodsList2: [],
      goodsList3: [],
    }
  }
  componentWillMount() {
    this.goodsHttp()
  }
  render() {
    const goodsList = [
      {
        title: '优惠活动',
        key: '1'
      },
      {
        title: '今日推荐',
        key: '2'
      },
      {
        title: '热点商品',
        key: '3'
      },
    ];
    return (
      <View style={CSS.homeContainer}>
        <Header />
        <FlatList
          data={goodsList}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this.listHeaderComponent}
          ListFooterComponent={this.listFooterComponent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
  goodsHttp = () => {
    return fetch('https://easy-mock.com/mock/5afd2420659068782e1217ef/api/test1/goods', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code) {
          this.setState({
            goodsList: responseJson.data.list,
            goodsList1: responseJson.data.list1,
            goodsList2: responseJson.data.list2,
            goodsList3: responseJson.data.list3,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  listHeaderComponent = () => {
    return (
      <SwiperAds />
    );
  };
  _renderItem = ({ item }) => {
    let childGoodsList = [];
    if (item.key == 1) {
      childGoodsList = this.state.goodsList1;
    } else if (item.key == 2) {
      childGoodsList = this.state.goodsList2;
    } else {
      childGoodsList = this.state.goodsList3;
    }
    return (
      <View>
        <Text style={CSS.listGoodsTitle}>
          - - - {item.title} - - -
		  </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={childGoodsList}
          renderItem={this.renderGoods}
          keyExtractor={this._keyGoodsExtractor}
        />
      </View>
    );
  };
  _keyExtractor = (item) => {
    return item.key;
  };
  renderGoods = ({ item }) => {
    return (
      <Goods navigation={this.props.navigation} goods={item} goodsStyle={'normal'} />
    );
  };
  _keyGoodsExtractor = (item) => {
    return item.key;
  };
  listFooterComponent = () => {
    const numColumns = 2;
    return (
      <View>
        <Text style={CSS.totalGoodsTitle}>
          - - - 全部商品 - - -
		  </Text>
        <View style={CSS.recommendContainer}>
          <FlatList
            data={this.state.goodsList}
            renderItem={this.renderTotal}
            horizontal={false}
            numColumns={numColumns}
          ></FlatList>
        </View>
      </View>
    );
  }
  renderTotal = ({ item }) => {
    return (
      <Goods navigation={this.props.navigation} goods={item} goodsStyle={'recommend'} />
    );
  }
}
// Swiper 轮播图
class SwiperAds extends React.Component {
  render() {
    return (
      <View style={CSS.swiperWrapper}>
        <Swiper autoplay dot={this._dot()} activeDot={this._activeDot()}>
          <Image style={CSS.swiperImg} source={require('./banner1.png')} resizeMode={Image.resizeMode.stretch} />
          <Image style={CSS.swiperImg} source={require('./banner2.png')} resizeMode={Image.resizeMode.stretch} />
          <Image style={CSS.swiperImg} source={require('./banner3.png')} resizeMode={Image.resizeMode.stretch} />
        </Swiper>
      </View>
    );
  }
  _dot = () => {
    return (
      <View style={[CSS.dot, CSS.dotCommon]} />
    );
  };
  _activeDot = () => {
    return (
      <View style={[CSS.activeDot, CSS.dotCommon]} />
    );
  }
}
module.exports = Home;