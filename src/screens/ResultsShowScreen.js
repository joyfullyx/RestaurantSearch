import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam("id");

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <View style={styles.continaer}>
      <View>
        <Text style={styles.restaurantNameStyle}>{result.name}</Text>
        <Text>{result.location.address1}</Text>
        <Text>
          {result.location.city}, {result.location.state}{" "}
          {result.location.zip_code}
        </Text>
        <Text style={styles.phoneStyle}>{result.display_phone}</Text>
        {/* <Text>Business Hours: {result.hours.hours_type}</Text> */}
      </View>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.imageStyle} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  continaer: {
    marginLeft: 15,
  },
  infoViewStyle: {
    alignItems: "flex-start",
  },
  imageStyle: {
    height: 200,
    width: 300,
  },
  restaurantNameStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  phoneStyle: {
    marginTop: 5,
    marginBottom: 5,
  },
});

export default ResultsShowScreen;
