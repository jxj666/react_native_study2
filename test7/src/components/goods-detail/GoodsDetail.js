import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';

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
  }
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
      style={ CSS.goodsDetailContainer }
      ListHeaderComponent={ this.listHeaderComponent }
      ListFooterComponent={ this.listFooterCompnent }
      extraData={this.state}
      showsVerticalScrollIndicator={ false }/>
    //     <View style={ CSS.goodsDetailContainer }>
    //     <View>
    // 	<Image style={ CSS.goodsImg } resizeMode={ 'contain' } source={  {
    //       uri: this.state.url,
    //       cache: 'force-cache'
    //     }}/>
    //   <View style={ CSS.goodsContent }>
    // 	<Text style={ CSS.brand }>
    // 	  类别 : 
    // 	  <Text style={ CSS.name }>{this.state.name}</Text>
    // 	</Text>
    // 	<Text style={ CSS.price }>
    // 	  {this.state.unit}
    // 	</Text>
    //   </View>
    // </View>
    //       <View>
    // <Text style={CSS.infoText}>
    // 	商品是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。恩格斯对此进行了科学的总结：商品“首先是私人产品。但是，只有这些私人产品不是为自己消费，而是为他人的消费，即为社会的消费而生产时，它们才成为商品；它们通过交换进入社会的消费”。	  
    // </Text>	
    // 		<Text style={CSS.infoText}>
    // 	商品是人类社会生产力发展到一定历史阶段的产物，是用于交换的劳动产品。恩格斯对此进行了科学的总结：商品“首先是私人产品。但是，只有这些私人产品不是为自己消费，而是为他人的消费，即为社会的消费而生产时，它们才成为商品；它们通过交换进入社会的消费”。	  
    // </Text>		
    // </View>
    //     </View>
    );
  }
  componentWillMount = () => {
    this.getInfo();
  }
  listHeaderComponent= () => {
    // this.getInfo();
    return (
      <View>
			<Image style={ CSS.goodsImg } resizeMode={ 'contain' } source={  {
        uri: this.state.url,
        cache: 'force-cache'
      }}/>
		  <View style={ CSS.goodsContent }>
			<Text style={ CSS.brand }>
			  类别 : 
			  <Text style={ CSS.name }>{this.state.name}</Text>
			</Text>
			<Text style={ CSS.price }>
			  {this.state.unit}
			</Text>
					  <TouchableOpacity onPress={ () => {
        alert('购买成功!');
        this.props.navigation.goBack();

      }}    >

      <View style={ CSS.buyBtn }><Text style={ CSS.buyText }>购买</Text></View>
  
		  </TouchableOpacity>
		  </View>
		</View>
    );
  }
  listFooterCompnent() {
    return (
      <View>
		<Text style={CSS.infoText}>
首先告诉大家什么是React Native?为什么要用React Native？ 传统开发的痛点，React Native的优点，然后教大家Mac和Windows下搭建React Native开发环境以及选择什么样的开发工具，最后教大家构建官方example，学会如何运行官方提供的示例项目。		
       </Text>	
		<Text style={CSS.infoText}>
大家可以学习到什么是React Native的组件、如何创建一个组件， 组件的生命周期以及对应的方法、作用、调用时机，什么是props、如何用props进行数据传递、检查，什么是status，什么是ref，什么是类，E6与ES5在React Native中有哪些不同，UI界面布局，按钮详解与技巧，图片加载技巧与使用详解，调试技巧等		
</Text>		
		<Text style={CSS.infoText}>
会教大家一些按钮使用技巧，图片加载技巧和ReactNative调试技巧，让大家在学会基础部分之而后，可以更进一步的掌握一些高级的技巧。</Text>	
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