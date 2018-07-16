import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList, AsyncStorage, TouchableOpacity, WebView } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const Swiper = require('react-native-swiper');
const Variable = require('../../common/css/variable');
const Goods = require('../../base/goods/Goods');

const CSS = StyleSheet.create({
  goodsDetailContainer: {
    flex: 1,
    backgroundColor: Variable.colorBackground
  },
  swiperWrapper: {
    width: deviceWidth,
    height: deviceWidth - 100,
    backgroundColor: '#fff'
  },
  goodsImg: {
    width: deviceWidth,
    height: deviceWidth - 100
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
  goodsContent: {
    padding: 10,
    backgroundColor: '#fff'
  },
  brand: {
    fontSize: 13,
    fontWeight: '700'
  },
  name: {
    fontSize: 12,
    fontWeight: 'normal'
  },
  unit: {
    fontSize: 10,
    color: Variable.colorUnit
  },
  price: {
    fontSize: 14,
    color: Variable.colorPrice
  },
  recommendTitle: {
    marginTop: 10,
    padding: 5,
    borderBottomWidth: .5,
    borderColor: '#ddd',
    fontSize: 12,
    backgroundColor: '#fff'
  },
  recommendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  infoText: {
    fontSize: 18,
    lineHeight: 27,
    color: '#999',
    padding: 27,
    backgroundColor: '#fff',
    marginTop: 10,

  },
  buyBtn: {
    marginTop: 5,
    width: 90,
    height: 30,
    backgroundColor: '#13227a',
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'solid',
    borderRadius: 5,
    overflow: 'hidden',

  },
  buyText: {
    textAlign: 'center',
    lineHeight: 25,
    fontSize: 15,
    color: '#fff',
  },
  webPort: {
    height: 500,
    backgroundColor: "#fff",
    marginTop: 20,
  },
});


class GoodsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      url: 'https://jxj322991.github.io/2018imgs/img/png/01.png',
      unit: '',
    }
  }
  static navigationOptions = {
    title: '商品详情'
  }
  render() {
    return (
      <FlatList
        style={CSS.goodsDetailContainer}
        ListHeaderComponent={this.listHeaderComponent}
        ListFooterComponent={this.listFooterCompnent}
        extraData={this.state}
        showsVerticalScrollIndicator={false} />
    );
  }
  componentWillMount = () => {
    this.getInfo();
  }
  listHeaderComponent = () => {
    return (
      <View>
        <Image style={CSS.goodsImg} resizeMode={'contain'} source={{
          uri: this.state.url,
          cache: 'force-cache'
        }} />
        <View style={CSS.goodsContent}>
          <Text style={CSS.brand}>
            类别 :
			  <Text style={CSS.name}>{this.state.name}</Text>
          </Text>
          <Text style={CSS.price}>
            {this.state.unit}
          </Text>
          <TouchableOpacity onPress={() => {
            alert('购买成功!');
            this.props.navigation.goBack();

          }}    >

            <View style={CSS.buyBtn}><Text style={CSS.buyText}>购买</Text></View>

          </TouchableOpacity>
        </View>
      </View>
    );
  }
  listFooterCompnent() {
    return (
      <View>
        <Text style={CSS.infoText}>
          React Native (简称RN)是Facebook于2015年4月开源的跨平台移动应用开发框架，是Facebook早先开源的JS框架 React 在原生移动应用平台的衍生产物，目前支持iOS和安卓两大平台。RN使用Javascript语言，类似于HTML的JSX，以及CSS来开发移动应用，因此熟悉Web前端开发的技术人员只需很少的学习就可以进入移动应用开发领域。        </Text>
        <Text style={CSS.infoText}>
          React Native使你能够在Javascript和React的基础上获得完全一致的开发体验，构建世界一流的原生APP。        </Text>
        <Text style={CSS.infoText}>
          React Native着力于提高多平台开发的开发效率 —— 仅需学习一次，编写任何平台。(Learn once, write anywhere)          </Text>
        <WebView
          style={CSS.webPort}
          source={{ uri: 'https://m.imooc.com/search/?words=react+native', }}
          mixedContentMode={'always'}
          saveFormDataDisabled={true}
        />
      </View>

    );
  }
  getInfo() {
    AsyncStorage.getItem('infoUnit', (error, result) => {
      if (!error) {
        this.setState({
          unit: result
        });
      }
    });
    AsyncStorage.getItem('infoName', (error, result) => {
      if (!error) {
        this.setState({
          name: result
        });
      }
    });
    AsyncStorage.getItem('infoUrl', (error, result) => {
      if (!error) {
        this.setState({
          url: result
        });
      }
    });
  }

}

module.exports = GoodsDetail;