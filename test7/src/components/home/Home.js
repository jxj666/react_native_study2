import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, Dimensions } from 'react-native';
import Header from '../header/header';

const Goods = require('../../base/goods/Goods');


const Variable = require('../../common/css/variable');
const Swiper = require('react-native-swiper');
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

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
  totalGoodsTitle:{
  	fontSize:20,
  	color:'#999',
  	textAlign:'center',
  	height:50,
  	lineHeight: 50,
  },
  listGoodsTitle:{
  	fontSize:18,
  	color:'#999',
  	textAlign:'center',
  	height:40,
  	lineHeight: 40,
  }
});

// Home
class Home extends React.Component {
  render() {
	const goodsList = [
	  { title: '优惠活动', key: 'item1' },
	  { title: '今日推荐', key: 'item2' },
	  { title: '热点商品', key: 'item3' },
	];
	return (
		<View style={ CSS.homeContainer }>
		  <Header/>
		  <FlatList
			  data={ goodsList }
			  renderItem={ this._renderItem }
			  keyExtractor={ this._keyExtractor }
			  ListHeaderComponent={ this.listHeaderComponent }
			  ListFooterComponent={ this.listFooterComponent }
			  showsVerticalScrollIndicator={ false }
		  />
		</View>
	);
  }

  listHeaderComponent = () => {
	return (
		<SwiperAds/>
	);
  };

  _renderItem = ({item}) => {
	const childGoodsList = [
	  { title: '商品1', key: 'item1' },
	  { title: '商品2', key: 'item2' },
	  { title: '商品3', key: 'item3' },
	  { title: '商品4', key: 'item4' },
	  { title: '商品5', key: 'item5' }
	];

	return (
		<View>
		  <Text style={CSS.listGoodsTitle}>
		    - - - {item.title} - - -
		  </Text>
		  <FlatList
			  showsHorizontalScrollIndicator={ false }
			  horizontal={ true }
			  data={ childGoodsList }
			  renderItem={ this.renderGoods }
			  keyExtractor={ this._keyGoodsExtractor }
		  />
		</View>
	);
  };

  _keyExtractor = (item) => {
	return item.key;
  };

  renderGoods = ({item}) => {
	return (
		<Goods navigation={ this.props.navigation } goods={item.title} goodsStyle={ 'normal' }/>
	);
  };

  _keyGoodsExtractor = (item) => {
	return item.key;
  };

  listFooterComponent = () => {
	return (
		<Recommend navigation={ this.props.navigation }/>
	);
  }
}



// Swiper 轮播图
class SwiperAds extends React.Component {
  render() {
	return (
		<View style={ CSS.swiperWrapper }>
		  <Swiper autoplay dot={ this._dot() } activeDot={ this._activeDot() }>
			<Image style={ CSS.swiperImg } source={ require('./banner1.png') } resizeMode={Image.resizeMode.stretch}/>
			<Image style={ CSS.swiperImg } source={ require('./banner2.png') } resizeMode={Image.resizeMode.stretch} />
			<Image style={ CSS.swiperImg } source={ require('./banner3.png') } resizeMode={Image.resizeMode.stretch} />
		  </Swiper>
		</View>

	);
  }

  _dot = () => {
	return (
		<View style={ [CSS.dot, CSS.dotCommon] }/>
	);
  };

  _activeDot = () => {
	return (
		<View style={ [CSS.activeDot, CSS.dotCommon] }/>
	);
  }
}

// recommend
class Recommend extends React.Component {
  render() {
  	const List = [
	  { title: '优惠活动', key: 'item1' },
	  { title: '今日推荐', key: 'item2' },
	  { title: '热点商品', key: 'item3' },
	  { title: '优惠活动', key: 'item11' },
	  { title: '今日推荐', key: 'item12' },
	  { title: '热点商品', key: 'item13' },
	  { title: '优惠活动', key: 'item21' },
	  { title: '今日推荐', key: 'item22' },
	  { title: '热点商品', key: 'item23' },
	  { title: '优惠活动', key: 'item41' },
	  { title: '今日推荐', key: 'item42' },
	  { title: '热点商品', key: 'item43' },
	];
	const numColumns=2;
	return (
		<View>
		  <Text style={CSS.totalGoodsTitle}>
		    - - - 全部商品 - - -
		  </Text>
		  <View style={ CSS.recommendContainer }>
		  	<FlatList
		  	data={List}
		  	renderItem={this.renderTotal}
		  	horizontal={false}
		  	numColumns={numColumns}
		  	></FlatList>
		  </View>
		</View>
	);
  }
  renderTotal= () => {
  	return(
  		<Goods navigation={ this.props.navigation } goodsStyle={ 'recommend' }/>
  		);
  }
}


module.exports = Home;