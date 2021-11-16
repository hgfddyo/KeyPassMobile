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
    marginTop: "30%",
    marginBottom: "9%",
    textAlign: 'center',
  },
  btnSave: {
    //кнопка  save
    marginRight: 40,
    marginLeft: 40,
    marginTop: "5%",
    marginBottom: "7%",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    elevation: 20,
    backgroundColor: '#00C4B4',
  },
  btnSaveText: {
    //текст на кнопке save
    color: '#121212',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 15,
  },
  textInputName: {
    //поле ввода контекста
    marginRight: 40,
    marginLeft: 40,
    backgroundColor: '#ffffff',
    fontSize: 17,
  },
  fab: {
    //кнопка back
    width:"33%",
    marginTop: 20,
    right:"33%",
    left: "34%",
    borderRadius: 40,
    elevation: 20,
    backgroundColor: '#ffffff',
  },
  helperText: {
    marginLeft:40,
  },
});

export default styles;
