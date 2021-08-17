import * as React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import styles from './style'

class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {flag: true}
  }

  render(){
    if(this.state.flag) {
      return (
        <View>
          <Text>Привет, Мир</Text>
          <Text>Привет, Мир</Text>
          <TextInput>asd</TextInput>
          <TextInput>asd</TextInput>
          <Button onPress={this.state.flag = false}>Next</Button>
          <Button>Registration</Button>
        </View>
      );
    }
    else return(
      <View>
        <Text>Привет, Мир</Text>
        <Text>Привет, Мир</Text><TextInput>asd</TextInput>
        <TextInput>asd</TextInput>
        <Button>Entry</Button>
        <Button onPress={this.state.flag = true}>Back</Button>
      </View>
    );
  }
}
export default LoginComponent;
