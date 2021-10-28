import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  views: {
    //контейнер
    backgroundColor: '#ffffff',
    height: '100%',
  },
  textH1: {
    color: '#948F8F',
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop:"8%",
  },
  divider: {
    backgroundColor: '#948F8F',
    height: 1,
    marginBottom:"5%",
  },
  textInputPassword: {
    //поле ввода пароля
    marginRight: 40,
    marginLeft: 40,
    backgroundColor: '#ffffff',
    fontSize: 17,
  },
  fab: {
    //кнопка назад
    width: "33%",
    marginTop: 20,
    right: "33%",
    left: "34%",
    bottom: 0,
    borderRadius: 40,
    elevation: 20,
    backgroundColor: '#ffffff',
  },
  btnSave: {
    //кнопка Save
    marginRight: 40,
    marginLeft: 40,
    marginTop: "2%",
    marginBottom: "6%",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    elevation: 20,
    backgroundColor: '#00C4B4',
  },
  btnSaveText: {
    //текст на кнопке Save
    color: '#121212',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 15,
  },
  btnUnregister: {
    //кнопка Unregister
    marginRight: 40,
    marginLeft: 40,
    marginTop: "4%",
    marginBottom: "4%",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    elevation: 20,
    backgroundColor: '#B21010',
  },
  btnUnregisterText: {
    //текст на кнопке Unregister
    color: '#ffffff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 15,
  },
  helperText: {
    marginLeft:40,
  },
});
export default styles;
