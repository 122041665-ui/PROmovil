import { Image, StyleSheet, Text, View } from 'react-native';

const nombre = 'Rafael Resendiz Vazquez';
const carrera = 'Ingenieria en Sistemas Computacionales';
const universidad = 'Universidad Politecnica de Queretaro';
const cuatrimestre = 9;
const periodo = 'Mayo-Agosto 2026';
const proyecto = 'Artisan Auction';

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn.conmebol.com/wp-content/uploads/2023/06/000_334P84K-1024x683.jpg' }}
        style={styles.avatar}
      />
      <Text style={styles.titulo}>{nombre}</Text>
      <Text style={styles.subtitulo}>{carrera}</Text>
      <View style={styles.panel}>
        <Text style={styles.dato}>Universidad: {universidad}</Text>
        <Text style={styles.dato}>Cuatrimestre: {cuatrimestre}</Text>
        <Text style={styles.dato}>Periodo: {periodo}</Text>
        <Text style={styles.dato}>Proyecto: {proyecto}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  panel: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    gap: 8,
  },
  dato: {
    fontSize: 15,
    color: '#333',
  },
});
