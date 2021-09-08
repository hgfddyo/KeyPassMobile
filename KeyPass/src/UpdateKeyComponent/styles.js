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
    marginTop: 60,
    marginBottom: 55,
    textAlign: 'center',
  },
  textInputContext: {
    //поле ввода логина
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    backgroundColor:"#ffffff",
    fontSize: 17,
  },
  textInputLogin: {
    //поле ввода логина
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    borderColor: '#ccc',
    backgroundColor:"#ffffff",
    fontSize: 17,
  },
  textInputPassword: {
    //поле ввода логина
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 30,
    backgroundColor:"#ffffff",
    fontSize: 17,
  },
  btnUpdate: {
    //кнопка update
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    elevation: 20,
    backgroundColor: '#00C4B4',
  },
  btnUpdateText: {
    //текст на кнопке reg
    color: '#121212',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 15,
  },
  fab: {
    marginRight: 150,
    marginLeft: 152,
    marginTop:20,
    right: 0,
    left:0,
    bottom: 0,
    borderRadius: 40,
    elevation: 20,
    backgroundColor: '#ffffff',
  },
});
export default styles;
