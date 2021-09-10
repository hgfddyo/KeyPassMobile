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
      <View style={styles.views}>
        <Text style={styles.textH1}>Update key</Text>
        <TextInput
          style={styles.textInputContext}
          placeholder="Context"
          mode="outlined"
          outlineColor="#ccc"
          value={this.state.context}
          onChangeText={context => this.setState({context: context})}
        />
        <TextInput
          style={styles.textInputLogin}
          placeholder="Login"
          mode="outlined"
          outlineColor="#ccc"
          value={this.state.login}
          onChangeText={login => this.setState({login: login})}
        />
        <TextInput
          style={styles.textInputPassword}
          placeholder="Password"
          mode="outlined"
          outlineColor="#ccc"
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
          style={styles.btnUpdate}
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
          <Text style={styles.btnUpdateText}> update </Text>
        </TouchableOpacity>
        <FAB
          style={styles.fab}
          small
          icon="chevron-left"
          label="back"
          color={'#00C4B4'}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }
}
UpdateKeyComponent.contextType = userContext;

export default UpdateKeyComponent;
