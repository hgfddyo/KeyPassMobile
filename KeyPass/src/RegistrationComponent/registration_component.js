import * as React from 'react';
import {Button, View, Text, TextInput, Alert} from 'react-native';
import DBUtils from '../DBUtils/DBUtils';
import styles from './styles';
import {userContext} from '../userContext/userContext';
import EncryptedStorage from 'react-native-encrypted-storage';

class RegistrationComponent extends React.Component {
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
        <View>
          <Text>Привет, Мир</Text>
          <Text>Привет, Мир</Text>
          <TextInput
            value={this.state.username}
            onChangeText={username => this.setState({username: username})}
          />
          <Button
            onPress={() => {
              this.setState({changed: true});
            }}
            title={'Next'}
          />
          <Button
            title={'Login'}
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}
          />
        </View>
      );
    } else {
      return (
        <View>
          <Text>1</Text>
          <Text>2</Text>
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({password: password})}
            secureTextEntry
          />
          <Button
            title={'Entry'}
            onPress={async () => {
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
            }}
          />
          <Button
            onPress={() => {
              this.setState({changed: false});
            }}
            title={'Back'}
          />
        </View>
      );
    }
  }
}
RegistrationComponent.contextType = userContext;

export default RegistrationComponent;
