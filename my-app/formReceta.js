import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert,TouchableOpacity } from 'react-native';
import { addReceta } from './UserService';

export default function FormReceta({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [instrucciones, setInstrucciones] = useState('');
  const [imagen, setImagen] = useState('');
  const [ingredientes, setIngredientes] = useState(['']);

  const handleGuardar = async () => {
    if (!nombre || !categoria || !instrucciones || ingredientes.some(ing => !ing.trim())) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      await addReceta({
        nombre,
        categoria,
        instrucciones,
        imagen,
        ingredientes,
        createdAt: new Date()
      });

      Alert.alert('Receta guardada', `Has guardado la receta: ${nombre}`);
      navigation.navigate('UserList');
    } catch (error) {
      console.error("Error guardando receta:", error);
      Alert.alert('Error', 'No se pudo guardar la receta. Intenta más tarde.');
    }
  };

  const handleAddIngrediente = () => {
    setIngredientes([...ingredientes, '']);
  };

  const handleChangeIngrediente = (text, index) => {
    const nuevosIngredientes = [...ingredientes];
    nuevosIngredientes[index] = text;
    setIngredientes(nuevosIngredientes);
  };

  const handleRemoveIngrediente = (index) => {
    if (ingredientes.length === 1) return; 
    const nuevos = ingredientes.filter((_, i) => i !== index);
    setIngredientes(nuevos);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>⬅</Text>
      </TouchableOpacity>

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

      
      <Text style={styles.label}>Ingredientes</Text>
      {ingredientes.map((ingrediente, index) => (
        <View key={index} style={styles.ingredienteRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            placeholder={`Ingrediente ${index + 1}`}
            value={ingrediente}
            onChangeText={(text) => handleChangeIngrediente(text, index)}
          />
          
          {index === ingredientes.length - 1 && (
            <TouchableOpacity style={styles.addButtonSmall} onPress={handleAddIngrediente}>
              <Text style={styles.addButtonText}>➕</Text>
            </TouchableOpacity>
          )}
          
          {ingredientes.length > 1 && (
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveIngrediente(index)}>
              <Text style={styles.removeButtonText}>✖</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <View style={{ marginTop: 20 }}>
        <Button title="Guardar Receta" onPress={handleGuardar} color="#27ae60" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fffbe6',
    flexGrow: 1,
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 10,
  },
  ingredienteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonSmall: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  addButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  removeButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
