import * as React from 'react';
import {Button, View, Text, Alert, TouchableOpacity} from 'react-native';
import {TextInput, Surface, FAB, HelperText} from 'react-native-paper';
import styles from './styles';
import {UserContext} from '../UserContext';
import Account from '../Account';
import Profile from '../Profile';
import User from '../User';

class UpdateProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isNameValid: true,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      this.setState({
        name: this.props.route.params.profile.getName(),
      });
    });
  }

  componentWillUnmount() {
    this.props.navigation.addListener('focus', async () => {
      this.setState({
        name: this.props.route.params.profile.getName(),
      });
    });
  }

  render() {
    return (
      <View style={styles.views}>
        <Text style={styles.textH1}>Update profile</Text>
        <TextInput
          style={styles.textInputName}
          placeholder="Name"
          mode="outlined"
          outlineColor="#ccc"
          onBlur={() => {
            if (this.state.name.trim()) {
              this.setState({isNameValid: true});
            } else {
              this.setState({isNameValid: false});
            }
          }}
          error={!this.state.isNameValid}
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
          style={styles.btnUpdate}
          onPress={async () => {
            if (this.state.name) {
              let updateProfileResult =
                await this.context.profileService.updateProfile(
                  new Profile(
                    this.props.route.params.profile.getId(),
                    this.state.name,
                  ),
                  this.context.userService.getCurrentUser(),
                );
              if (updateProfileResult) {
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
UpdateProfileComponent.contextType = UserContext;

export default UpdateProfileComponent;
