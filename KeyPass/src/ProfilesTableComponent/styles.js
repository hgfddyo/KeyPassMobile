import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerSearchInput: {
    width: "84%",
    height: 40,
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginRight: 20,
    paddingLeft:0,
    fontSize: 16,
  },
  headerCloseButton: {
    marginRight: 15,
  },
  headerDots: {
    marginRight: 5,
  },
  RightChevron: {//стрелка
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  views: {
    //контейнер
    backgroundColor: '#ffffff',
    height: '100%',
  },
  itemName: {
    //name
    marginHorizontal: 10,
    marginTop:20,
    marginBottom:20,
    marginLeft: 20,
    fontSize: 18,
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
    backgroundColor: 'rgba(0, 52, 238, 0.22)',
    height: "100%",
    width: 60,
    elevation: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSwipeDelete: {
    //кнопка удалить
    backgroundColor: 'rgba(179, 16, 16, 0.23)',
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
    //всплывающее сообщение с кнопкой
    position: 'absolute',
    top: '40%',
    zIndex: 1,
    elevation: 20,
    alignSelf: 'center',
    flex: 1,
    width: 300,
    height:80,
  },
  snackViewUndo: {
    //всплывающее сообщение с кнопкой
    position: 'absolute',
    top: '70%',
    zIndex: 1,
    elevation: 20,
    alignSelf: 'center',
    flex: 1,
    width: 160,
    height:90,
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
