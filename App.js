import React, { useState, useEffect } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, Modal, FlatList, Alert } from 'react-native';
import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [modalPaciente, setModalPaciente] = useState(false);

  useEffect(() => {
    obtenerCitasGuardadas();
  }, []);

  useEffect(() => {
    guardarCitasEnStorage();
  }, [pacientes]);

  const obtenerCitasGuardadas = async () => {
    try {
      const citasGuardadas = await AsyncStorage.getItem('citas');
      if (citasGuardadas !== null) {
        setPacientes(JSON.parse(citasGuardadas));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const guardarCitasEnStorage = async () => {
    try {
      await AsyncStorage.setItem('citas', JSON.stringify(pacientes));
    } catch (error) {
      console.error(error);
    }
  };

  const pacienteEditar = (id) => {
    const pacienteEditar = pacientes.filter((paciente) => paciente.id === id);
    setPaciente(pacienteEditar[0]);
  };

  const pacienteEliminar = (id) => {
    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        { text: 'Cancelar' },
        {
          text: 'Si Eliminar',
          onPress: () => {
            const pacientesActualizados = pacientes.filter((paciente) => paciente.id !== id);
            setPacientes(pacientesActualizados);
          },
        },
      ]
    );
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        Administrador de citas{' '}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text style={styles.btnTextoNuevaCita}>Nueva cita</Text>
      </Pressable>

      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes aún</Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Paciente
              item={item}
              setModalVisible={setModalVisible}
              setPaciente={setPaciente}
              pacienteEditar={pacienteEditar}
              pacienteEliminar={pacienteEliminar}
              setModalPaciente={setModalPaciente}
            />
          )}
        />
      )}

      {modalVisible && (
        <Formulario
          cerrarModal={cerrarModal}
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
      )}

      <Modal visible={modalPaciente} animationType="slide">
        <InformacionPaciente
          paciente={paciente}
          setPaciente={setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  tituloBold: {
    fontWeight: '900',
    color: '#A930FA',
  },
  btnNuevaCita: {
    backgroundColor: '#A930FA',
    padding: 20,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30
  },
});

export default App;
