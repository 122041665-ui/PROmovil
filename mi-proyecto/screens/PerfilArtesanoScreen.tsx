import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { useArtesano } from '../src/hooks/useArtesanos';
import { Producto } from '../src/types';
import { ArtesanosStackParamList } from '../src/types/navigation';

type Props = NativeStackScreenProps<ArtesanosStackParamList, 'PerfilArtesano'>;

export default function PerfilArtesanoScreen({ route }: Props) {
  const { artesanoId } = route.params;
  const { artesano, productos, cargando } = useArtesano(artesanoId);

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!artesano) {
    return (
      <View style={styles.centrado}>
        <Text>Artesano no encontrado.</Text>
      </View>
    );
  }

  const renderProducto = ({ item }: { item: Producto }) => (
    <View style={styles.producto}>
      <Image source={{ uri: item.imagen }} style={styles.productoImg} />
      <View style={styles.productoInfo}>
        <Text style={styles.productoNombre}>{item.nombre}</Text>
        <Text style={styles.precio}>Puja actual: ${item.precioActual}</Text>
        <Text style={styles.cierre}>Cierra: {item.fechaFin}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={productos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderProducto}
      ListHeaderComponent={
        <View style={styles.header}>
          <Image source={{ uri: artesano.imagen }} style={styles.avatarGrande} />
          <Text style={styles.nombre}>{artesano.nombre}</Text>
          <Text style={styles.especialidad}>{artesano.especialidad}</Text>
          <Text style={styles.ubicacion}>{artesano.ubicacion}</Text>
          <Text style={styles.subtitulo}>Piezas en subasta ({productos.length})</Text>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.vacio}>Este artesano no tiene piezas en subasta.</Text>
      }
      contentContainerStyle={styles.lista}
    />
  );
}

const styles = StyleSheet.create({
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  lista: {
    padding: 12,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatarGrande: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  especialidad: {
    color: '#555',
    marginTop: 2,
  },
  ubicacion: {
    color: '#888',
    marginTop: 2,
  },
  subtitulo: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 6,
    color: '#1a1a1a',
  },
  producto: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  productoImg: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  productoInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productoNombre: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  precio: {
    color: '#2e7d32',
    marginTop: 2,
  },
  cierre: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  vacio: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
