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
import {Snackbar, FAB, Divider} from 'react-native-paper';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserContext} from '../UserContext';
import Account from '../Account';
import User from '../User';

class KeysTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      visible: false,
      selectedPassword: '',
      filteredKeys: [],
      querry: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      this.toggleHeaderBar(false);
      let keys = await this.context.accountService.getAccounts(
        this.context.userService.getCurrentUser(),
      );
      this.setState({keys: keys, filteredKeys: keys});
    });
    this.props.navigation.addListener('blur', async () => {
      this.setState({
        keys: [],
        visible: false,
        selectedPassword: '',
        filteredKeys: [],
        querry: '',
      });
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', async () => {
      this.toggleHeaderBar(false);
      let keys = await this.context.accountService.getAccounts(
        this.context.userService.getCurrentUser(),
      );
      this.setState({keys: keys, filteredKeys: keys});
    });
    this.props.navigation.removeListener('blur', async () => {
      this.setState({
        keys: [],
        visible: false,
        selectedPassword: '',
        filteredKeys: [],
        querry: '',
      });
    });
  }

  toggleHeaderBar(isShown) {
    if (isShown) {
      this.props.navigation.setOptions({
        headerTitleAlign: 'center',
        headerRight: () => (
          <RectButton
            style={styles.headerRightButton}
            onPress={() => {
              this.setState({querry: '', filteredKeys: this.state.keys});
              this.toggleHeaderBar(false);
            }}>
            <MaterialCommunityIcons name="close" size={28} />
          </RectButton>
        ),
        headerTitle: () => (
          <TextInput
            style={styles.headerSearchInput}
            placeholder="Type context or login"
            onChangeText={querry => {
              this.setState({querry: querry});
              this.findKeys(querry);
            }}></TextInput>
        ),
      });
    } else {
      this.props.navigation.setOptions({
        headerTitleAlign: 'left',
        headerRight: () => (
          <RectButton
            style={styles.headerRightButton}
            onPress={() => {
              this.toggleHeaderBar(true);
            }}>
            <MaterialCommunityIcons name="magnify" size={28} />
          </RectButton>
        ),
        headerTitle: this.props.route.name,
      });
    }
  }

  findKeys(querry) {
    if (querry) {
      let filtered = this.state.keys.filter(
        key =>
          key.getContext().includes(querry) || key.getLogin().includes(querry),
      );
      this.setState({filteredKeys: filtered});
    } else {
      this.setState({filteredKeys: this.state.keys});
    }
  }

  render() {
    return (
      <View style={styles.views}>
        <FlatList
          data={this.state.filteredKeys}
          keyExtractor={item => item.getContext().concat(item.getLogin())}
          renderItem={({item}) => (
            <Swipeable
              friction={2}
              overshootLeft={false}
              overshootRight={false}
              renderLeftActions={() => (
                <View>
                  <RectButton
                    style={styles.leftSwipeEye}
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
                                selectedPassword: item.getPassword(),
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
                    <MaterialCommunityIcons name="eye" size={26} />
                  </RectButton>
                </View>
              )}
              renderRightActions={() => (
                <View style={styles.row}>
                  <RectButton
                    style={styles.rightSwipePencil}
                    onPress={() => {
                      this.props.navigation.navigate('Updating', {
                        account: new Account(
                          item.getContext(),
                          item.getLogin(),
                          item.getPassword(),
                        ),
                      });
                    }}>
                    <MaterialCommunityIcons name="pencil" size={26} />
                  </RectButton>
                  <RectButton
                    style={styles.rightSwipeDelete}
                    onPress={async () => {
                      let deleteResult =
                        await this.context.accountService.deleteAccount(
                          new Account(
                            item.getContext(),
                            item.getLogin(),
                            item.getPassword(),
                          ),
                        );
                      let refreshedKeys =
                        await this.context.accountService.getAccounts(
                          this.context.userService.getCurrentUser(),
                        );
                      this.setState({
                        keys: refreshedKeys,
                        filteredKeys: refreshedKeys,
                      });
                    }}>
                    <MaterialCommunityIcons name="delete" size={26} />
                  </RectButton>
                </View>
              )}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(null, false)}>
                <View style={styles.itemWrapper}>
                  <Text style={styles.itemLogin}>{item.getLogin()}</Text>
                  <Text style={styles.itemContext}>{item.getContext()}</Text>
                  <Divider style={styles.divider} />
                </View>
              </TouchableNativeFeedback>
            </Swipeable>
          )}
        />
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({visible: false})}
          style={styles.snackbar}
          wrapperStyle={styles.snackView}
          action={{
            label: <MaterialCommunityIcons name="content-copy" size={25} />,
            onPress: () => {
              Clipboard.setString(this.state.selectedPassword);
            },
          }}
          duration={5000}>
          {
            <Text style={styles.snackText}>
              {this.state.selectedPassword.length - 12 > 3
                ? this.state.selectedPassword
                    .substring(0, 12)
                    .concat('...')
                    .concat(
                      this.state.selectedPassword.substring(
                        this.state.selectedPassword.length - 3,
                      ),
                    )
                : this.state.selectedPassword}
            </Text>
          }
        </Snackbar>
        <FAB
          style={styles.fabBack}
          small
          icon="chevron-left"
          label="back"
          color={'#000000'}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
        <FAB
          style={styles.fabPlus}
          big
          color="#000000"
          icon="plus"
          onPress={() => this.props.navigation.navigate('Adding')}
        />
      </View>
    );
  }
}
KeysTableComponent.contextType = UserContext;

export default KeysTableComponent;
