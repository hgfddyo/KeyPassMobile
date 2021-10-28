import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerSearchInput: {
    width: "84%",
    height: 40,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginRight: 20,
  },
  headerRightButton: {
    marginRight: 20,
  },
  views: {
    //контейнер
    backgroundColor: '#ffffff',
    height: '100%',
  },
  itemLogin: {
    //login
    marginHorizontal: 10,
    marginTop: 5,
    marginLeft: 20,
    fontSize: 18,
  },
  itemContext: {
    //Context
    marginHorizontal: 10,
    marginBottom: 5,
    marginLeft: 20,
    fontSize: 16,
    color: '#595353',
  },
  leftSwipeEye: {
    //кнопка показать
    backgroundColor: '#70EFDE',
    height: "100%",
    width: 60,
    elevation: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSwipePencil: {
    //кнопка редактировать
    backgroundColor: '#70EFDE',
    height: "100%",
    width: 60,
    elevation: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSwipeDelete: {
    //кнопка удалить
    backgroundColor: '#00C4B4',
    height: "100%",
    width: 60,
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabPlus: {
    //кнопка "плюс"
    position: 'absolute',
    right: 40,
    bottom: 40,
    backgroundColor: '#018786',
    elevation: 20,
  },
  row: {
    //строка
    flexDirection: 'row',
  },
  snackbar: {
    backgroundColor: '#F9F9F9',
    color: 'black',
  },
  snackText: {
    color: 'black',
  },
  snackView: {
    position: 'absolute',
    top: '40%',
    zIndex: 1,
    elevation: 20,
    alignSelf: 'center',
    flex: 1,
    width: 300,
  },
  divider: {
    height: 1,
  },
  itemWrapper: {
    backgroundColor: 'white',
    elevation: 10,
  },
  menu:{
    width:"60%",
    fontSize: 26,
  },
});
export default styles;
