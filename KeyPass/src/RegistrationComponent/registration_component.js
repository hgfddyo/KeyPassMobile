import * as React from 'react';
import {Button, View, Text, Alert, TouchableOpacity} from 'react-native';
import DBUtils from '../DBUtils/DBUtils';
import styles from './styles';
import {userContext} from '../userContext/userContext';
import EncryptedStorage from 'react-native-encrypted-storage';
import {TextInput} from 'react-native-paper';

class RegistrationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.db = new DBUtils();
    this.state = {changed: false, username: '', password: '', isSecure: true};
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
              this.props.navigation.navigate('Login');
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
          <TouchableOpacity
            style={styles.button1}
            onPress={async () => {
              if (this.state.username && this.state.password) {
                let registationResult = await this.db.registration(
                  this.state.username,
                  this.state.password,
                );
                if (registationResult) {
                  Alert.alert(
                    'Success',
                    'You register Successfully',
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
                Alert.alert(
                  'Error',
                  'Enter correct data',
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
RegistrationComponent.contextType = userContext;

export default RegistrationComponent;
