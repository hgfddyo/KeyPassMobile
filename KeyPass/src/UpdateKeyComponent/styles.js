import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  views: {
    //контейнер
    backgroundColor: '#ffffff',
    height: '100%',
  },
  textH1: {
    //заголовок
    fontWeight: 'normal',
    fontSize: 30,
    marginTop: "15%",
    marginBottom: "12%",
    textAlign: 'center',
  },
  textInputContext: {
    //поле ввода контекста
    marginRight: 40,
    marginLeft: 40,
    backgroundColor: '#ffffff',
    fontSize: 17,
  },
  textInputLogin: {
    //поле ввода логина
    marginRight: 40,
    marginLeft: 40,
    borderColor: '#ccc',
    backgroundColor: '#ffffff',
    fontSize: 17,
  },
  textInputPassword: {
    //поле ввода пароля
    marginRight: 40,
    marginLeft: 40,
    backgroundColor: '#ffffff',
    fontSize: 17,
  },
  btnUpdate: {
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
  btnUpdateText: {
    //текст на кнопке update
    color: '#121212',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 15,
  },
  fab: {
    //кнопка назад
    width:"30%",
    marginTop: 20,
    right:"35%",
    left: "35%",
    bottom: 0,
    borderRadius: 40,
    elevation: 20,
    backgroundColor: '#ffffff',
  },
  helperText: {
    marginLeft:40,
  },
});
export default styles;
