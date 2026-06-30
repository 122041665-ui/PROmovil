import { View, Text, StyleSheet } from 'react-native';

export default function ConsideracionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>libre</Text>
      <Text style={styles.subtitulo}>
        Esta pantalla puede usarse para mostrar una reflexión personal, una propuesta de proyecto,
        un mensaje importante o cualquier otra idea que quieras compartir.
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
  },
  subtitulo: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 24,
  },
});
