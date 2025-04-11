import {
  NavigationContainer
} from "@react-navigation/native";
import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

function BemVindo() {
  return (
    <View style={styles.container}>
      <Text>Bem-vindo à Aplicação</Text>
    </View>
  );
}

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome de Usuário" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} />
      <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
        <Text style={styles.button}>Criar Conta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Painel")}>
        <Text style={styles.button}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

function PainelPrincipal({ navigation }) {
  const listaDeContatos = [{ id: 1, nome: "Laiany Eduarda", telefone: "(81) 98196-6221" }];

  return (
    <View style={styles.container}>
      {listaDeContatos.map((contato) => (
        <View key={contato.id}>
          <Text>Nome: {contato.nome}</Text>
          <Text>Telefone: {contato.telefone}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("EditarContato", { contato })}>
            <Text style={styles.button}>Ver Informações</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

function CriarConta({ navigation }) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome Completo" />
      <TextInput style={styles.input} placeholder="CPF" />
      <TextInput style={styles.input} placeholder="E-mail" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} />
      <TouchableOpacity onPress={() => navigation.navigate("Painel")}>
        <Text style={styles.button}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}

function AdicionarContato({ navigation }) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome" />
      <TextInput style={styles.input} placeholder="E-mail" />
      <TextInput style={styles.input} placeholder="Telefone" />
      <TouchableOpacity onPress={() => navigation.navigate("Painel")}>
        <Text style={styles.button}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

function EditarContato({ route }) {
  const { contato } = route.params;

  return (
    <View style={styles.container}>
      <Text>Nome Atual: {contato.nome}</Text>
      <Text>Telefone Atual: {contato.telefone}</Text>
      <TextInput style={styles.input} placeholder="Novo Nome" />
      <TextInput style={styles.input} placeholder="Novo Telefone" />
      <TouchableOpacity onPress={() => alert("Contato atualizado!")}>
        <Text style={styles.button}>Salvar Alterações</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert("Contato removido!")}>
        <Text style={styles.button}>Remover Contato</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function Aplicativo() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Bem-vindo" component={BemVindo} />
        <Stack.Screen name="Registro" component={CriarConta} />
        <Stack.Screen name="Adicionar" component={AdicionarContato} />
        <Stack.Screen name="EditarContato" component={EditarContato} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Painel" component={PainelPrincipal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#FFD1DC" 
  },
  input: { 
    marginBottom: 10, 
    width: "80%", 
    backgroundColor: "#fff", 
    textAlign: "center" 
  },
  button: { 
    color: "#FF69B4", 
    fontWeight: "bold" 
  },
});
