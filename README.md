# 📱 Projeto React Native - Estácio

Este é um projeto educacional desenvolvido como apoio às aulas práticas da disciplina **Programação para Dispositivos Móveis em Android** do curso de Análise e Desenvolvimento de Sistemas da **Estácio**, sob minha orientação.

O projeto serve como um laboratório evolutivo, onde os alunos podem acompanhar a aplicação dos principais conceitos discutidos em sala, organizados conforme os temas propostos no plano de ensino da disciplina.

---

## 🎯 Objetivo

Proporcionar aos alunos uma vivência prática e incremental no desenvolvimento de aplicações mobile com **React Native**, utilizando recursos nativos, persistência local e remota, conexão com serviços web, arquitetura de software e boas práticas de desenvolvimento.

---

## 🧭 Conteúdos por Tema

### 🧱 Tema 1 – Sintaxe e Componentes do React Native

- Apresentação e configuração do ambiente com **Expo**
- Estrutura de arquivos e uso do **JSX**
- Criação e utilização de **componentes nativos e customizados**
- Utilização de **componentes interativos** (TextInput, Button, etc.)
- Introdução ao ciclo de vida e **depuração no React Native**

✅ Implementações no projeto:
- Tela de postagem com `TextInput` e `Modal`
- Componente de botão customizado
- Uso do hook `useState`
- Depuração via console/logs

---

### 🎨 Tema 2 – Interface Gráfica com React Native

- Definição de requisitos e funcionalidades visuais
- Organização de **telas e elementos**
- Componentes de **lista e seleção multivalorada**
- **Stack Navigation** e **Drawer Navigation** com React Navigation

✅ Implementações no projeto:
- Modal customizado para criar posts
- Botões com ícones (camera, galeria)
- Planejamento para navegação com `@react-navigation/native`

---

### 💾 Tema 3 – Persistência de Dados com React Native

- Persistência local com `AsyncStorage`
- Introdução a bancos **relacionais (SQLite)** e **NoSQL (MongoDB)**
- Alternativas com banco orientado a objetos (Realm)

🔧 Planejado para os próximos commits:
- Salvar os posts localmente com `AsyncStorage`
- Exibir os posts em uma lista com persistência

---

### 🌐 Tema 4 – Conexão Remota com React Native

- Conexão com **serviços web**
- Consumo de **APIs REST**
- Conceito de **Offline First**
- Persistência remota com controle de acesso

🔧 Planejado:
- Integração com uma API para salvar posts remotamente
- Modelagem local + sincronização remota

---

### 🧠 Tema 5 – Tópicos Avançados em React Native

- Arquitetura **MVC** e boas práticas
- Padrões de desenvolvimento: **DAO**, **Repository**, etc.
- **Redux** para gerenciamento de estado
- **Criptografia** e publicação de apps com **Expo**
- Práticas de **CI/CD**, testes automatizados e performance

🔧 Em desenvolvimento:
- Refatoração para usar arquitetura por camadas (Controller/DAO)
- Implementação futura de Redux
- Guia para publicação e performance tuning

---

## 📷 Funcionalidades do App

- Criar posts com texto e/ou imagem
- Tirar foto com a câmera ou escolher da galeria
- Modal interativo com validações
- Fechamento do teclado ao tocar fora ou pressionar Enter
- Planejamento para lista de posts e navegação entre telas

---

## 🚀 Tecnologias Utilizadas

- **React Native**
- **Expo**
- `expo-image-picker`
- `react-native-vector-icons`
- `AsyncStorage` (planejado)
- `@react-navigation/native` (em breve)
- `Realm`, `SQLite` e integração com API (em breve)

---

## ▶️ Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```
2. Instale as dependências:
```bash
npm install
# ou
npm install --legacy-peer-deps

```
3. Execute o projeto:
```bash
npm run tunnel
```

---

## 👨‍🏫 Sobre o Autor

**Wendel Nogueira**  
Orientador de TI na Estácio  
Desenvolvedor Fullstack na IBM  
Instrutor & Mentor de Carreira na área de programação

📫 [LinkedIn](https://linkedin.com/in/wendelnogueira)

---

## 📜 Licença

Este projeto é de uso educacional e livre para fins acadêmicos e de aprendizado.

```

---

