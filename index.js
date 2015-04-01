'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  ScrollView,
} = React;

var Carousel = React.createClass({

  getDefaultProps() {
    return {
      width: 375,
      indicatorColor: '#000000',
      inactiveIndicatorColor: '#999999'
    };
  },

  getInitialState() {
    return {
      activePage: 0
    };
  },

  render() {

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={this.onAnimationEnd}
        >
          {this.props.children}
        </ScrollView>
        {this.renderPageIndicator()}
      </View>
    );
  },

  renderPageIndicator() {
    var indicators = [],
        style, position;

    position = {
      width: this.props.children.length * 15,
    };
    position.left = (this.props.width - position.width) / 2;

    for (var i=0; i< this.props.children.length; i++) {
      style = i === this.state.activePage ? { color: this.props.indicatorColor } : { color: this.props.inactiveIndicatorColor };
      indicators.push(<Text style={style}>&bull;</Text>);
    }

    return (
      <View style={[styles.pageIndicator, position]}>
        {indicators}
      </View>
    );
  },

  onAnimationEnd(e) {
    var activePage = e.nativeEvent.contentOffset.x / this.props.width;
    this.setState({
      activePage: activePage
    });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  page: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  pageIndicator: {
    position: 'absolute',
    flexDirection: 'row',
    flex: 1,
    bottom: 20,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});

module.exports = Carousel;
