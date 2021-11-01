import * as React from 'react';
import {
  FlatList,
  View,
  Text,
  TextInput,
  Alert,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {Snackbar, FAB, Divider, Menu} from 'react-native-paper';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {UserContext} from '../UserContext';
import Account from '../Account';
import User from '../User';

class KeysTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.windowWidth = Dimensions.get('window').width;
    this.isDeleted = true;
    this.state = {
      keys: [],
      visiblePassword: false,
      selectedPassword: '',
      visibleUndo: false,
      filteredKeys: [],
      querry: '',
      visibleMenu: false,
      deletedAccounts: [],
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
      if (this.state.deletedAccounts.length > 0) {
        let firstElem = this.state.deletedAccounts.shift();
        let deleteResult = await this.context.accountService.deleteAccount(
          new Account(
            firstElem.getContext(),
            firstElem.getLogin(),
            firstElem.getPassword(),
          ),
        );
      }
      this.setState({
        keys: [],
        visiblePassword: false,
        selectedPassword: '',
        visibleUndo: false,
        filteredKeys: [],
        querry: '',
        visibleMenu: false,
        deletedAccounts: [],
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
      if (this.state.deletedAccounts.length > 0) {
        let firstElem = this.state.deletedAccounts.shift();
        let deleteResult = await this.context.accountService.deleteAccount(
          new Account(
            firstElem.getContext(),
            firstElem.getLogin(),
            firstElem.getPassword(),
          ),
        );
      }
      this.setState({
        keys: [],
        visiblePassword: false,
        selectedPassword: '',
        visibleUndo: false,
        filteredKeys: [],
        querry: '',
        visibleMenu: false,
        deletedAccounts: [],
      });
    });
  }

  toggleHeaderBar(isShown) {
    if (isShown) {
      this.props.navigation.setOptions({
        headerTitleAlign: 'center',
        headerRight: () => (
          <View style={styles.row}>
            <RectButton
              style={styles.headerRightButton}
              onPress={() => {
                this.setState({querry: '', filteredKeys: this.state.keys});
                this.toggleHeaderBar(false);
              }}>
              <MaterialCommunityIcons name="close" size={28} />
            </RectButton>
            <RectButton
              onPress={() => {
                this.setState({visibleMenu: true});
              }}>
              <MaterialCommunityIcons name="dots-vertical" size={28} />
            </RectButton>
          </View>
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
          <View style={styles.row}>
            <RectButton
              style={styles.headerRightButton}
              onPress={() => {
                this.toggleHeaderBar(true);
              }}>
              <MaterialCommunityIcons name="magnify" size={28} />
            </RectButton>
            <RectButton
              onPress={() => {
                this.setState({visibleMenu: true});
              }}>
              <MaterialCommunityIcons name="dots-vertical" size={28} />
            </RectButton>
          </View>
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
                                visiblePassword: true,
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
                      let deletedAccount;
                      let keyIndex = this.state.keys.findIndex(
                        account =>
                          account.getLogin() === item.getLogin() &&
                          account.getContext() === item.getContext(),
                      );
                      if (keyIndex >= 0) {
                        deletedAccount = this.state.keys.splice(keyIndex, 1)[0];
                      }
                      let filteredKeyIndex = this.state.filteredKeys.findIndex(
                        account =>
                          account.getLogin() === item.getLogin() &&
                          account.getContext() === item.getContext(),
                      );
                      if (filteredKeyIndex >= 0) {
                        this.state.filteredKeys.splice(filteredKeyIndex, 1);
                      }
                      if (this.state.deletedAccounts.length > 0) {
                        let firstElem = this.state.deletedAccounts.shift();
                        let deleteResult =
                          await this.context.accountService.deleteAccount(
                            new Account(
                              firstElem.getContext(),
                              firstElem.getLogin(),
                              firstElem.getPassword(),
                            ),
                          );
                      }
                      this.state.deletedAccounts.push(deletedAccount);
                      this.setState({
                        filteredKeys: this.state.filteredKeys,
                        keys: this.state.keys,
                        visibleUndo: true,
                        deletedAccounts: this.state.deletedAccounts,
                      });
                    }}>
                    <MaterialCommunityIcons name="delete" size={26} />
                  </RectButton>
                </View>
              )}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(null, false)}>
                <View style={styles.itemWrapper}>
                  <View style={styles.row}>
                    <View>
                      <Text style={styles.itemLogin}>{item.getLogin()}</Text>
                      <Text style={styles.itemContext}>
                        {item.getContext()}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        flex: 1,
                      }}>
                      <RectButton
                        style={styles.headerRightButton}
                        onPress={() => {
                          Clipboard.setString(item.getLogin());
                        }}>
                        <MaterialCommunityIcons name="content-copy" size={24} />
                      </RectButton>
                    </View>
                  </View>
                  <Divider style={styles.divider} />
                </View>
              </TouchableNativeFeedback>
            </Swipeable>
          )}
        />
        <Snackbar
          visible={this.state.visiblePassword}
          onDismiss={() => this.setState({visiblePassword: false})}
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
        <Snackbar
          visible={this.state.visibleUndo}
          onDismiss={async () => {
            if (this.isDeleted) {
              let deleteResult =
                await this.context.accountService.deleteAccount(
                  new Account(
                    this.state.deletedAccounts[0].getContext(),
                    this.state.deletedAccounts[0].getLogin(),
                    this.state.deletedAccounts[0].getPassword(),
                  ),
                );
              let refreshedKeys = await this.context.accountService.getAccounts(
                this.context.userService.getCurrentUser(),
              );
              this.setState({
                keys: refreshedKeys,
                filteredKeys: refreshedKeys,
                visibleUndo: false,
              });
            } else {
              this.setState({
                visibleUndo: false,
              });
              this.isDeleted = true;
            }
          }}
          style={styles.snackbar}
          wrapperStyle={styles.snackViewUndo}
          action={{
            label: <MaterialCommunityIcons name="undo" size={25} />,
            onPress: async () => {
              this.isDeleted = false;
              let refreshedKeys = await this.context.accountService.getAccounts(
                this.context.userService.getCurrentUser(),
              );
              this.setState({
                keys: refreshedKeys,
                filteredKeys: refreshedKeys,
                deletedAccounts: [],
              });
            },
          }}
          duration={5000}>
          <Text style={styles.snackText}>Undo</Text>
        </Snackbar>
        <FAB
          style={styles.fabPlus}
          big
          color="#000000"
          icon="plus"
          onPress={() => this.props.navigation.navigate('Adding')}
        />
        <Menu
          visible={this.state.visibleMenu}
          onDismiss={() => {
            this.setState({visibleMenu: false});
          }}
          anchor={{x: this.windowWidth, y: 0}}
          style={styles.menu}>
          <Menu.Item
            icon="cog"
            onPress={() => {
              this.setState({visibleMenu: false});
              this.props.navigation.navigate('Settings');
            }}
            title="Settings"
          />
          <Menu.Item
            icon="logout"
            onPress={async () => {
              this.setState({visibleMenu: false});
              this.context.userService.setCurrentUser('');
              await this.context.userService.removeUser();
              this.context.setIsLogin(false);
            }}
            title="Logout"
          />
        </Menu>
      </View>
    );
  }
}
KeysTableComponent.contextType = UserContext;

export default KeysTableComponent;
