import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam("id");

  console.log(result);

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
        <Text style={styles.categoryStyle}>{result.categories[0].title}</Text>
        <Text>{result.location.address1}</Text>
        <Text>
          {result.location.city}, {result.location.state}{" "}
          {result.location.zip_code}
        </Text>
        <Text style={styles.phoneStyle}>{result.display_phone}</Text>
        <Text style={{ marginBottom: 5, fontWeight: "bold" }}>
          Business Hours:
        </Text>
        <Text>
          Monday: {result.hours[0].open[0].start} -{result.hours[0].open[0].end}
        </Text>
        <Text>
          Tuesday: {result.hours[0].open[1].start} -
          {result.hours[0].open[1].end}
        </Text>
        <Text>
          Wednesday: {result.hours[0].open[2].start} -
          {result.hours[0].open[2].end}
        </Text>
        <Text>
          Thursday: {result.hours[0].open[3].start} -
          {result.hours[0].open[3].end}
        </Text>
        <Text>
          Friday: {result.hours[0].open[4].start} -{result.hours[0].open[4].end}
        </Text>
        <Text>
          Saturday: {result.hours[0].open[5].start} -
          {result.hours[0].open[5].end}
        </Text>
        <Text>
          Sunday: {result.hours[0].open[6].start} -{result.hours[0].open[6].end}
        </Text>
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
    marginRight: 15,
  },
  infoViewStyle: {
    alignItems: "flex-start",
  },
  imageStyle: {
    height: 200,
    width: 300,
  },
  restaurantNameStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  phoneStyle: {
    marginTop: 5,
    marginBottom: 5,
  },
  categoryStyle: {
    position: "absolute",
    alignSelf: "flex-end",
    marginTop: 10,
  },
});

export default ResultsShowScreen;
