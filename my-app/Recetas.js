import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Recetas({ route, navigation }) {
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
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>🡰</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Recetas de {category}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#e67e22" />
      ) : (
        <FlatList
          data={meals}
          keyExtractor={item => item.idMeal}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('DetalleReceta', { idMeal: item.idMeal })}
            >
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />
              <Text style={styles.title}>{item.strMeal}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fffbe6' 
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#fffbe6',
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  backButtonText: {
    color: '#000000ff',
    fontSize: 16,
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#e67e22', 
    flex: 1, 
    textAlign: 'center',
  },
  card: { 
    backgroundColor: '#fff', 
    marginBottom: 15, 
    borderRadius: 12, 
    padding: 10, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  image: { 
    width: '100%', 
    height: 200, 
    borderRadius: 10, 
    marginBottom: 10 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
    textAlign: 'center' 
  },
});
