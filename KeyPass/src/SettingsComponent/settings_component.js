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
      isPasswordsMatch: true,
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
          onBlur={() => {
            if (this.state.newPassword.trim()) {
              this.setState({isNewPasswordValid: true});
            } else {
              this.setState({isNewPasswordValid: false});
            }
          }}
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
          onBlur={() => {
            this.state.confirmedPassword.trim()
              ? this.setState({isConfirmedPasswordValid: true})
              : this.setState({isConfirmedPasswordValid: false});
            this.state.newPassword === this.state.confirmedPassword
              ? this.setState({isPasswordsMatch: true})
              : this.setState({isPasswordsMatch: false});
          }}
          error={
            !this.state.isConfirmedPasswordValid || !this.state.isPasswordsMatch
          }
          outlineColor="#ccc"
          value={this.state.confirmedPassword}
          onChangeText={confirmedPassword =>
            this.setState({confirmedPassword: confirmedPassword})
          }
        />
        <HelperText
          type="error"
          visible={
            !this.state.isConfirmedPasswordValid || !this.state.isPasswordsMatch
          }>
          {this.state.isConfirmedPasswordValid
            ? 'Password must match'
            : 'Confirm password'}
        </HelperText>
        <TouchableOpacity
          style={styles.btnSave}
          onPress={async () => {
            if (
              this.state.newPassword &&
              this.state.confirmedPassword &&
              this.state.confirmedPassword === this.state.newPassword
            ) {
              await this.context.userService.updatePassword(
                new User(
                  this.context.userService.getCurrentUser().getUsername(),
                  this.state.newPassword,
                ),
              );
              Alert.alert(
                'Success',
                'Your password has been updated',
                [
                  {
                    text: 'Ok',
                    onPress: () => {},
                  },
                ],
                {cancelable: false},
              );
            } else {
              if (!this.state.newPassword.trim()) {
                this.setState({isNewPasswordValid: false});
              }
              if (!this.state.confirmedPassword.trim()) {
                this.setState({isConfirmedPasswordValid: false});
              }
              if (
                this.state.confirmedPassword.trim() !=
                this.state.newPassword.trim()
              ) {
                this.setState({isPasswordsMatch: false});
              }
            }
          }}>
          <Text style={styles.btnUpdateText}> save </Text>
        </TouchableOpacity>
        <Text>delete your account</Text>
        <TouchableOpacity
          onPress={async () => {
            Alert.alert(
              'Warning',
              'If you continue, then all data about this account will be deleted. Continue?',
              [
                {
                  text: 'Yes',
                  onPress: async () => {
                    let result = await this.context.userService.deleteUser(
                      this.context.userService.getCurrentUser(),
                    );
                    this.context.userService.setCurrentUser('');
                    await this.context.userService.removeUser();
                    this.context.setIsLogin(false);
                  },
                },
                {
                  text: 'No',
                  onPress: () => {},
                },
              ],
              {cancelable: false},
            );
          }}>
          <Text> unregister </Text>
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
SettingsComponent.contextType = UserContext;

export default SettingsComponent;
