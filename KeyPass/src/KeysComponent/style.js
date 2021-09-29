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
    width: "75%",
    top: 0,
    zIndex: 3,
    marginRight: 40,
    marginLeft: 40,
    marginTop: "5%",
    borderColor: '#DADADA',
  },
  autocompleteContainerLogin: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
    marginRight: 40,
    marginLeft: 40,
    marginTop: '25%',
    borderColor: '#DADADA',
  },
  textInput: {
    //поле ввода пароля
    marginRight: 10,
    marginLeft: 40,
    marginTop: 0,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DADADA',
    padding: 10,
    width: "72%",
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
    //color:'#00C4B4',
  },
  btnShow: {
    //кнопка show all
    marginRight: 40,
    marginLeft: 40,
    marginBottom: 15,
    marginTop: 40,
    borderRadius: 4,
    zIndex: 1,
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#00C4B4',
  },
  btnShowText: {
    //текст на кнопке reg
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
    marginRight: 10,
  },
  rowDirection: {
    //для помещения элементов в одну строку
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '45%',
  },
});
export default styles;
