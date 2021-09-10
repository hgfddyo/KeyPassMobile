import * as React from 'react';
import {
  FlatList,
  View,
  Text,
  TextInput,
  Alert,
  TouchableNativeFeedback,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {Snackbar} from 'react-native-paper';
import DBUtils from '../DBUtils/DBUtils';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import styles from './styles';
import {userContext} from '../userContext/userContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class KeysTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.db = new DBUtils();
    this.state = {keys: [], visible: false, selectedPassword: ''};
  }

  componentDidMount() {
    this.toggleHeaderBar(false);
    this.props.navigation.addListener('focus', async () => {
      let keys = await this.db.getKeys(this.context.user);
      this.setState({keys: keys});
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', async () => {
      let keys = await this.db.getKeys(this.context.user);
      this.setState({keys: keys});
    });
  }

  toggleHeaderBar(isShown) {
    if (isShown) {
      this.props.navigation.setOptions({
        headerRight: () => (
          <RectButton
            onPress={() => {
              this.toggleHeaderBar(false);
            }}>
            <MaterialCommunityIcons name="close" size={30} />
          </RectButton>
        ),
        title: <TextInput></TextInput>,
      });
    } else {
      this.props.navigation.setOptions({
        headerRight: () => (
          <RectButton
            onPress={() => {
              this.toggleHeaderBar(true);
            }}>
            <MaterialCommunityIcons name="magnify" size={30} />
          </RectButton>
        ),
        title: this.props.route.name,
      });
    }
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.keys}
          keyExtractor={item => item.context.concat(item.login)}
          renderItem={({item}) => (
            <Swipeable
              friction={2}
              overshootLeft={false}
              overshootRight={false}
              renderLeftActions={() => (
                <RectButton
                  onPress={() => {
                    Alert.alert(
                      '',
                      'Do you want to see the password?',
                      [
                        {
                          text: 'Yes',
                          onPress: () => {
                            this.setState({
                              visible: true,
                              selectedPassword: item.password,
                            });
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
                  <MaterialCommunityIcons name="eye" />
                </RectButton>
              )}
              renderRightActions={() => (
                <View>
                  <RectButton
                    onPress={() => {
                      this.props.navigation.navigate('Updating', {
                        context: item.context,
                        login: item.login,
                        password: item.password,
                      });
                    }}>
                    <MaterialCommunityIcons name="pencil" />
                  </RectButton>
                  <RectButton
                    onPress={async () => {
                      let deleteResult = await this.db.deleteKey(
                        item.context,
                        item.login,
                      );
                      let refreshedKeys = await this.db.getKeys(
                        this.context.user,
                      );
                      this.setState({keys: refreshedKeys});
                    }}>
                    <MaterialCommunityIcons name="delete" />
                  </RectButton>
                </View>
              )}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(null, false)}>
                <View>
                  <Text>{item.login}</Text>
                  <Text>{item.context}</Text>
                </View>
              </TouchableNativeFeedback>
            </Swipeable>
          )}
        />
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({visible: false})}
          action={{
            label: <MaterialCommunityIcons name="content-copy" />,
            onPress: () => {
              Clipboard.setString(this.state.selectedPassword);
            },
          }}
          duration={5000}>
          {this.state.selectedPassword}
        </Snackbar>
      </View>
    );
  }
}
KeysTableComponent.contextType = userContext;

export default KeysTableComponent;
