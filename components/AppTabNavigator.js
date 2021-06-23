import React, { Component } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import BookDonateScreen from "../screens/bookDonateScreen";
import BookRequestScreen from "../screens/bookRequestScreen";
import { AppStackNavigator } from "./AppStackNavigator";

export const AppTabNavigator = createBottomTabNavigator({
  DonateBooks: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/donate-book.png")}
          style={{ width: 40, height: 40 }}
        />
      ),
      tabBarLabel: "Donate Books",
    },
  },
  BookRequest: {
    screen: BookRequestScreen,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require("../assets/request-book.png")}
          style={{ width: 40, height: 40 }}
        />
      ),
      tabBarLabel: "Request Books",
    },
  },
});
