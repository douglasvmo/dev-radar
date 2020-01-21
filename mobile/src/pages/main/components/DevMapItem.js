import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

// import { Container } from './styles';

function DevMapItem({ dev, navigation }) {
  return (
    <Marker
      key={dev._id}
      coordinate={{
        latitude: dev.location.coordinates[1],
        longitude: dev.location.coordinates[0]
      }}
    >
      <Image
        style={style.avatar}
        source={{
          uri: dev.avatar_url
        }}
      />
      <Callout
        onPress={() => {
          navigation.navigate('Profile', {
            github_username: dev.github_username
          });
        }}
      >
        <View style={style.callout}>
          <Text style={style.devName}>{dev.name}</Text>
          <Text style={style.devBio}>{dev.bio}</Text>
          <Text style={style.devTechs}>{dev.techs.join(', ')}</Text>
        </View>
      </Callout>
    </Marker>
  );
}
const style = StyleSheet.create({
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#fff'
  },
  callout: {
    width: 260
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  devBio: {
    color: '#666',
    marginTop: 5
  },
  devTechs: {
    marginTop: 5
  }
});

export default DevMapItem;
