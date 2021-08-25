import * as React from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {TextInput, Surface} from 'react-native-paper';
import DBUtils from '../DBUtils/DBUtils';
import styles from './styles';
import {userContext} from '../userContext/userContext';
import EncryptedStorage from 'react-native-encrypted-storage';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.db = new DBUtils();
    this.state = {changed: false, username: '', password: ''};
  }

  componentDidMount() {
    EncryptedStorage.getItem('active_user').then(user => {
      if (user) {
        this.context.setUser(user);
        this.context.setIsLogin(true);
      }
    });
  }

  render() {
    if (!this.state.changed) {
      return (
        <View style={styles.views}>
          <Text style={styles.textH1}>Log in</Text>
          <Text style={styles.textH6}>Enter your login</Text>
          <TextInput
            style={styles.textInput}
            label="Login"
            value={this.state.username}
            onChangeText={username => this.setState({username: username})}
          />

          <TouchableOpacity
            style={styles.button1}
            onPress={() => {
              this.setState({changed: true});
            }}>
            <Text style={styles.nextText}> Next </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              this.props.navigation.navigate('Registration');
            }}>
            <Text style={styles.regText}> Registration </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.views}>
          <Text style={styles.textH1}>Login</Text>
          <Text style={styles.textH6}>Enter your password</Text>
          <TextInput
            style={styles.textInput}
            label="Password"
            secureTextEntry
            right={<TextInput.Icon name="eye" />}
            value={this.state.password}
            onChangeText={password => this.setState({password: password})}
          />
          <TouchableOpacity
            style={styles.button1}
            onPress={async () => {
              let loginResult = await this.db.login(
                this.state.username,
                this.state.password,
              );
              if (loginResult) {
                Alert.alert(
                  'Success',
                  'You log in Successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => {
                        this.context.setUser(this.state.username);
                        this.context.setIsLogin(true);
                        EncryptedStorage.setItem(
                          'active_user',
                          this.state.username,
                        );
                      },
                    },
                  ],
                  {cancelable: false},
                );
              } else {
                Alert.alert(
                  'Error',
                  'Bad account credentials',
                  [
                    {
                      text: 'Ok',
                    },
                  ],
                  {cancelable: false},
                );
              }
            }}>
            <Text style={styles.nextText}> Entry </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => {
              this.setState({changed: false});
            }}>
            <Text style={styles.regText}> Back </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
LoginComponent.contextType = userContext;

export default LoginComponent;
