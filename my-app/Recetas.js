import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native';

export default function Recetas({ route }) {
  const { category } = route.params;
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(res => res.json())
      .then(json => setMeals(json.meals))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recetas de {category}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={meals}
          keyExtractor={item => item.idMeal}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />
              <Text style={styles.title}>{item.strMeal}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  card: { backgroundColor: '#fff', marginBottom: 15, borderRadius: 10, padding: 10, alignItems: 'center' },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});
