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
import Profile from '../Profile';
import User from '../User';

class ProfilesTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.windowWidth = Dimensions.get('window').width;
    this.isDeleted = true;
    this.state = {
      profiles: [],
      visibleUndo: false,
      filteredProfiles: [],
      querry: '',
      visibleMenu: false,
      deletedProfiles: [],
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      this.toggleHeaderBar(false);
      let profiles = await this.context.profileService.getProfiles(
        this.context.userService.getCurrentUser(),
      );
      this.setState({profiles: profiles, filteredProfiles: profiles});
    });
    this.props.navigation.addListener('blur', async () => {
      if (this.state.deletedProfiles.length > 0) {
        let firstElem = this.state.deletedProfiles.shift();
        let deleteResult = await this.context.profileService.deleteProfile(
          new Profile(firstElem.getId(), firstElem.getName()),
        );
      }
      this.setState({
        profiles: [],
        visibleUndo: false,
        filteredProfiles: [],
        querry: '',
        visibleMenu: false,
        deletedProfiles: [],
      });
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', async () => {
      this.toggleHeaderBar(false);
      let profiles = await this.context.profileService.getProfiles(
        this.context.userService.getCurrentUser(),
      );
      this.setState({profiles: profiles, filteredProfiles: profiles});
    });
    this.props.navigation.removeListener('blur', async () => {
      if (this.state.deletedProfiles.length > 0) {
        let firstElem = this.state.deletedProfiles.shift();
        let deleteResult = await this.context.profileService.deleteProfile(
          new Profile(firstElem.getId(), firstElem.getName()),
        );
      }
      this.setState({
        profiles: [],
        visibleUndo: false,
        filteredProfiles: [],
        querry: '',
        visibleMenu: false,
        deletedProfiles: [],
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
                this.setState({
                  querry: '',
                  filteredProfiles: this.state.profiles,
                });
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
              this.findProfiles(querry);
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

  findProfiles(querry) {
    if (querry) {
      let filtered = this.state.profiles.filter(profile =>
        profile.getName().includes(querry),
      );
      this.setState({filteredProfiles: filtered});
    } else {
      this.setState({filteredProfiles: this.state.profiles});
    }
  }

  render() {
    return (
      <View style={styles.views}>
        <FlatList
          data={this.state.filteredProfiles}
          keyExtractor={item => item.getId()}
          renderItem={({item}) => (
            <Swipeable
              friction={2}
              overshootLeft={false}
              overshootRight={false}
              renderRightActions={() => (
                <View style={styles.row}>
                  <RectButton
                    style={styles.rightSwipePencil}
                    onPress={() => {
                      // this.props.navigation.navigate('Updating', {
                      //   account: new Account(
                      //     item.getContext(),
                      //     item.getLogin(),
                      //     item.getPassword(),
                      //   ),
                      // });
                    }}>
                    <MaterialCommunityIcons name="pencil" size={26} />
                  </RectButton>
                  <RectButton
                    style={styles.rightSwipeDelete}
                    onPress={async () => {
                      let deletedProfile;
                      let profileIndex = this.state.profiles.findIndex(
                        profile => profile.getId() === item.getId(),
                      );
                      if (profileIndex >= 0) {
                        deletedProfile = this.state.profiles.splice(
                          profileIndex,
                          1,
                        )[0];
                      }
                      let filteredProfileIndex =
                        this.state.filteredProfiles.findIndex(
                          profile => profile.getId() === item.getId(),
                        );
                      if (filteredProfileIndex >= 0) {
                        this.state.filteredProfiles.splice(
                          filteredProfileIndex,
                          1,
                        );
                      }
                      if (this.state.deletedProfiles.length > 0) {
                        let firstElem = this.state.deletedProfiles.shift();
                        let deleteResult =
                          await this.context.profileService.deleteProfile(
                            new Profile(firstElem.getId(), firstElem.getName()),
                          );
                      }
                      this.state.deletedProfiles.push(deletedProfile);
                      this.setState({
                        filteredProfiles: this.state.filteredProfiles,
                        profiles: this.state.profiles,
                        visibleUndo: true,
                        deletedProfiles: this.state.deletedProfiles,
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
                      <Text style={styles.itemLogin}>{item.getName()}</Text>
                    </View>
                  </View>
                  <Divider style={styles.divider} />
                </View>
              </TouchableNativeFeedback>
            </Swipeable>
          )}
        />
        <Snackbar
          visible={this.state.visibleUndo}
          onDismiss={async () => {
            if (this.isDeleted) {
              let deleteResult =
                await this.context.profileService.deleteProfile(
                  new Profile(
                    this.state.deletedProfiles[0].getId(),
                    this.state.deletedProfiles[0].getName(),
                  ),
                );
              let refreshedProfiles =
                await this.context.profileService.getProfiles(
                  this.context.userService.getCurrentUser(),
                );
              this.setState({
                profiles: refreshedProfiles,
                filteredProfiles: refreshedProfiles,
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
              let refreshedProfiles =
                await this.context.profileService.getProfiles(
                  this.context.userService.getCurrentUser(),
                );
              this.setState({
                profiles: refreshedProfiles,
                filteredProfiles: refreshedProfiles,
                deletedProfiles: [],
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
ProfilesTableComponent.contextType = UserContext;

export default ProfilesTableComponent;
