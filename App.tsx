import { View, Text, Button, TextInput, FlatList, Modal, StyleSheet, ActivityIndicator } from "react-native";
import { useState } from "react";

const pacientesAgendados: any[] | (() => any[]) = [
    //dados de pacientes aqui
]

export default function App(){
    const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    cpf: '',
    endereco: '',
    dataConsulta: '',
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [pacientes, setPacientes] = useState(pacientesAgendados);
    const [isLoading, setIsLoading] = useState(false);

    const agendarConsulta = () => {
        const novoPaciente = {
            id: Math.random().toString(),
            ...formData,
            valorCobrado: '80,00',
        };

        setPacientes([...pacientes, novoPaciente]);
        setModalVisible(false);

        console.log('Dados do paciente agendado: ', novoPaciente);
    };
    const handleAgendarClick = () => {
        setIsLoading(true);

        setTimeout(() => {
            agendarConsulta();
            setIsLoading(false);
        }, 1500);
    };


    return(
       <View style={styles.container}>
        <Text style={styles.title}>Consultório</Text>
        <Button
        title="Agendar"
        onPress={() => setModalVisible(true)}
        color='#d95707'
        />

        <Modal visible={modalVisible} animationType='slide'> 
            <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Agendar Consulta</Text>
            <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            onChangeText={(text) => setFormData({ ...formData, nome: text })}
            />
            <TextInput
            style={styles.input}
            placeholder="Data de Nascimento (DD/MM/AAAA)"
            onChangeText={(text) => setFormData({ ...formData, dataNascimento: text })}
            />
            <TextInput
            style={styles.input}
            placeholder="CPF"
            onChangeText={(text) => setFormData({ ...formData, cpf: text })}
            />
            <TextInput
            style={styles.input}
            placeholder="Endereço"
            onChangeText={(text) => setFormData({ ...formData, endereco: text })}
            />
            <TextInput
            style={styles.input}
            placeholder="Data da Consulta (AAAA-MM-DD)"
            onChangeText={(text) => setFormData({ ...formData, dataConsulta: text })}
            />
            {isLoading ? (
            <ActivityIndicator size="large" color="#007BFF" />
            ) : (
            <View style={styles.buttonContainer}>
            <Button
            title="Agendar"
            onPress={handleAgendarClick}
            color="#d95707" 
            />
            <Button
            title="Cancelar"
            onPress={() => setModalVisible(false)}
            color="#d90707" 
            />
            </View>
            )}
            </View>
            </Modal>

            <Text style={styles.subtitle}>Pacientes Agendados</Text>
            <FlatList
            data={pacientes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <View style={styles.pacienteItem}>
            <Text style={styles.pacienteInfo}>Nome: {item.nome}</Text>
            <Text style={styles.pacienteInfo}>Data de Nascimento: {item.dataNascimento}</Text>
            <Text style={styles.pacienteInfo}>CPF: {item.cpf}</Text>
            <Text style={styles.pacienteInfo}>Endereço: {item.endereco}</Text>
            <Text style={styles.pacienteInfo}>Data da Consulta: {item.dataConsulta}</Text>
            <Text style={styles.pacienteInfo}>Valor Cobrado: R$ {item.valorCobrado}</Text>
            </View>
            )}
            />
            </View>
            );
            }   

            const styles = StyleSheet.create({
                container: {
                flex: 1,
                padding: 16,
                backgroundColor: '#FFFFF',
                },
                modalContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 16,
                backgroundColor: '#FFF',
                },
                title: {
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 16,
                textAlign: 'center',
                },
                subtitle: {
                fontSize: 20,
                fontWeight: 'bold',
                marginVertical: 16,
                textAlign: 'center',
                },
                modalTitle: {
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 16,
                textAlign: 'center',
                },
                input: {
                width: '100%',
                height: 40,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 8,
                marginBottom: 16,
                },
                buttonContainer: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: 16,
                },
                pacienteItem: {
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 16,
                marginBottom: 16,
                backgroundColor: '#fff',
                },
                pacienteInfo: {
                marginBottom: 8,
                },
                });