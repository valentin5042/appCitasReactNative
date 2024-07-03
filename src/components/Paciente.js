import React from 'react'
import {Text, View, StyleSheet, Pressable} from 'react-native'

const Paciente = ({ 
    item, 
    setModalVisible, 
    setPaciente,
    pacienteEditar, 
    pacienteEliminar,
    setModalPaciente
}) => {

    const { paciente, telefono, id } = item
    
    //const formatearFecha = fecha => {  codigo para formatear la fecha y que nos permita extraer para mostrarlo
    //    const nuevaFecha = new Date(fecha)
    //        const opciones = {
    //            weekday: 'long',
    //            year: 'numeric',
    //            month: 'long',
    //            day: 'numeric'
    //        }
    //      return nuevaFecha.toLocalDateString('es-Es', opciones)
    //    }

  return (
    <Pressable
    onLongPress={() => {
        setModalPaciente(true)
        setPaciente(item)
    }}
    >
        <View style={styles.contenedor}>
            <Text style={styles.label}>Paciente</Text>
            <Text style={styles.texto}>{paciente}</Text>
            <Text style={styles.telefono}>{telefono}</Text>

            <View style={styles.contenedorBotones}>
                <Pressable 
                style={[styles.btn, styles.btnEditar]}
                onPress={ () => {
                    setModalVisible(true)
                    pacienteEditar(id)
                }}
                >
                    <Text style={styles.btnTexto}>Editar</Text>
                </Pressable>

                <Pressable 
                onPress={ () => pacienteEliminar(id)}
                style={[styles.btn, styles.btnEliminar]}
                >
                    <Text style={styles.btnTexto}>Eliminar</Text>
                </Pressable>
            </View>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomColor: '#94A3B8',
        borderBottomWidth: 1,
        borderRadius: 10
    },
    label: {
        color: '#374151',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginBottom: 10
    },
    texto: {
        color: '#6d28d9',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10
    },
    telefono: {
        color: '#6d28d9',

    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop: 20
    },
    btn: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8
    },
    btnEditar: {
        backgroundColor: '#FAC466',
    },
    btnEliminar: {
        backgroundColor: '#ef4444'
    },
    btnTexto: {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 15,
        color: '#fff'
    }
})

export default Paciente