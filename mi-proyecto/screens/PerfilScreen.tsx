import { View, Text, StyleSheet, Image } from 'react-native';

const nombre: string = 'Rafael Resendiz Vazquez';
const carrera: string = 'Ing. en Sistemas Computacionales';
const cuatrimestre: number = 9;
const promedio: number = 9.0;
const titulado: boolean = false;

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn.conmebol.com/wp-content/uploads/2023/06/000_334P84K-1024x683.jpg' }}
        style={styles.avatar}
      />
      <Text style={styles.titulo}>{nombre}</Text>
      <Text style={styles.subtitulo}>{carrera}</Text>
      <Text style={styles.dato}>Cuatrimestre: {cuatrimestre}</Text>
      <Text style={styles.dato}>Promedio: {promedio}</Text>
      <Text style={styles.dato}>Titulado: {titulado ? 'Sí' : 'No'}</Text>
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
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  dato: {
    fontSize: 16,
    marginBottom: 6,
  },
});
