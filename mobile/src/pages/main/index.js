import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from 'expo-location';

import api from '~/service/api';

import DevMapItem from './components/DevMapItem';
import SearchForm from './components/SearchForm';

function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loandInitialLocation() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04
        });
      }
    }
    loandInitialLocation();
  }, []);

  if (!currentRegion) {
    return null;
  }

  async function loandDevs(techs) {
    const { latitude, longitude } = currentRegion;
    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs: techs.toLowerCase()
      }
    });
    setDevs(response.data);
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  return (
    <>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
        style={style.map}
      >
        {devs.map(dev => (
          <DevMapItem key={dev._id} dev={dev} navigation={navigation} />
        ))}
      </MapView>
      <SearchForm loandDevs={loandDevs} />
    </>
  );
}

const style = StyleSheet.create({
  map: {
    flex: 1
  }
});
export default Main;
