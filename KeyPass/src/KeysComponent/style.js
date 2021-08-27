import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 50,
  },
  itemText: {
    fontSize: 20,
    margin: 10,
  },
  autocompleteContainerContext: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    padding: 5,
  },
  autocompleteContainerLogin: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 40,
    zIndex: 1,
    padding: 5,
  },
});
export default styles;
