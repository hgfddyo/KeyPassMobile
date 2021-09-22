import * as React from 'react';
import {Button, View, Text, Alert, TouchableOpacity} from 'react-native';
import {TextInput, Surface, FAB, HelperText} from 'react-native-paper';
import DBUtils from '../DBUtils/DBUtils';
import {userContext} from '../userContext/userContext';
import styles from './styles';

class AddKeyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.db = new DBUtils();
    this.state = {
      context: '',
      login: '',
      password: '',
      isContextValid: true,
      isLoginValid: true,
      isPasswordValid: true,
    };
  }

  render() {
    return (
      <View style={styles.views}>
        <Text style={styles.textH1}>Add key</Text>
        <TextInput
          style={styles.textInputContext}
          placeholder="Context"
          mode="outlined"
          onBlur={() => {
            if (this.state.context) {
              this.setState({isContextValid: true});
            } else {
              this.setState({isContextValid: false});
            }
          }}
          error={!this.state.isContextValid}
          outlineColor="#ccc"
          value={this.state.context}
          onChangeText={context => this.setState({context: context})}
        />
        <HelperText type="error" visible={!this.state.isContextValid}>
          Context is required
        </HelperText>
        <TextInput
          style={styles.textInputLogin}
          placeholder="Login"
          mode="outlined"
          error={!this.state.isLoginValid}
          onBlur={() => {
            if (this.state.login) {
              this.setState({isLoginValid: true});
            } else {
              this.setState({isLoginValid: false});
            }
          }}
          outlineColor="#ccc"
          value={this.state.login}
          onChangeText={login => this.setState({login: login})}
        />
        <HelperText type="error" visible={!this.state.isLoginValid}>
          Login is required
        </HelperText>
        <TextInput
          style={styles.textInputPassword}
          placeholder="Password"
          mode="outlined"
          outlineColor="#ccc"
          value={this.state.password}
          error={!this.state.isPasswordValid}
          onBlur={() => {
            if (this.state.password) {
              this.setState({isPasswordValid: true});
            } else {
              this.setState({isPasswordValid: false});
            }
          }}
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
        <HelperText type="error" visible={!this.state.isPasswordValid}>
          Password is required
        </HelperText>
        <TouchableOpacity
          style={styles.btnSave}
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
          <Text style={styles.btnSaveText}> save </Text>
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
AddKeyComponent.contextType = userContext;

export default AddKeyComponent;
