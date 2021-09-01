import * as React from 'react';
import {Button, View, Text, TextInput, Alert} from 'react-native';
import DBUtils from '../DBUtils/DBUtils';
import styles from './styles';
import {userContext} from '../userContext/userContext';

class KeysTableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.db = new DBUtils();
    this.state = {};
  }

  render() {}
}
KeysTableComponent.contextType = userContext;

export default KeysTableComponent;
