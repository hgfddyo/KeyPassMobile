import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import styles from './style'

class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {changed: false};
  }

  render(){
    if(!this.state.changed) {
      return (
        <View>
          <Text>Привет, Мир</Text>
          <Text>Привет, Мир</Text>
          <TextInput>asd</TextInput>
          <Button onPress={() => { this.setState({changed: true}) }} title={"Next"}/>
          <Button title={"Registration"}/>
        </View>
      );
    }
    else {
      return(
        <View>
          <Text>1</Text>
          <Text>2</Text>
          <TextInput>asd123</TextInput>
          <Button title={"Entry"}/>
          <Button onPress={()=>{this.setState({changed: false})}} title={"Back"}/>
        </View>
      );
    }
  }
}
export default LoginComponent;
