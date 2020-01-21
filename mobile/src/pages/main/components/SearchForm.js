import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// import { Container } from './styles';

function SearchForm({ loandDevs }) {
  const [techs, setTechs] = useState('');
  const [searchFormBottomPosition, setSearchFormBottomPosition] = useState(20);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', event =>
      setSearchFormBottomPosition(event.endCoordinates.height * 1.5)
    );
    Keyboard.addListener('keyboardDidHide', event =>
      setSearchFormBottomPosition(event.endCoordinates.height + 20)
    );
  }, []);

  function handleSearchDevButton() {
    loandDevs(techs);
  }
  return (
    <View
      style={{
        position: 'absolute',
        bottom: searchFormBottomPosition,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
      }}
    >
      <TextInput
        style={style.searchInput}
        placeholder='Buscar devs por tecnologias'
        placeholderTextColor='#999'
        autoCapitalize='words'
        autoCorrect={false}
        onChangeText={setTechs}
      />
      <TouchableOpacity
        style={style.loandButton}
        onPress={handleSearchDevButton}
      >
        <MaterialIcons name='my-location' size={20} color='#fff' />
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  loandButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    backgroundColor: '#7159c1'
  }
});
export default SearchForm;
