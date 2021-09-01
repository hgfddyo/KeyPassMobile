import * as React from 'react';
import {Button, View, Text, Alert, TouchableOpacity} from 'react-native';
import {TextInput, Surface, FAB} from 'react-native-paper';
import DBUtils from '../DBUtils/DBUtils';
import {userContext} from '../userContext/userContext';
import styles from './styles';

class AddKeyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.db = new DBUtils();
    this.state = {context: '', login: '', password: ''};
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Context"
          value={this.state.context}
          onChangeText={context => this.setState({context: context})}
        />
        <TextInput
          placeholder="Login"
          value={this.state.login}
          onChangeText={login => this.setState({login: login})}
        />
        <TextInput
          placeholder="Password"
          value={this.state.password}
          onChangeText={password => this.setState({password: password})}
          right={
            <TextInput.Icon
              name="autorenew"
              onPress={() => {
                this.setState({password: this.db.generatePassword()});
              }}
            />
          }
        />
        <TouchableOpacity
          onPress={async () => {
            if (this.state.login && this.state.password && this.state.context) {
              let addKeyResult = await this.db.addKey(
                this.context.user,
                this.state.context,
                this.state.login,
                this.state.password,
              );
              if (addKeyResult) {
                this.props.navigation.goBack();
              } else {
                Alert.alert(
                  'Error',
                  'Key with such context and login already exists',
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
          <Text> save </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}>
          <Text>{'< back'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
AddKeyComponent.contextType = userContext;

export default AddKeyComponent;
