## Carousel component for react-native

### Installation
```bash
npm install react-native-carousel
```

### Usage example
```javascript
var Carousel = require('react-native-carousel');

var ExampleProject = React.createClass({
  render() {
    return (
      <Carousel width={375} indicatorColor="#ffffff" inactiveIndicatorColor="#999999">
        <MyFirstPage />
        <MySecondPage />
        <MyThirdPage />
      </Carousel>
    );
  }
});
```
