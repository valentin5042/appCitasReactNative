import React, { useState, useEffect } from 'react';
import { Modal, SafeAreaView, Text, StyleSheet, TextInput, View, ScrollView, Pressable, Alert } from 'react-native';

const Formulario = ({ modalVisible, cerrarModal, pacientes, setPacientes, paciente: pacienteObj, setPaciente: setPacienteApp }) => {
  const [id, setId] = useState('');
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sintomas, setSintomas] = useState('');

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setId(pacienteObj.id);
      setPaciente(pacienteObj.paciente);
      setPropietario(pacienteObj.propietario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setSintomas(pacienteObj.sintomas);
    }
  }, [pacienteObj]);



  const handleCita = () => {
    // Validar
    if ([paciente, propietario, email, sintomas].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    // Revisar si es un registro nuevo o edición
    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      sintomas,
    };

    if (id) {
      // Editando
      nuevoPaciente.id = id;
      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState
      );
      setPacientes(pacientesActualizados);
      setPacienteApp({});
    } else {
      // Nuevo Registro
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]);
    }


    cerrarModal();
    setId('');
    setPaciente('');
    setPropietario('');
    setEmail('');
    setTelefono('');
    setSintomas('');
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>{pacienteObj.id ? 'Editar' : 'Nueva'} Cita</Text>

          <Pressable
            style={styles.btnCancelar}
            onPress={() => {
              cerrarModal();
              setPacienteApp({});
              setId('');
              setPaciente('');
              setPropietario('');
              setEmail('');
              setTelefono('');
              setSintomas('');
            }}>
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Paciente"
              placeholderTextColor={'#666'}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Propietario"
              placeholderTextColor={'#666'}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={'#666'}
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono Propietario"
              placeholderTextColor={'#666'}
              keyboardType="number-pad"
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholder="Síntomas paciente"
              placeholderTextColor={'#666'}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <Pressable style={styles.btnNuevaCita} onPress={handleCita}>
            <Text style={styles.btnNuevaCitaTexto}>{pacienteObj.id ? 'Editar' : 'Agregar'} Paciente</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: '#C067FA',
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#fff',
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: '#A930FA',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  btnCancelarTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
  },
  btnNuevaCita: {
    marginVertical: 50,
    backgroundColor: '#FAC466',
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnNuevaCitaTexto: {
    color: '#A930FA',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default Formulario;
