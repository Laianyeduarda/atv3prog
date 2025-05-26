import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
        <Text style={styles.button}>Criar Conta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Painel")}>
        <Text style={styles.button}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

function PainelPrincipal({ navigation, contatos, carregarContatos }) {
  useEffect(() => {
    carregarContatos();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {contatos.map((contato) => (
        <View key={contato.id} style={styles.contatoCard}>
          <Text>Nome: {contato.nome}</Text>
          <Text>Telefone: {contato.telefone}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("EditarContato", { contato })}>
            <Text style={styles.button}>Ver Informações</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity onPress={() => navigation.navigate("Adicionar")}>
        <Text style={[styles.button, { marginTop: 20 }]}>Adicionar Contato</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function CriarConta({ navigation }) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome Completo" />
      <TextInput style={styles.input} placeholder="CPF" />
      <TextInput style={styles.input} placeholder="E-mail" />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry />
      <TouchableOpacity onPress={() => navigation.navigate("Painel")}>
        <Text style={styles.button}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}

function AdicionarContato({ navigation, adicionarContato }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  function handleAdicionar() {
    if (!nome || !telefone) {
      Alert.alert("Erro", "Nome e telefone são obrigatórios.");
      return;
    }
    adicionarContato({ nome, email, telefone });
    navigation.navigate("Painel");
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Telefone" value={telefone} onChangeText={setTelefone} />
      <TouchableOpacity onPress={handleAdicionar}>
        <Text style={styles.button}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

function EditarContato({ route, navigation, atualizarContato, removerContato }) {
  const { contato } = route.params;
  const [nome, setNome] = useState(contato.nome);
  const [telefone, setTelefone] = useState(contato.telefone);

  function handleSalvar() {
    if (!nome || !telefone) {
      Alert.alert("Erro", "Nome e telefone são obrigatórios.");
      return;
    }
    atualizarContato(contato.id, { nome, telefone });
    Alert.alert("Sucesso", "Contato atualizado!");
    navigation.navigate("Painel");
  }

  function handleRemover() {
    removerContato(contato.id);
    Alert.alert("Sucesso", "Contato removido!");
    navigation.navigate("Painel");
  }

  return (
    <View style={styles.container}>
      <Text>Nome Atual: {contato.nome}</Text>
      <Text>Telefone Atual: {contato.telefone}</Text>
      <TextInput style={styles.input} placeholder="Novo Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Novo Telefone" value={telefone} onChangeText={setTelefone} />
      <TouchableOpacity onPress={handleSalvar}>
        <Text style={styles.button}>Salvar Alterações</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRemover}>
        <Text style={styles.button}>Remover Contato</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [contatos, setContatos] = useState([
    { id: 1, nome: "Laiany Eduarda", telefone: "(81) 98196-6221" },
  ]);

  function carregarContatos() {
  }

  function adicionarContato(novoContato) {
    setContatos((old) => [...old, { id: old.length + 1, ...novoContato }]);
  }

  function atualizarContato(id, dados) {
    setContatos((old) =>
      old.map((c) => (c.id === id ? { ...c, ...dados } : c))
    );
  }

  function removerContato(id) {
    setContatos((old) => old.filter((c) => c.id !== id));
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Bem-vindo" component={BemVindo} />
        <Stack.Screen name="Registro" component={CriarConta} />
        <Stack.Screen name="Adicionar">
          {(props) => <AdicionarContato {...props} adicionarContato={adicionarContato} />}
        </Stack.Screen>
        <Stack.Screen name="EditarContato">
          {(props) => (
            <EditarContato
              {...props}
              atualizarContato={atualizarContato}
              removerContato={removerContato}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Painel">
          {(props) => (
            <PainelPrincipal {...props} contatos={contatos} carregarContatos={carregarContatos} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFD1DC",
    padding: 20,
  },
  input: { 
    marginBottom: 10,
    width: "80%",
    backgroundColor: "#fff",
    textAlign: "center",
    padding: 8,
    borderRadius: 5,
  },
  button: { 
    color: "#FF69B4",
    fontWeight: "bold",
    fontSize: 16,
  },
  contatoCard: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 6,
  },
});
