'use strict';

var React = require('react');
var {
  Dimensions,
  StyleSheet,
  Text,
  View,
} = require('react-native');

var TimerMixin = require('react-timer-mixin');
var CarouselPager = require('./CarouselPager');

var Carousel = React.createClass({
  mixins: [TimerMixin],

  getDefaultProps() {
    return {
      hideIndicators: false,
      indicatorColor: '#000000',
      indicatorSize: 50,
      inactiveIndicatorColor: '#999999',
      indicatorAtBottom: true,
      indicatorOffset: 250,
      indicatorText: '•',
      inactiveIndicatorText: '•',
      width: null,
      initialPage: 0,
      indicatorSpace: 25,
      animate: true,
      delay: 1000,
      loop: true,
    };
  },

  getInitialState() {
    return {
      activePage: this.props.initialPage > 0 ? this.props.initialPage : 0,
    };
  },

  getWidth() {
    if (this.props.width !== null) {
      return this.props.width;
    } else {
      return Dimensions.get('window').width;
    }
  },

  componentDidMount() {
    if (this.props.initialPage > 0) {
      this.refs.pager.scrollToPage(this.props.initialPage, false);
    }

    if (this.props.animate && this.props.children){
        this._setUpTimer();
    }
  },

  indicatorPressed(activePage) {
    this.setState({activePage});
    this.refs.pager.scrollToPage(activePage);
  },

  renderPageIndicator() {
    if (this.props.hideIndicators === true) {
      return null;
    }

    var indicators = [],
        indicatorStyle = this.props.indicatorAtBottom ? { bottom: this.props.indicatorOffset } : { top: this.props.indicatorOffset },
        style, position;

    position = {
      width: this.props.children.length * this.props.indicatorSpace,
    };
    position.left = (this.getWidth() - position.width) / 2;

    for (var i = 0, l = this.props.children.length; i < l; i++) {
      if (typeof this.props.children[i] === "undefined") {
        continue;
      }

      style = i === this.state.activePage ? { color: this.props.indicatorColor } : { color: this.props.inactiveIndicatorColor };
      indicators.push(
         <Text
            style={[style, { fontSize: this.props.indicatorSize }]}
            key={i}
            onPress={this.indicatorPressed.bind(this,i)}
          >
             { i === this.state.activePage  ? this.props.indicatorText : this.props.inactiveIndicatorText }
          </Text>
      );
    }

    if (indicators.length === 1) {
      return null;
    }

    return (
      <View style={[styles.pageIndicator, position, indicatorStyle]}>
        {indicators}
      </View>
    );
  },

  _setUpTimer() {
     if (this.props.children.length > 1) {
         this.clearTimeout(this.timer);
         this.timer = this.setTimeout(this._animateNextPage, this.props.delay);
     }
  },

  _animateNextPage() {
     var activePage = 0;
     if (this.state.activePage < this.props.children.length - 1) {
         activePage = this.state.activePage + 1;
     } else if (!this.props.loop) {
         return;
     }

     this.indicatorPressed(activePage);
     this._setUpTimer();
  },

  _onAnimationBegin() {
     this.clearTimeout(this.timer);
  },

  _onAnimationEnd(activePage) {
    this.setState({activePage});
    if (this.props.onPageChange) {
      this.props.onPageChange(activePage);
    }
  },

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CarouselPager
          ref="pager"
          width={this.getWidth()}
          contentContainerStyle={styles.container}
          onBegin={this._onAnimationBeginPage}
          onEnd={this._onAnimationEnd}
        >
          {this.props.children}
        </CarouselPager>
        {this.renderPageIndicator()}
      </View>
    );
  },

});

var styles = StyleSheet.create({
  pageIndicator: {
    position: 'absolute',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
  },
});

module.exports = Carousel;
