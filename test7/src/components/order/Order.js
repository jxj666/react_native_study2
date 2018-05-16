import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';
import Header from '../header/header';

const deviceWidth = Dimensions.get('window').width;
const OrderGoods = require('../../base/order-goods/OrderGoods');
const MBtn = require('../../base/btns/m-btn');

const CSS = StyleSheet.create({
  orderListContainer: {
	flex: 1
  },
  orderGoodsWrapper: {
	marginBottom: 5,
	padding: 5,
	backgroundColor: '#fff'
  },
  orderHeader: {
	flexDirection: 'row',
	justifyContent: 'space-between',
	height: 25,
	borderBottomWidth: .5,
	borderColor: '#ddd'
  },
  store: {
	alignSelf: 'center',
	fontSize: 13,
	fontWeight: '400'
  },
  orderStatus: {
	alignSelf: 'center',
	fontSize: 13,
	color: '#ff8017'
  },
  orderDetail: {
	flexDirection: 'row',
	justifyContent: 'space-between',
	height: 25,
	borderTopWidth: .5,
	borderColor: '#ddd'
  },
  createDate: {
	alignSelf: 'center',
	color: '#ff8017',
	fontSize: 12
  },
  totalWrapper: {
	alignSelf: 'center',
  },
  totalQuantity: {
	color: '#333',
	fontSize: 12
  },
  totalPrice: {
	color: '#333',
	fontSize: 12
  },
  totalColor: {
	color: '#fb5627'
  },
  btnsGroup: {
	flexDirection: 'row',
	alignSelf: 'flex-end',
	paddingTop: 5,
	height: 30
  }
});

let navigation;
class Order extends React.Component {
  constructor(props) {
	super(props);
	navigation = props.navigation;
  }

  render() {
	return (
		<View style={ CSS.orderListContainer }>
		<Header />
		<OrderList />
		  {/*<OrderTopTabNavigator/>*/}
		</View>
	);
  }
}

class OrderList extends React.Component {
  constructor(props) {
	super(props);
  }

  render() {
	const goodsList = [
	  { id:'12233', goods:{name:'课程1',price:'999',  num:1, discounts:true, url:'https://jxj322991.github.io/2018imgs/img/png/01.png', unit:'999元/部'}, state: '已付款', key: 'item1' },
	  { id:'12324', goods:{name:'课程2',price:'99',  num:1, discounts:false, url:'https://jxj322991.github.io/2018imgs/img/png/02.png', unit:'99元/讲'}, state: '已发货', key: 'item2' },
	  { id:'13342', goods:{name:'课程3',price:'99',  num:1, discounts:true, url:'https://jxj322991.github.io/2018imgs/img/png/03.png', unit:'99元/篇'}, state: '已下单', key: 'item3' },
	  { id:'13254', goods:{name:'课程4',price:'9',  num:1, discounts:true, url:'https://jxj322991.github.io/2018imgs/img/png/04.png', unit:'9元/讲'}, state: '已付款', key: 'item4' },
	  { id:'13423', goods:{name:'课程5',price:'9',  num:1, discounts:false, url:'https://jxj322991.github.io/2018imgs/img/png/05.png', unit:'9元/讲'}, state: '已下单', key: 'item5' },
	  { id:'12234', goods:{name:'课程6',price:'999',  num:1, discounts:true, url:'https://jxj322991.github.io/2018imgs/img/png/06.png', unit:'999元/讲'}, state: '已付款', key: 'item6' },
	  { id:'13424', goods:{name:'课程7',price:'99',  num:11, discounts:true, url:'https://jxj322991.github.io/2018imgs/img/png/07.png', unit:'9元/章'}, state: '已下单', key: 'item7' },
	  { id:'13456', goods:{name:'课程8',price:'99',  num:1, discounts:false, url:'https://jxj322991.github.io/2018imgs/img/png/08.png', unit:'99元/讲'}, state: '已付款', key: 'item8' },
	  { id:'13443', goods:{name:'课程9',price:'9',  num:1, discounts:true, url:'https://jxj322991.github.io/2018imgs/img/png/09.png', unit:'9元/段'}, state: '已下单', key: 'item9' },
	];

	return (
		
		<FlatList
			showsVerticalScrollIndicator={ false }
			data={ goodsList }
			renderItem={ this.renderOrderGoods }
		/>

	);
  }

  renderOrderGoods = ({item}) => {
	return (
		<View style={ CSS.orderGoodsWrapper }>
		  <TouchableOpacity onPress={ () => {
			navigation.navigate('PayResult')
		  } }>
			<View style={ CSS.orderHeader }>
			  <Text style={ CSS.store }>订单号:{item.id}</Text>
			  <Text style={ CSS.orderStatus }>{item.state}</Text>
			</View>
			<OrderGoods goods={item.goods}/>
			<View style={ CSS.orderDetail }>
			  <Text style={ CSS.createDate }>2017-09-10 12:12:12</Text>
			  <Text style={ CSS.totalWrapper }>
				<Text style={ CSS.totalPrice }>金额 :  <Text style={ CSS.totalColor }> {item.goods.price}.00 RMB</Text></Text>
			  </Text>
			</View>
		  </TouchableOpacity>
		</View>
	);
  }
}

module.exports = Order;