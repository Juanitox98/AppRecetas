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
      <Text style={styles.header}>Categorías de Recetas</Text>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
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
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  item: {
    flexDirection: 'row',        // 👈 Imagen y texto en la misma fila
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
  itemText: { fontSize: 18, fontWeight: 'bold' },
});
