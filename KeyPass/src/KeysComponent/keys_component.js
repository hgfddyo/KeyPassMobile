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
import DBUtils from '../DBUtils/DBUtils';
import styles from './style';
import {userContext} from '../userContext/userContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RectButton} from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';

class KeysComponent extends React.Component {
  constructor(props) {
    super(props);
    this.db = new DBUtils();
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
      let keys = await this.db.getKeys(this.context.user);
      this.setState({
        contexts: keys
          .map(key => key.context)
          .filter((item, index, arr) => {
            return arr.indexOf(item) === index;
          }),
        keys: keys,
      });
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', async () => {
      let keys = await this.db.getKeys(this.context.user);
      this.setState({keys: keys});
    });
  }

  findContext(query) {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      this.setState({
        contextsAuto: this.state.contexts.filter(
          context => context.search(regex) >= 0,
        ),
      });
    } else {
      this.setState({
        contextsAuto: [],
      });
    }
  }

  findLogin(query) {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      this.setState({
        loginsAuto: this.state.logins.filter(login => login.search(regex) >= 0),
      });
    } else {
      this.setState({
        loginsAuto: [],
      });
    }
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
                      let filtered = this.state.keys
                        .filter(key => key.context === item.item)
                        .map(key => key.login);
                      this.setState({
                        context: item.item,
                        contextsAuto: [],
                        logins: filtered,
                        login: filtered.length === 1 ? filtered[0] : '',
                        password:
                          filtered.length === 1
                            ? this.state.keys.filter(
                                key => key.login === filtered[0],
                              )[0].password
                            : '',
                      });
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
                      this.setState({
                        login: item.item,
                        loginsAuto: [],
                        password: this.state.keys.filter(
                          key => key.login === item.item,
                        )[0].password,
                      });
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
KeysComponent.contextType = userContext;

export default KeysComponent;
