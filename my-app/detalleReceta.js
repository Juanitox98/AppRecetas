import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Linking, TouchableOpacity } from 'react-native';

export default function DetalleReceta({ route, navigation }) {
  const { idMeal } = route.params; 
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0); 

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
      .then(res => res.json())
      .then(json => setMeal(json.meals[0]))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [idMeal]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e67e22" />
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={styles.center}>
        <Text>No se encontró la receta.</Text>
      </View>
    );
  }

  
  const ingredientes = [];
  for (let i = 1; i <= 20; i++) {
    const ingrediente = meal[`strIngredient${i}`];
    const medida = meal[`strMeasure${i}`];
    if (ingrediente && ingrediente.trim() !== '') {
      ingredientes.push(`${medida} ${ingrediente}`);
    }
  }

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>🡰</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Detalle de la Receta</Text>
      </View>

      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.subtitle}>🍴 Categoría: {meal.strCategory}</Text>
      <Text style={styles.subtitle}>🌍 Origen: {meal.strArea}</Text>

      <Text style={styles.section}>Ingredientes</Text>
      {ingredientes.map((ing, index) => (
        <Text key={index} style={styles.text}>• {ing}</Text>
      ))}

      <Text style={styles.section}>Instrucciones</Text>
      <Text style={styles.text}>{meal.strInstructions}</Text>

      <Text style={styles.section}>Califica esta receta</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={rating >= star ? styles.starSelected : styles.star}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.text}>Tu calificación: {rating} / 5</Text>

      
      {meal.strYoutube ? (
        <TouchableOpacity
          style={styles.youtubeButton}
          onPress={() => Linking.openURL(meal.strYoutube)}
        >
          <Text style={styles.youtubeText}>🎥 Ver Video en YouTube</Text>
        </TouchableOpacity>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fffbe6' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: '#fffbe6',
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  backButtonText: {
    color: '#000',
    fontSize: 16,
  },
  header: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#e67e22', 
    flex: 1, 
    textAlign: 'center',
  },

  image: { width: '100%', height: 220, borderRadius: 10, marginBottom: 15 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 5 },
  section: { fontSize: 20, fontWeight: 'bold', marginTop: 15, marginBottom: 8, color: '#000000ff' },
  text: { fontSize: 15, lineHeight: 22, marginBottom: 5 },

  
  starsContainer: { flexDirection: 'row', marginVertical: 10 },
  star: { fontSize: 32, color: '#ccc', marginHorizontal: 5 },
  starSelected: { fontSize: 32, color: '#FFD700', marginHorizontal: 5 },

  youtubeButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  youtubeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
