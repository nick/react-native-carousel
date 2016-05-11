var React = require('react');
var {
  View,
  ViewPagerAndroid,
} = require('react-native');

var CarouselPager = React.createClass({

  scrollToPage(page, animated) {
    if (typeof animated === 'undefined') {
      animated = true;
    }
    if (animated) {
      this.refs.viewPager.setPage(page);
    } else {
      this.refs.viewPager.setPageWithoutAnimation(page);
    }
  },

  _onPageSelected(e) {
    this.props.onEnd(e.nativeEvent.position);
  },

  render() {
    return <ViewPagerAndroid
      ref="viewPager"
      style={{flex: 1}}
      contentContainerStyle={this.props.contentContainerStyle}
      automaticallyAdjustContentInsets={false}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      onPageScroll={this.props.onBegin}
      onPageSelected={this._onPageSelected}
      scrollsToTop={false}
      >
        {this.props.children.map((c, idx) => <View key={idx} style={{flex: 1}}>{c}</View>)}
      </ViewPagerAndroid>;
  },
});

module.exports = CarouselPager;
