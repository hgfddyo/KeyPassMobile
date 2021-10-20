import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  fab: {
    //кнопка назад
    width: "30%",
    marginTop: 20,
    right: "35%",
    left: "35%",
    bottom: 0,
    borderRadius: 40,
    elevation: 20,
    backgroundColor: '#ffffff',
  },
  btnSave: {
    //кнопка update
    marginRight: 40,
    marginLeft: 40,
    marginTop: "4%",
    marginBottom: "4%",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    elevation: 20,
    backgroundColor: '#00C4B4',
  },
  btnSaveText: {
    //текст на кнопке update
    color: '#121212',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
export default styles;
