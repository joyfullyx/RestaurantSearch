import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();

  const filterResultsByPrice = (price) => {
    // price === '$' || '$$' || '$$$' || '$$$$'
    // return appropriate results

    return results.filter((result) => {
      return result.price === price;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Text>Found {results.length} results</Text>
      <ScrollView>
        <ResultsList results={filterResultsByPrice("$")} title="Cheap" />
        <ResultsList results={filterResultsByPrice("$$")} title="Average" />
        <ResultsList results={filterResultsByPrice("$$$")} title="Okurr" />
        <ResultsList results={filterResultsByPrice("$$$$")} title="Ballin'" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
