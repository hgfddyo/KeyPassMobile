import * as React from 'react';
import {Button, View, Text, Alert, TouchableOpacity} from 'react-native';
import {TextInput, Surface, FAB, HelperText} from 'react-native-paper';
import styles from './styles';
import {UserContext} from '../UserContext';
import Account from '../Account';
import User from '../User';

class UpdateKeyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: '',
      login: '',
      password: '',
      oldContext: '',
      oldLogin: '',
      oldPassword: '',
      isContextValid: true,
      isLoginValid: true,
      isPasswordValid: true,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      this.setState({
        context: this.props.route.params.account.getContext(),
        login: this.props.route.params.account.getLogin(),
        password: this.props.route.params.account.getPassword(),
        oldContext: this.props.route.params.account.getContext(),
        oldLogin: this.props.route.params.account.getLogin(),
        oldPassword: this.props.route.params.account.getPassword(),
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
          onBlur={() => {
            if (this.state.context.trim()) {
              this.setState({isContextValid: true});
            } else {
              this.setState({isContextValid: false});
            }
          }}
          error={!this.state.isContextValid}
          value={this.state.context}
          onChangeText={context => this.setState({context: context})}
        />
        <HelperText
          type="error"
          visible={!this.state.isContextValid}
          style={styles.helperText}>
          Context is required
        </HelperText>
        <TextInput
          style={styles.textInputLogin}
          placeholder="Login"
          mode="outlined"
          outlineColor="#ccc"
          error={!this.state.isLoginValid}
          onBlur={() => {
            if (this.state.login.trim()) {
              this.setState({isLoginValid: true});
            } else {
              this.setState({isLoginValid: false});
            }
          }}
          value={this.state.login}
          onChangeText={login => this.setState({login: login})}
        />
        <HelperText
          type="error"
          visible={!this.state.isLoginValid}
          style={styles.helperText}>
          Login is required
        </HelperText>
        <TextInput
          style={styles.textInputPassword}
          placeholder="Password"
          mode="outlined"
          outlineColor="#ccc"
          error={!this.state.isPasswordValid}
          onBlur={() => {
            if (this.state.password.trim()) {
              this.setState({isPasswordValid: true});
            } else {
              this.setState({isPasswordValid: false});
            }
          }}
          value={this.state.password}
          onChangeText={password => this.setState({password: password})}
          right={
            <TextInput.Icon
              name="autorenew"
              onPress={() => {
                this.setState({
                  password: this.context.accountService.generatePassword(),
                });
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
          style={styles.btnUpdate}
          onPress={async () => {
            if (this.state.login && this.state.password && this.state.context) {
              let updateKeyResult =
                await this.context.accountService.updateAccount(
                  this.context.userService.getCurrentUser(),
                  new Account(
                    this.state.oldContext,
                    this.state.oldLogin,
                    this.state.oldPassword,
                  ),
                  new Account(
                    this.state.context,
                    this.state.login,
                    this.state.password,
                  ),
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
              if (!this.state.context.trim()) {
                this.setState({isContextValid: false});
              }
              if (!this.state.login.trim()) {
                this.setState({isLoginValid: false});
              }
              if (!this.state.password.trim()) {
                this.setState({isPasswordValid: false});
              }
            }
          }}>
          <Text style={styles.btnUpdateText}> update </Text>
        </TouchableOpacity>
        <FAB
          style={styles.fab}
          small
          icon="chevron-left"
          label="cancel"
          color={'#00C4B4'}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }
}
UpdateKeyComponent.contextType = UserContext;

export default UpdateKeyComponent;
