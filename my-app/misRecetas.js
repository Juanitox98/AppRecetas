import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { addReceta } from './UserService';

export default function FormularioReceta({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [instrucciones, setInstrucciones] = useState('');
  const [imagen, setImagen] = useState('');

  const handleGuardar = async () => {
    if (!nombre || !categoria || !instrucciones) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      await addReceta({
        nombre,
        categoria,
        instrucciones,
        imagen,
        createdAt: new Date()
      });
      Alert.alert('Receta guardada', `Has guardado la receta: ${nombre}`);

      // Limpiar campos (opcional, porque ya navegas)
      setNombre('');
      setCategoria('');
      setInstrucciones('');
      setImagen('');

      navigation.navigate('MisRecetas');
    } catch (error) {
      console.error("Error guardando receta:", error);
      Alert.alert('Error', 'No se pudo guardar la receta. Intenta más tarde.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>➕ Añadir Receta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la receta *"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Categoría *"
        value={categoria}
        onChangeText={setCategoria}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Instrucciones *"
        value={instrucciones}
        onChangeText={setInstrucciones}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="URL de imagen (opcional)"
        value={imagen}
        onChangeText={setImagen}
      />

      <Button title="Guardar Receta" onPress={handleGuardar} color="#27ae60" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fffbe6',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e67e22',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
  },
});
