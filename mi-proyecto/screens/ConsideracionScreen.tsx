import { View, Text, StyleSheet } from 'react-native';

export default function ConsideracionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Proyecto Integrador</Text>
      <Text style={styles.subtitulo}>
        Artisan Auction es una aplicacion movil de subastas de artesanias mexicanas
        desarrollada con React Native, Expo y TypeScript.
      </Text>
      <Text style={styles.texto}>
        La app aplica Separation of Concerns, Repository Pattern y Custom Hooks para
        separar interfaz, datos, tipos y logica reutilizable.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 24,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitulo: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 12,
  },
  texto: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});
