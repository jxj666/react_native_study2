import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet, DeviceEventEmitter, TouchableOpacity, TouchableWithoutFeedback, TextInput, Button, AsyncStorage } from 'react-native';
import Header from '../header/header';
const deviceWidth = Dimensions.get('window').width;
const CSS = StyleSheet.create({
  avatarWrapper: {
    marginTop: 30,
    zIndex: 100,
    alignItems: 'center'
  },
  avatar: {
    width: 70,
    height: 70,
    borderWidth: 1.5,
    borderColor: '#fff',
    borderRadius: 35
  },
  loginBtn: {
    marginTop: 10,
    width: 60,
    height: 15,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 10,
    borderRadius: 3
  },
  iconContainer: {
    position: 'absolute',
    left: '20%',
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    width: deviceWidth
  },
  iconWrapper: {
    width: 120,
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: '#fff'
  },
  icon: {
    width: 20,
    height: 20
  },
  serviceWrapper: {
    marginTop: 10,
    flexDirection: 'column',
    height: 120
  },
  serviceContainer: {
    flex: 4,
    flexDirection: 'row'
  },
  serviceItem: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: '#ddd',
    borderRightWidth: .5,
    borderBottomColor: '#ddd',
    borderBottomWidth: .5,
    backgroundColor: '#fff'
  },
  servieText: {
    fontSize: 12
  },
  phoneContainer: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  phone: {
    fontSize: 12,
    color: '#13227a'
  },
  userText: {
    fontSize: 20,
    marginTop: 20,
    height: 30,
    lineHeight: 30,
    color: '#13227a',
    marginBottom: 20,
  },
  userInfoText: {
    fontSize: 16,
    height: 25,
    lineHeight: 25,
    color: '#13227a',
  },
  userInfoText2: {
    fontSize: 10,
    height: 20,
    lineHeight: 20,
    color: '#13227a',
  },
  button: {
    width: deviceWidth / 2,
    height: 40,
    flex: 1,
    justifyContent: 'center',
    marginTop: 100,
  },
  buttonView: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: '#13227a',
    overflow: 'hidden',
    padding: 0,
  },
  buttonText: {
    textAlign: 'center',
    lineHeight: 35,
    fontSize: 20,
    color: '#fff',
  },
  buttonInput: {
    width: deviceWidth / 1.5,
    height: 40,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderStyle: 'solid',
    borderRadius: 20,
    paddingRight: 20,
    paddingLeft: 20,
  },
  loginTitle: {
  },
  loginTitleText: {
    fontSize: 20,
    color: '#13227a',
    marginTop: 50,
    marginBottom: 80,
  }
});
class Personal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      user: '',
      password: '',
      loginTime: '',
      imgUrl: 'https://jxj322991.github.io/2018imgs/img/png/01.png',
    }
  }
  componentWillMount() {
    AsyncStorage.getItem('user', (error, result) => {
      if (!error) {
        // alert(result);
        this.setState({
          userInfo: result
        });
      }
    });
    AsyncStorage.getItem('time', (error, result) => {
      if (!error) {
        // alert(result);
        this.setState({
          loginTime: result
        });
      }
    });
    AsyncStorage.getItem('imgUrl', (error, result) => {
      if (!error) {
        // alert(result);
        this.setState({
          imgUrl: result
        });
      }
    });
  }
  render() {
    const placeholderInfo = {
      user: '请输入用户名!',
      password: '请输入密码!',
    }
    // alert(JSON.stringify(this.state.userInfo));
    return (
      <View style={{
        flex: 1
      }}>
        <Header />
        <View>
          {!!this.state.userInfo ?
            <View style={CSS.avatarWrapper}>
              <Image source={{
                uri: this.state.imgUrl
              }} style={CSS.avatar} />
              <Text style={CSS.userText}>{this.state.userInfo}</Text>
              <Text style={CSS.userInfoText}>男</Text>
              <Text style={CSS.userInfoText}>超级会员</Text>
              <Text style={CSS.userInfoText2}>登录时间:{this.state.loginTime}</Text>
              <TouchableOpacity style={CSS.button} onPress={this.onPress}>
                <View style={CSS.buttonView}>
                  <Text style={CSS.buttonText}>
                    退出登录
                    </Text>
                </View>
              </TouchableOpacity>
            </View>
            :
            <View style={CSS.avatarWrapper}>
              <View style={CSS.loginTitle}>
                <Text style={CSS.loginTitleText}>
                  欢迎光临!
                </Text>
              </View>
              <TextInput placeholder={placeholderInfo.user} style={CSS.buttonInput} editable={true} maxLength={20} onChangeText={(user) => this.setState({
                user
              })} />
              <TextInput secureTextEntry={true} placeholder={placeholderInfo.password} style={CSS.buttonInput} editable={true} maxLength={20} onChangeText={(password) => this.setState({
                password
              })} />
              <TouchableOpacity style={CSS.button} onPress={this.onPress}>
                <View style={CSS.buttonView}>
                  <Text style={CSS.buttonText}>
                    登录
                    </Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        </View>
        <View style={CSS.phoneContainer}>
          <Text style={CSS.phone}>
            客服电话 :
            <Text style={CSS.phone}> 188 6666 6666 </Text>
          </Text>
        </View>
      </View>
    );
  }
  onPress = () => {
    if (!this.state.userInfo) {
      if (!this.state.user || !this.state.password) {
        alert('请填写正确信息!');
        return;
      }
      this.loginHttp();
    } else {
      this.setState({
        user: undefined,
        password: undefined
      });
      AsyncStorage.setItem('user', '');
      AsyncStorage.getItem('user', (error, result) => {
        if (!error) {
          this.setState({
            userInfo: result
          });
        }
      });
    }
  }
  loginHttp = () => {
    return fetch('https://easy-mock.com/mock/5afd2420659068782e1217ef/api/test1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `user=${this.state.user}&password=${this.state.password}`
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.code) {
          AsyncStorage.setItem('user', String(responseJson.data.user));
          AsyncStorage.setItem('time', String(responseJson.data.time));
          AsyncStorage.setItem('imgUrl', String(responseJson.data.url));
          AsyncStorage.getItem('imgUrl', (error, result) => {
            if (!error) {
              this.setState({
                imgUrl: result
              });
            }
          });
          AsyncStorage.getItem('user', (error, result) => {
            if (!error) {
              this.setState({
                userInfo: result
              });
            }
          });
          AsyncStorage.getItem('time', (error, result) => {
            if (!error) {
              this.setState({
                loginTime: result
              });
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
module.exports = Personal;