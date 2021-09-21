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
    marginBottom: 75,
    textAlign: 'center',
  },
  textH6: {
    //заголовок
    fontWeight: 'normal',
    fontSize: 16,
    marginLeft: 40,
  },
  textInput: {
    //поле ввода логина
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    borderRadius: 4,
    marginBottom: 50,
  },
  nextText: {
    //текст на кнопке next
    color: '#121212',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 16,
  },
  regText: {
    //текст на кнопке reg
    color: '#00C4B4',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonNext: {
    //кнопка next
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
  buttonReg: {
    //кнопка reg
    backgroundColor: '#ffffff',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    elevation: 20,
  },
  surface: {
    //padding: 8,
    height: 30,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
export default styles;
