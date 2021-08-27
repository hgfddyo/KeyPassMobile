import React, {useState, useEffect} from 'react';
import {Button, View, Text, TextInput, Alert} from 'react-native';
import DBUtils from '../DBUtils/DBUtils';
import styles from './style';
import {userContext} from '../userContext/userContext';

class KeysComponent extends React.Component {
  constructor(props) {
    super(props);
    this.db = new DBUtils();
    this.state = {keys: []};
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', async () => {
      console.log(this.context.user);
      let keys = await this.db.getKeys(this.context.user);
      this.setState({keys: keys});
      console.log('asd asd');
    });
  }
  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return <Text>asd</Text>;
  }
}
KeysComponent.contextType = userContext;

export default KeysComponent;
