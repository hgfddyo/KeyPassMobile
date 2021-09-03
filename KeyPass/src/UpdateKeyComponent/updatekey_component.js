import * as React from 'react';
import {Button, View, Text, Alert, TouchableOpacity} from 'react-native';
import DBUtils from '../DBUtils/DBUtils';
import {TextInput, Surface, FAB} from 'react-native-paper';
import styles from './styles';
import {userContext} from '../userContext/userContext';

class UpdateKeyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.db = new DBUtils();
    this.state = {
      context: '',
      login: '',
      password: '',
      oldContext: '',
      oldLogin: '',
      oldPassword: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      this.setState({
        context: this.props.route.params.context,
        login: this.props.route.params.login,
        password: this.props.route.params.password,
        oldContext: this.props.route.params.context,
        oldLogin: this.props.route.params.login,
        oldPassword: this.props.route.params.password,
      });
    });
  }

  componentWillUnmount() {
    this.props.navigation.addListener('focus', async () => {
      this.setState({
        context: this.props.route.params.context,
        login: this.props.route.params.login,
        password: this.props.route.params.password,
        oldContext: this.props.route.params.context,
        oldLogin: this.props.route.params.login,
        oldPassword: this.props.route.params.password,
      });
    });
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
              let updateKeyResult = await this.db.updateKey(
                this.context.user,
                {
                  context: this.state.oldContext,
                  login: this.state.oldLogin,
                  password: this.state.oldPassword,
                },
                {
                  context: this.state.context,
                  login: this.state.login,
                  password: this.state.password,
                },
              );
              if (updateKeyResult) {
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
          <Text> update </Text>
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
UpdateKeyComponent.contextType = userContext;

export default UpdateKeyComponent;
