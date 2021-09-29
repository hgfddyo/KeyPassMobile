import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
  textH1: {
    //заголовок
    fontWeight: 'normal',
    fontSize: 30,
    marginTop: "15%",
    marginBottom: "10%",
    textAlign: 'center',
  },
  itemText: {
    fontSize: 18,
    margin: 10,

  },
  autocompleteContainerContext: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    width: "80%",
    top: 0,
    zIndex: 3,
    marginLeft: "10%",
    marginTop: "10%",
    borderColor: '#DADADA',
  },
  autocompleteContainerLogin: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
    marginLeft: "10%",
    width: "75%",
    marginTop: '32%',
    borderColor: '#DADADA',
  },
  textInput: {
    //поле ввода пароля
    marginLeft: "10%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DADADA',
    paddingLeft: 10,
    width: "71%",
    right: 0,
  },
  fab: {
    //кнопка "плюс"
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    elevation: 20,
  },
  btnShow: {
    //кнопка show all
    marginRight: 40,
    marginLeft: 40,
    marginBottom: "5%",
    marginTop: 40,
    borderRadius: 4,
    zIndex: 1,
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#00C4B4',
  },
  btnShowText: {
    //текст на кнопке
    color: '#121212',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textInputContLog: {
    //настройки инпута для контекста и логина
    borderRadius: 4,
    borderColor: '#DADADA',
    padding: 5,
  },
  rowDirection: {
    //для помещения элементов в одну строку
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '45%',
  },
});
export default styles;
