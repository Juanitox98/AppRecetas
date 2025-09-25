import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MisRecetas({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📖 Mis Recetas</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Botón de retroceso - Mismo estilo que en FormReceta */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.navigate('Principal')}
        >
          <Text style={styles.backButtonText}>⬅</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>POLLO</Text>
          <Text style={styles.cardSubtitle}>POLLOS</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>jsjsks</Text>
          <Text style={styles.cardSubtitle}>laskdak</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>skdskds</Text>
          <Text style={styles.cardSubtitle}>zxlxzkzx</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>sjsjsj</Text>
          <Text style={styles.cardSubtitle}>slslk</Text>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('FormularioReceta')}
      >
        <Text style={styles.addButtonText}>➕ Añadir Receta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffbe6',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e67e22',
    marginTop: 15,
    marginBottom: 10,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 0,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 22,
    color: '#34495e',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  addButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});