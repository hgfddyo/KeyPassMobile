import * as React from 'react';
import {Button, View, Text, TextInput, Alert} from 'react-native';
import DBUtils from '../DBUtils/DBUtils';
import styles from './style';

class AddKeyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.db = new DBUtils();
    this.state = {};
  }

  render() {}
}
export default AddKeyComponent;
