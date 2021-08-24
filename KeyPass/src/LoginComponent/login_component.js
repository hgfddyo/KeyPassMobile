import * as React from 'react';
import {Button, View, Text, TextInput, Alert} from 'react-native';
import DBUtils from '../DBUtils/DBUtils';
import styles from './style';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.db = new DBUtils();
    this.state = {changed: false, username: '', password: ''};
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
            title={'Registration'}
            onPress={() => {
              this.props.navigation.navigate('Registration');
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
                      onPress: () =>
                        this.props.navigation.navigate('HomeScreen'),
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
export default LoginComponent;
