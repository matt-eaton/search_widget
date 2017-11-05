/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default class App extends Component<{}> {
  icon(iconName) {
    const prefix = Platform.OS === 'ios' ? 'ios' : 'md';
    return `${prefix}-${iconName}`;
  }

  animation: Animated.Value;
  input: AnimatedTextInput;

  constructor() {
    super();

    this.animation = new Animated.Value(0);
    this.animation.addListener(({ value }) => {
      this.currentValue = value;
    });
  }

  showSearchInput = () => {
    const toValue = this.currentValue > 0 ? 0 : 1;
    Animated.timing(this.animation, {
      toValue,
      duraction: 350,
    }).start(() => {
      this.input.getNode().focus();
    });
  };

  render() {
    const widthValue = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300],
    });

    const searchContainerStyle = {
      width: widthValue,
      paddingLeft: 0,
    };

    const radiusValue = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [4, 25],
    });

    const scaleValue = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.8],
    });

    const buttonStyle = {
      borderRadius: radiusValue,
      transform: [{ scale: scaleValue }],
    };

    const rotateValue = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['90deg', '0deg'],
    });
    const iconStyle = {
      transform: [{ rotate: rotateValue }],
    };

    const inputTop = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [70, 0],
    });
    const opacity = this.animation.interpolate({
      inputRange: [0, 0.7, 1],
      outputRange: [0, 0.2, 1],
    });
    const inputStyle = {
      opacity,
      top: inputTop,
    };

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.searchInputContainer, searchContainerStyle]}
        >
          <AnimatedTextInput
            style={[styles.searchInput, inputStyle]}
            placeholder="Type to search"
            placeholderTextColor="lightgray"
            selectionColor="lightgray"
            ref={(input) => {
              this.input = input;
            }}
          />
          <TouchableWithoutFeedback onPress={this.showSearchInput}>
            <Animated.View style={[styles.searchButton, buttonStyle]}>
              <AnimatedIcon
                name={this.icon('search')}
                size={30}
                style={[styles.searchIcon, iconStyle]}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  searchInputContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flexDirection: 'row',
    height: 50,
    borderRadius: 40,
    justifyContent: 'flex-end',
  },
  searchInput: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    marginLeft: 10,
    color: 'lightgray',
  },
  searchButton: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  searchIcon: {},
});
