var {StyleSheet} = require('react-native');

module.exports = StyleSheet.create({
  pageIndicator: {
    position: 'absolute',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
  },
  defaultIndicatorStyle: {
    color: '#000000',
    fontSize: 50,
  },
  defaultInactiveIndicatorStyle: {
    fontSize: 50,
    color: '#999999',
  }
});