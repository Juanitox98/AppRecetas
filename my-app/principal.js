import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';

export default function Principal({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => res.json())
      .then(json => setCategories(json.categories))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🍽️ Categorías de Recetas</Text>
      
      {/* Botón para ir a MisRecetas */}
      <TouchableOpacity
        style={styles.misRecetasButton} // Estilo personalizado para el botón
        onPress={() => navigation.navigate('MisRecetas')} // Navegar a la pantalla MisRecetas
      >
        <Text style={styles.misRecetasButtonText}>Mis Recetas</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#27ae60" />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={item => item.idCategory}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('Recetas', { category: item.strCategory })}
            >
              <Image source={{ uri: item.strCategoryThumb }} style={styles.image} />
              <Text style={styles.itemText}>{item.strCategory}</Text>
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
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#e67e22' 
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { 
    width: 60, 
    height: 60, 
    borderRadius: 8, 
    marginRight: 15 
  },
  itemText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2c3e50' 
  },
  // Estilo para el botón "Mis Recetas"
  misRecetasButton: {
    padding: 15,
    backgroundColor: '#3498db', // Color azul, complementario al color naranja de los items
    marginBottom: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  misRecetasButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Color blanco para el texto
    textAlign: 'center',
  }
});
