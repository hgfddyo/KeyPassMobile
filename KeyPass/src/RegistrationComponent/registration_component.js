import * as React from 'react';
import {Button, View, Text, Alert, TouchableOpacity} from 'react-native';
import DBUtils from '../DBUtils/DBUtils';
import styles from './styles';
import {userContext} from '../userContext/userContext';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TextInput, HelperText} from 'react-native-paper';

class RegistrationComponent extends React.Component {
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
                let registationResult = await this.db.registration(
                  this.state.username,
                  this.state.password,
                );
                if (registationResult) {
                  Alert.alert(
                    'Success',
                    'You register successfully',
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
RegistrationComponent.contextType = userContext;

export default RegistrationComponent;
