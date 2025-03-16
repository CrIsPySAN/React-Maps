import React, { useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const UT_CANCUN = {
    latitude: 21.0511,
    longitude: -86.8422,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
};

const pueblosMagicos = [
    {
        id: '1',
        name: 'Izamal',
        description: 'La ciudad amarilla, con rica historia colonial y maya.',
        image: require('../../assets/image/izamal.jpg'),
        coordinates: {
            latitude: 20.9313,
            longitude: -89.0177,
        },
    },
    {
        id: '2',
        name: 'Valladolid',
        description: 'Un encantador pueblo lleno de tradición y color.',
        image: require('../../assets/image/valladolid.jpg'),
        coordinates: {
            latitude: 20.6894,
            longitude: -88.2016,
        },
    },
];

export default function MapScreen() {
    const mapRef = useRef(null);

    const navigateToLocation = (coords) => {
        mapRef.current?.animateToRegion(
            {
                ...coords,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            },
            1000
        );
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={UT_CANCUN}
            >
                <Marker
                    coordinate={{ latitude: 21.0511, longitude: -86.8461 }}
                    title="UT Cancún"
                    description="Universidad Tecnológica de Cancún"
                />

                {pueblosMagicos.map((pueblo) => (
                    <Marker
                        key={pueblo.id}
                        coordinate={pueblo.coordinates}
                        title={pueblo.name}
                        description={pueblo.description}
                    />
                ))}
            </MapView>

            <View style={styles.cardsContainer}>
                <FlatList
                    horizontal
                    data={pueblosMagicos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={item.image} style={styles.cardImage} />
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardDescription}>{item.description}</Text>
                            <TouchableOpacity
                                style={styles.cardButton}
                                onPress={() => navigateToLocation(item.coordinates)}
                            >
                                <Text style={styles.cardButtonText}>Ver en el Mapa</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    cardsContainer: {
        position: 'absolute',
        bottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 8,
        width: 250,
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 100,
        borderRadius: 8,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
    },
    cardDescription: {
        fontSize: 14,
        marginVertical: 5,
    },
    cardButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    cardButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
