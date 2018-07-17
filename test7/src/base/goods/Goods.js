import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, AsyncStorage } from 'react-native';

const Variable = require('../../common/css/variable');
const deviceWidth = Dimensions.get('window').width;

const normalCss = StyleSheet.create({
  container: {
    position: 'relative',
    width: deviceWidth / 3,
    paddingBottom: 10,
    backgroundColor: '#fff'
  },
  imgWrapper: {
    alignItems: 'center'
  },
  img: {
    width: deviceWidth / 4,
    height: deviceWidth / 4,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 5,
    marginBottom: 5,
  },
  goodsInfo: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  brandName: {
    flex: 1,
    flexDirection: 'row',
    width: 100
  },
  brand: {
    fontWeight: 'bold',
    fontSize: 10
  },
  name: {
    fontSize: 10,
  },
  unit: {
    fontSize: 10,
    color: Variable.colorUnit
  },
  price: {
    fontSize: 12,
    color: Variable.colorPrice
  },
  plus: {
    position: 'absolute',
    right: 5,
    bottom: 10,
    width: 20,
    height: 20
  }
});

const recommendCss = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 2.5,
    marginRight: 2.5,
    marginBottom: 2.5,
    marginLeft: 2.5,
    width: deviceWidth / 2 - 7.5,
    
    paddingBottom: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  imgWrapper: {
    alignItems: 'center'
  },
  img: {
    width: "100%",
    height: deviceWidth / 3 ,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 5,
    marginBottom: 5,
  },
  goodsInfo: {
    paddingLeft: 10,
    paddingRight: 10
  },
  brandName: {
    flex: 1,
    flexDirection: 'row',
    width: 110
  },
  brand: {
    fontWeight: 'bold',
    fontSize: 13
  },
  name: {
    fontSize: 12
  },
  unit: {
    fontSize: 10,
    color: Variable.colorUnit
  },
  price: {
    fontSize: 12,
    color: Variable.colorPrice
  },
  plus: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    width: 25,
    height: 25
  }
});

const categoryGridCss = StyleSheet.create({
  container: {
    position: 'relative',
    width: 140,
    paddingBottom: 10,
    backgroundColor: '#fff',
    marginLeft: 2.5,
    marginRight: 2.5,
    marginBottom: 5
  },
  imgWrapper: {
    alignItems: 'center'
  },
  img: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 5,
    marginBottom: 5,
  },
  goodsInfo: {
    paddingLeft: 10,
    paddingRight: 10
  },
  brandName: {
    flex: 1,
    flexDirection: 'row',
    width: 100
  },
  brand: {
    fontWeight: 'bold',
    fontSize: 13
  },
  name: {
    fontSize: 12,
  },
  unit: {
    fontSize: 10,
    color: Variable.colorUnit
  },
  id: {
    fontSize: 12,
    color: Variable.colorPrice
  },
  plus: {
    position: 'absolute',
    right: 5,
    bottom: 10,
    width: 20,
    height: 20
  }
});

const categoryListCss = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 2.5,
    backgroundColor: '#fff',
    marginLeft: 2.5,
    marginRight: 2.5,
    marginBottom: 5
  },
  imgWrapper: {
    alignItems: 'center'
  },
  img: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: '#eee',
    marginTop: 5,
    marginBottom: 5,
  },
  goodsInfo: {
    flex: 3,
    paddingLeft: 10,
    paddingRight: 10
  },
  brandName: {
    flex: 1,
    flexDirection: 'row',
    textAlignVertical: 'center',
    width: 180
  },
  brand: {
    fontWeight: 'bold',
    fontSize: 13
  },
  name: {
    fontSize: 12,
  },
  unit: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: 10,
    color: Variable.colorUnit
  },
  price: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: 12,
    color: Variable.colorPrice
  },
  plus: {
    position: 'absolute',
    right: 5,
    bottom: 10,
    width: 20,
    height: 20
  }
});

let currentStyle;

class Goods extends React.Component {

  _currentStyle;
  goodsInfo;

  constructor(props) {
    super(props);
    this._currentStyle = props.goodsStyle || 'normal';
    this.goodsInfo = props.goods;
    switch (this._currentStyle) {
      case 'normal':
        currentStyle = normalCss;
        break;
      case 'recommend':
        currentStyle = recommendCss;
        break;
      case 'categoryGrid':
        currentStyle = categoryGridCss;
        break;
      case 'categoryList':
        currentStyle = categoryListCss;
        break;
    }
  }

  componentWillUpdate() {
    switch (this._currentStyle) {
      case 'normal':
        currentStyle = normalCss;
        break;
      case 'recommend':
        currentStyle = recommendCss;
        break;
      case 'categoryGrid':
        currentStyle = categoryGridCss;
        break;
      case 'categoryList':
        currentStyle = categoryListCss;
        break;
    }
  }

  render() {
    return (
      <View style={currentStyle.container}>
        <TouchableOpacity onPress={() => {
          AsyncStorage.setItem('infoUnit', this.goodsInfo.unit);
          AsyncStorage.setItem('infoName', this.goodsInfo.name);
          AsyncStorage.setItem('infoUrl', this.goodsInfo.url);
          this.props.navigation.navigate('GoodsDetail');
        }}
          style={currentStyle.imgWrapper}>
          <Image style={currentStyle.img} source={{
            uri: this.goodsInfo.url,
            cache: 'force-cache'
          }} resizeMode={'stretch'} />
        </TouchableOpacity>
        <View style={currentStyle.goodsInfo}>
          <Text style={currentStyle.brandName} numberOfLines={1}>
            <Text style={currentStyle.brand}>
              名称 :
			  </Text>
            <Text style={currentStyle.name}>
              {this.goodsInfo.name}
            </Text>
          </Text>
          <Text style={currentStyle.unit}>
            {this.goodsInfo.unit}
          </Text>
        </View>
      </View>
    );
  }

}

module.exports = Goods;