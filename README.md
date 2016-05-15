## Carousel component for react-native

### Installation
```bash
npm install react-native-carousel
```

###Properties

```
hideIndicators={false} // Set to true to hide the indicators
indicatorColor="#FFFFFF" // Active indicator color
indicatorSize={20} // Indicator bullet size
indicatorSpace={15} // space between each indicator
inactiveIndicatorColor="#999999" // Inactive indicator color
indicatorAtBottom={true} // Set to false to show the indicators at the top
indicatorOffset={250} // Indicator relative position from top or bottom
onPageChange={callback} // Called when the active page changes
inactiveIndicatorText= '•' // Inactive indicator content ( You can customize to use any Unicode character )
indicatorText= '•' // Active indicator content ( You can customize to use any Unicode character )

animate={true} // Enable carousel autoplay
delay={1000} // Set Animation delay between slides
loop={true} // Allow infinite looped animation. Depends on Prop {...animate} set to true.
 
```

### Usage example

Assuming you have `npm install -g react-native-cli`, first generate an app:

    react-native init RNCarousel
    cd RNCarousel
    npm install react-native-carousel --save

Then paste the following into `RNCarousel/index.ios.js`:

```javascript
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Carousel = require('react-native-carousel');

var RNCarousel = React.createClass({
  render: function() {
    return (
      <Carousel width={375}>
        <View style={styles.container}>
          <Text>Page 1</Text>
        </View>
        <View style={styles.container}>
          <Text>Page 2</Text>
        </View>
        <View style={styles.container}>
          <Text>Page 3</Text>
        </View>
      </Carousel>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

AppRegistry.registerComponent('RNCarousel', () => RNCarousel);
```
