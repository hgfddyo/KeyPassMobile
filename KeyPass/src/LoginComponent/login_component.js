import * as React from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TouchableHighlightBase,
} from 'react-native';
import {TextInput, Surface, HelperText} from 'react-native-paper';
import DBUtils from '../DBUtils/DBUtils';
import styles from './styles';
import {userContext} from '../userContext/userContext';
import EncryptedStorage from 'react-native-encrypted-storage';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.db = new DBUtils();
    this.state = {
      changed: false,
      username: '',
      password: '',
      isSecure: true,
      isLoginValid: true,
      isPasswordValid: true,
    };
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
            error={!this.state.isLoginValid}
            value={this.state.username}
            onChangeText={username => this.setState({username: username})}
            onBlur={() => {
              if (this.state.username) {
                this.setState({isLoginValid: true});
              } else {
                this.setState({isLoginValid: false});
              }
            }}
          />
          <HelperText type="error" visible={!this.state.isLoginValid} style={styles.helperText}>
            Login is required
          </HelperText>
          <TouchableOpacity
            style={styles.buttonNext}
            onPress={() => {
              this.setState({changed: true});
            }}>
            <Text style={styles.nextText}> Next </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonReg}
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
          <Text style={styles.textH1}>Log in</Text>
          <Text style={styles.textH6}>Enter your password</Text>
          <TextInput
            style={styles.textInput}
            label="Password"
            secureTextEntry={this.state.isSecure}
            right={
              <TextInput.Icon
                name={this.state.isSecure ? 'eye' : 'eye-off'}
                onPress={() => {
                  this.setState({isSecure: !this.state.isSecure});
                }}
              />
            }
            error={!this.state.isPasswordValid}
            onBlur={() => {
              if (this.state.password) {
                this.setState({isPasswordValid: true});
              } else {
                this.setState({isPasswordValid: false});
              }
            }}
            value={this.state.password}
            onChangeText={password => this.setState({password: password})}
          />
          <HelperText type="error" visible={!this.state.isPasswordValid} style={styles.helperText}>
            Password is required
          </HelperText>
          <TouchableOpacity
            style={styles.buttonNext}
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
            style={styles.buttonReg}
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
