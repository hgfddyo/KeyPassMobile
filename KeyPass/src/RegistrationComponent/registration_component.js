import * as React from 'react';
import {Button, View, Text, Alert, TouchableOpacity} from 'react-native';
import styles from './styles';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TextInput, HelperText} from 'react-native-paper';
import {UserContext} from '../UserContext';
import Account from '../Account';
import User from '../User';

class RegistrationComponent extends React.Component {
  constructor(props) {
    super(props);
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
          <Text style={styles.textH1}>Registration</Text>
          <Text style={styles.textH6}>Enter your login</Text>
          <TextInput
            style={styles.textInput}
            label="Login"
            error={!this.state.isLoginValid}
            onBlur={() => {
              if (this.state.username.trim('')) {
                this.setState({isLoginValid: true});
              } else {
                this.setState({isLoginValid: false});
              }
            }}
            value={this.state.username}
            onChangeText={username => this.setState({username: username})}
          />
          <HelperText
            type="error"
            visible={!this.state.isLoginValid}
            style={styles.helperText}>
            Login is required
          </HelperText>
          <TouchableOpacity
            style={styles.buttonNext}
            onPress={() => {
              if (this.state.username.trim('')) {
                this.setState({changed: true});
              } else {
                this.setState({isLoginValid: false});
              }
            }}>
            <Text style={styles.nextText}> Next </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonReg}
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <Text style={styles.regText}> Log in </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.views}>
          <Text style={styles.textH1}>Registration</Text>
          <Text style={styles.textH6}>Enter your password</Text>
          <TextInput
            style={styles.textInput}
            label="Password"
            secureTextEntry={this.state.isSecure}
            value={this.state.password}
            error={!this.state.isPasswordValid}
            onBlur={() => {
              if (this.state.password.trim('')) {
                this.setState({isPasswordValid: true});
              } else {
                this.setState({isPasswordValid: false});
              }
            }}
            onChangeText={password => this.setState({password: password})}
            right={
              <TextInput.Icon
                name={this.state.isSecure ? 'eye' : 'eye-off'}
                onPress={() => {
                  this.setState({isSecure: !this.state.isSecure});
                }}
              />
            }
          />
          <HelperText
            type="error"
            visible={!this.state.isPasswordValid}
            style={styles.helperText}>
            Password is required
          </HelperText>
          <TouchableOpacity
            style={styles.buttonNext}
            onPress={async () => {
              if (this.state.password.trim('')) {
                let registationResult =
                  await this.context.userService.registerUser(
                    new User(this.state.username, this.state.password),
                  );
                if (registationResult) {
                  Alert.alert(
                    'Success',
                    'You register successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () => {
                          this.context.userService.setCurrentUser(
                            new User(this.state.username, this.state.password),
                          );
                          this.context.userService.saveUser(
                            new User(this.state.username, this.state.password),
                          );
                          this.context.setIsLogin(true);
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  Alert.alert(
                    'Error',
                    'This user already exists',
                    [
                      {
                        text: 'Ok',
                      },
                    ],
                    {cancelable: false},
                  );
                }
              } else {
                this.setState({isPasswordValid: false});
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
RegistrationComponent.contextType = UserContext;

export default RegistrationComponent;
