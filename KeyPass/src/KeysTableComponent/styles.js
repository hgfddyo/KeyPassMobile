import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({

  views: {
    //контейнер
    backgroundColor: '#ffffff',
    //height: '100%',
  },

  fabBack: {//кнопка back
    position: 'absolute',
    marginLeft: 50,
    width:110,
    height: 50,
    top:500,
    borderRadius: 40,
    elevation: 20,
    backgroundColor: '#018786',
  },
  fabPlus: {//кнопка "плюс"
    position: 'absolute',
    marginRight: 50,
    right: 0,
    top:500,
    backgroundColor: '#018786',
    elevation: 20,
  },
});
export default styles;
