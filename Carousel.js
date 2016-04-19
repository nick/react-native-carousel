'use strict';

var React = require('react-native');
var {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewPagerAndroid,
} = React;

var TimerMixin = require('react-timer-mixin');

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
      this.scrollToPage(this.props.initialPage, false);
    }

    if (this.props.animate && this.props.children){
        this._setUpTimer();
    }
  },

  scrollToPage(page, animated) {
    if (typeof animated === 'undefined') {
      animated = true;
    }
    if (this.refs.scrollView !== null) {
      this.refs.scrollView.scrollTo({x: page * this.getWidth(), y: 0, animated: animated});
    } else {
      if (animated) {
        this.refs.viewPager.setPage(page);
      } else {
        this.refs.viewPager.setPageWithoutAnimation(page);
      }
    }
  },

  indicatorPressed(activePage) {
    this.setState({activePage});
    this.scrollToPage(activePage);
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
      style = i === this.state.activePage ? { color: this.props.indicatorColor } : { color: this.props.inactiveIndicatorColor };
      indicators.push(<Text style={[style, { fontSize: this.props.indicatorSize }]} key={i} onPress={this.indicatorPressed.bind(this,i)}>&bull;</Text>);
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

  _onAnimationBegin(e) {
     this.clearTimeout(this.timer);
  },

  _onAnimationEnd(e) {
    var activePage;
    if (this.refs.viewPager) {
      activePage = e.nativeEvent.position;
    } else {
      activePage = e.nativeEvent.contentOffset.x / this.getWidth();
    }

    this.setState({activePage});

    if (this.props.onPageChange) {
      this.props.onPageChange(activePage);
    }

  },

  render() {
    var contents;
    if (Platform.OS === 'ios') {
      contents = <ScrollView ref="scrollView"
          contentContainerStyle={styles.container}
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScrollBeginDrag={this._onAnimationBegin}
          onMomentumScrollEnd={this._onAnimationEnd}
          scrollsToTop={false}
        >
          {this.props.children}
        </ScrollView>;
    } else {
      contents = <ViewPagerAndroid
          ref="viewPager"
          style={{flex: 1}}
          contentContainerStyle={styles.container}
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onPageScroll={this._onAnimationBeginPage}
          onPageSelected={this._onAnimationEnd}
          scrollsToTop={false}
         >
          {this.props.children.map((c, idx) => <View key={idx} style={{flex: 1}}>{c}</View>)}
        </ViewPagerAndroid>;
    }

    return (
      <View style={{ flex: 1 }}>
        {contents}
        {this.renderPageIndicator()}
      </View>
    );
  },

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
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor:'transparent',
  },
});

module.exports = Carousel;
