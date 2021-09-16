import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerSearchInput: {
    width: 150,
    height: 40,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
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
    height: 60,
    width: 60,
    elevation: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSwipePencil: {
    //кнопка редактировать
    backgroundColor: '#70EFDE',
    height: 60,
    width: 60,
    elevation: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSwipeDelete: {
    //кнопка удалить
    backgroundColor: '#00C4B4',
    height: 60,
    width: 60,
    elevation: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabBack: {
    //кнопка back
    position: 'absolute',
    marginLeft: 50,
    width: 110,
    height: 50,
    bottom: 50,
    borderRadius: 40,
    elevation: 20,
    backgroundColor: '#018786',
  },
  fabPlus: {
    //кнопка "плюс"
    position: 'absolute',
    marginRight: 50,
    right: 0,
    bottom: 50,
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
  },
  divider: {
    height: 1,
  },
});
export default styles;
