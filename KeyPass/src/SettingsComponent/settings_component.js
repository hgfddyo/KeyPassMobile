import * as React from 'react';
import {Button, View, Text, Alert, TouchableOpacity} from 'react-native';
import {TextInput, Surface, FAB, HelperText} from 'react-native-paper';
import styles from './styles';
import {UserContext} from '../UserContext';
import Account from '../Account';
import User from '../User';

class SettingsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewPasswordValid: true,
      newPassword: '',
      isConfirmedPasswordValid: true,
      confirmedPassword: '',
    };
  }

  render() {
    return (
      <View>
        <Text>change password</Text>
        <TextInput
          placeholder="New password"
          mode="outlined"
          error={!this.state.isNewPasswordValid}
          outlineColor="#ccc"
          value={this.state.newPassword}
          onChangeText={newPassword =>
            this.setState({newPassword: newPassword})
          }
        />
        <HelperText type="error" visible={!this.state.isNewPasswordValid}>
          Password is required
        </HelperText>
        <TextInput
          placeholder="Confirm password"
          mode="outlined"
          error={!this.state.isConfirmedPasswordValid}
          outlineColor="#ccc"
          value={this.state.confirmedPassword}
          onChangeText={confirmedPassword =>
            this.setState({confirmedPassword: confirmedPassword})
          }
        />
        <HelperText type="error" visible={!this.state.isConfirmedPasswordValid}>
          Confirm password
        </HelperText>
        <TouchableOpacity onPress={async () => {}}>
          <Text> save </Text>
        </TouchableOpacity>
        <Text>delete your account</Text>
        <TouchableOpacity onPress={async () => {}}>
          <Text> unregister </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
SettingsComponent.contextType = UserContext;

export default SettingsComponent;
