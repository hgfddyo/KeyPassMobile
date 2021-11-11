import * as React from 'react';
import {Button, View, Text, Alert, TouchableOpacity} from 'react-native';
import {TextInput, Surface, FAB, HelperText} from 'react-native-paper';
import styles from './styles';
import {UserContext} from '../UserContext';
import Account from '../Account';
import Profile from '../Profile';
import User from '../User';

class AddProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isNameValid: true,
    };
  }

  render() {
    return (
      <View style={styles.views}>
        <Text style={styles.textH1}>Add Profile</Text>
        <TextInput
          style={styles.textInputContext}
          placeholder="Name"
          mode="outlined"
          onBlur={() => {
            if (this.state.name.trim()) {
              this.setState({isNameValid: true});
            } else {
              this.setState({isNameValid: false});
            }
          }}
          error={!this.state.isNameValid}
          outlineColor="#ccc"
          value={this.state.name}
          onChangeText={name => this.setState({name: name})}
        />
        <HelperText
          type="error"
          visible={!this.state.isNameValid}
          style={styles.helperText}>
          Name is required
        </HelperText>
        <TouchableOpacity
          style={styles.btnSave}
          onPress={async () => {
            if (this.state.name) {
              let addProfileResult =
                await this.context.profileService.createProfile(
                  this.context.userService.getCurrentUser(),
                  new Profile('', this.state.name),
                );
              if (addProfileResult) {
                this.props.navigation.goBack();
              } else {
                Alert.alert(
                  'Error',
                  'Profile with such name already exists',
                  [
                    {
                      text: 'Ok',
                    },
                  ],
                  {cancelable: false},
                );
              }
            } else {
              if (!this.state.name.trim()) {
                this.setState({isNameValid: false});
              }
            }
          }}>
          <Text style={styles.btnSaveText}> save </Text>
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
AddProfileComponent.contextType = UserContext;

export default AddProfileComponent;
