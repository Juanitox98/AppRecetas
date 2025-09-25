import React, { useState, useCallback } from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet,ActivityIndicator,Image} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getRecetas } from './UserService';

export default function UserListScreen({ navigation }) {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRecetas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getRecetas();
      setRecetas(data);
    } catch (error) {
      console.error("Error al cargar recetas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadRecetas();
    }, [loadRecetas])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('DetalleReceta', { recetaId: item.id })}
    >
      {item.imagen ? (
        <Image source={{ uri: item.imagen }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={{ color: '#aaa' }}>Sin Imagen</Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.categoria}>{item.categoria}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#27ae60" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Principal')}>
          <Text style={styles.backButton}>⬅</Text>
        </TouchableOpacity>
        <Text style={styles.title}>📖 Mis Recetas</Text>
      </View>

      <FlatList
        data={recetas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={loadRecetas}
        contentContainerStyle={{ paddingTop: 10 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('FormReceta')}
      >
        <Text style={styles.addButtonText}>➕ Añadir Receta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fffbe6' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    fontSize: 24,
    color: '#34495e',
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e67e22',
    textAlign: 'center',
    flex: 1, 
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  placeholder: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: { flex: 1 },
  nombre: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50' },
  categoria: { fontSize: 14, color: '#999' },
  addButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
