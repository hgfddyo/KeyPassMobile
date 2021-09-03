import React, {useState, useEffect} from 'react';
import {Button, View, Text, Alert, TouchableOpacity} from 'react-native';
import {TextInput, Surface, FAB} from 'react-native-paper';
import Autocomplete from 'react-native-autocomplete-input';
import DBUtils from '../DBUtils/DBUtils';
import styles from './style';
import {userContext} from '../userContext/userContext';

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
        <View style={styles.autocompleteContainerContext}>
          <Autocomplete
            keyboardShouldPersistTaps="always"
            autoCorrect={false}
            data={this.state.contextsAuto}
            value={this.state.context}
            onChangeText={context => {
              this.setState({context: context});
              this.findContext(context);
            }}
            placeholder="Enter context"
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
        <View style={styles.autocompleteContainerLogin}>
          <Autocomplete
            keyboardShouldPersistTaps="always"
            autoCorrect={false}
            data={this.state.loginsAuto}
            value={this.state.login}
            onChangeText={login => {
              this.setState({login: login});
              this.findLogin(login);
            }}
            placeholder="Enter login"
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
        </View>
        <TextInput
          placeholder="Password"
          value={this.state.password}
          onChangeText={password => this.setState({password: password})}
          secureTextEntry
        />
        <FAB
          style={styles.fab}
          big
          icon="plus"
          onPress={() => console.log('Pressed')}
        />
        <TouchableOpacity
          //style={styles.button2}
          onPress={() => {}}>
          <Text> Show all </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
KeysComponent.contextType = userContext;

export default KeysComponent;
