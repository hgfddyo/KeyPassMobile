import React, {useState, useEffect} from 'react';
import {
  Button,
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Surface, FAB} from 'react-native-paper';
import Autocomplete from 'react-native-autocomplete-input';
import styles from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RectButton} from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';
import {UserContext} from '../UserContext';
import Account from '../Account';
import User from '../User';

class KeysComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      contextsAuto: [],
      contexts: [],
      context: '',
      login: '',
      logins: [],
      loginsAuto: [],
      password: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', async () => {
      let keys = await this.context.accountService.getAccounts(
        this.context.userService.getCurrentUser(),
      );
      this.setState({
        contexts: keys
          .map(key => key.getContext())
          .filter((item, index, arr) => {
            return arr.indexOf(item) === index;
          }),
        keys: keys,
      });
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', async () => {
      let keys = await this.context.accountService.getAccounts(
        this.context.userService.getCurrentUser(),
      );
      this.setState({
        contexts: keys
          .map(key => key.getContext())
          .filter((item, index, arr) => {
            return arr.indexOf(item) === index;
          }),
        keys: keys,
      });
    });
  }

  findContext(query) {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      let filtered = this.state.contexts.filter(
        context => context.search(regex) >= 0,
      );
      if (filtered.length === 1 && filtered[0] === query) {
        this.completeContext(query);
      } else {
        this.setState({
          contextsAuto: filtered,
        });
      }
    } else {
      this.setState({
        contextsAuto: [],
      });
    }
  }

  findLogin(query) {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      let filtered = this.state.logins.filter(
        login => login.search(regex) >= 0,
      );
      if (filtered.length === 1 && filtered[0] === query) {
        this.completeLogin(query);
      } else {
        this.setState({
          loginsAuto: filtered,
        });
      }
    } else {
      this.setState({
        loginsAuto: [],
      });
    }
  }

  completeContext(context) {
    let filtered = this.state.keys
      .filter(key => key.getContext() === context)
      .map(key => key.getLogin());
    this.setState({
      context: context,
      contextsAuto: [],
      logins: filtered,
      login: filtered.length === 1 ? filtered[0] : '',
      password:
        filtered.length === 1
          ? this.state.keys
              .filter(key => key.getLogin() === filtered[0])[0]
              .getPassword()
          : '',
    });
  }

  completeLogin(login) {
    this.setState({
      login: login,
      loginsAuto: [],
      password: this.state.keys
        .filter(key => key.getLogin() === login)[0]
        .getPassword(),
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textH1}>Search</Text>
        <View style={styles.autocompleteContainerContext}>
          <View style={styles.rowDirection}>
            <Autocomplete
              inputContainerStyle={styles.textInputContLog}
              keyboardShouldPersistTaps="always"
              autoCorrect={false}
              data={this.state.contextsAuto}
              value={this.state.context}
              onChangeText={context => {
                this.setState({context: context});
                this.findContext(context);
              }}
              placeholder="Сontext/URL"
              flatListProps={{
                keyExtractor: item => item,
                renderItem: item => (
                  <TouchableOpacity
                    onPress={() => {
                      this.completeContext(item.item);
                    }}>
                    <Text style={styles.itemText}>{item.item}</Text>
                  </TouchableOpacity>
                ),
              }}
            />
          </View>
        </View>
        <View style={styles.autocompleteContainerLogin}>
          <View style={styles.rowDirection}>
            <Autocomplete
              inputContainerStyle={styles.textInputContLog}
              keyboardShouldPersistTaps="always"
              autoCorrect={false}
              data={this.state.loginsAuto}
              value={this.state.login}
              onChangeText={login => {
                this.setState({login: login});
                this.findLogin(login);
              }}
              placeholder="Login"
              flatListProps={{
                keyExtractor: item => item,
                renderItem: item => (
                  <TouchableOpacity
                    onPress={() => {
                      this.completeLogin(item.item);
                    }}>
                    <Text style={styles.itemText}>{item.item}</Text>
                  </TouchableOpacity>
                ),
              }}
            />
            <RectButton
              onPress={() => {
                Clipboard.setString(this.state.login);
              }}>
              <MaterialCommunityIcons name="content-copy" size={27} />
            </RectButton>
          </View>
        </View>
        <View style={styles.rowDirection}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            value={this.state.password}
            onChangeText={password => this.setState({password: password})}
            secureTextEntry
          />
          <RectButton
            onPress={() => {
              Clipboard.setString(this.state.password);
            }}>
            <MaterialCommunityIcons name="content-copy" size={27} />
          </RectButton>
        </View>
        <TouchableOpacity
          style={styles.btnShow}
          onPress={() => {
            this.props.navigation.navigate('Accounts');
          }}>
          <Text style={styles.btnShowText}> Show all </Text>
        </TouchableOpacity>
        <FAB
          style={styles.fab}
          big
          color="#00C4B4"
          icon="plus"
          onPress={() => this.props.navigation.navigate('Adding')}
        />
      </View>
    );
  }
}
KeysComponent.contextType = UserContext;

export default KeysComponent;
