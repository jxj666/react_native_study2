import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, AsyncStorage} from 'react-native';
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
    fontWeight: '400',
    color: '#13227a',
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
    color: '#13227a',
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
  },
  unLoginText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#13227a',
  },
  unLogin: {
    paddingTop: 200,
  },

});

let navigation;
class Order extends React.Component {
  constructor(props) {
    super(props);
    navigation = props.navigation;
    this.state = {
      userInfo: '',
    }
  }


  render() {
    return (
      <View style={ CSS.orderListContainer }>
    <Header /> 
    {this.contentHtml()}
    </View>
    );
  }
  contentHtml =() => {
    AsyncStorage.getItem('user', (error, result) => {
      if (!error) {
        this.setState({
          userInfo: result
        });
      }
    });
    if (this.state.userInfo) {
      return (<OrderList userInfo={this.state.userInfo}/>)
    } else {
      return (
        <View style={CSS.unLogin}>
        <Text style={CSS.unLoginText}>请到个人中心登录!</Text>
        </View>
      )
    }
  }
}

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.userInfo = props.userInfo;
    this.state = {
      goodsList: [],
    }
  }
  componentWillMount() {
    this.orderHttp()
  }

  orderHttp= () => {
    return fetch('https://easy-mock.com/mock/5afd2420659068782e1217ef/api/test1/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `user=${this.userInfo}`
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code) {
          this.setState({
            goodsList: responseJson.data.goodsList,
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {

    return (
      <FlatList
      showsVerticalScrollIndicator={ false }
      data={ this.state.goodsList }
      renderItem={ this.renderOrderGoods }
      />
    );
  }

  renderOrderGoods = ({item}) => {
    return (
      <View style={ CSS.orderGoodsWrapper }>
		  <TouchableOpacity onPress={ () => {
        AsyncStorage.setItem('orderPrice', item.price);
        AsyncStorage.setItem('orderId', item.id);
        navigation.navigate('PayResult');
      }}>
			<View style={ CSS.orderHeader }>
			  <Text style={ CSS.store }>订单号:{item.id}</Text>
			  <Text style={ CSS.createDate }>{item.time}</Text>
			</View>
			<OrderGoods goods={item}/>
			<View style={ CSS.orderDetail }>
			  <Text style={ CSS.orderStatus }>{item.state}</Text>
			  <Text style={ CSS.totalWrapper }>
				<Text style={ CSS.totalPrice }>金额 :  <Text style={ CSS.totalColor }> {Math.floor(item.price)}.00 RMB</Text></Text>
			  </Text>
			</View>
		  </TouchableOpacity>
		</View>
    );
  }

}

module.exports = Order;