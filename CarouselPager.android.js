var React = require('react');
var createReactClass = require('create-react-class');
var {
  View,
  ViewPagerAndroid,
} = require('react-native');

var CarouselPager = createReactClass({

  scrollToPage(page, animated) {
    if (typeof animated === 'undefined') {
      animated = true;
    }
    if (animated) {
      this.refs.viewPager.setPage(page);
    } else {
      this.refs.viewPager.setPageWithoutAnimation(page);
    }
    this._onPageSelected(page);
  },

  _onPageSelected(page) {
    this.props.onEnd(page);
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
      onPageSelected={(e) => this._onPageSelected(e.nativeEvent.position)}
      scrollsToTop={false}
      >
      {(()=>{
        if(this.props.children.length > 1)
            return this.props.children.map((c, idx) => <View key={idx} style={{flex: 1}}>{c}</View>)
        else
            return this.props.children
      })()}
      </ViewPagerAndroid>;
  },
});

module.exports = CarouselPager;
