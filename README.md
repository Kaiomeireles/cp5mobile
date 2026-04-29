# TaskFlow 🚀

**TaskFlow** é um aplicativo mobile de gerenciamento de tarefas pessoais desenvolvido com **React Native** e **TypeScript**. O projeto foca em oferecer uma experiência fluida, com organização modular, persistência de dados local e uma interface moderna que se adapta às preferências do usuário (Dark/Light mode).

Este projeto faz parte da entrega **CP5** do curso de Mobile Development.

---

## 📱 Demonstração em Vídeo

[Assista ao vídeo de demonstração aqui](LINK_DO_VIDEO_AQUI)
*(O vídeo cobre: navegação, fluxo de CRUD, persistência de dados e consumo de API)*

---

## ✨ Funcionalidades

- **Autenticação:** Sistema de login simples com diferentes níveis de acesso (Admin/User).
- **Gerenciamento de Tarefas (CRUD):** 
  - Cadastro de novas tarefas com prioridade e categoria.
  - Listagem com filtros por status (Pendente/Concluída).
  - Edição e remoção de tarefas com confirmação.
- **Persistência Local:** Todos os dados (tarefas, login e temas) são salvos no dispositivo usando `AsyncStorage`.
- **Temas Dinâmicos:** Suporte completo a modo claro e escuro.
- **Consumo de API:** Busca de frases motivacionais aleatórias via API externa para a tela Home.
- **Navegação Profissional:** Combinação de `Bottom Tabs` e `Stack Navigation`.

---

## 🛠️ Tecnologias Utilizadas

- **React Native** (Expo)
- **TypeScript** (Tipagem forte)
- **React Navigation** (Tabs & Stack)
- **Context API** (Estado Global para Auth, Tasks e Theme)
- **AsyncStorage** (Armazenamento local)
- **Axios / Fetch** (Consumo de API)
- **StyleSheet** (Design System customizado)

---

## 📂 Estrutura do Projeto

```text
src/
 ├── components/    # Componentes reutilizáveis (Botões, Inputs, Cards)
 ├── context/       # Estados globais (Auth, Task, Theme)
 ├── hooks/         # Hooks customizados (useAuth, useTasks, useTheme)
 ├── routes/        # Configurações de navegação
 ├── screens/       # Telas da aplicação (Home, Tasks, Settings, Login)
 ├── services/      # Integração com API e Storage
 ├── types/         # Definições de tipos TypeScript
 └── utils/         # Funções auxiliares (Formatação, IDs)
```

---

## 👥 Integrantes do Grupo

- **Kaio Vinicius Meireles Alves** - RM553282
- **Lucas Alves de Souza** - RM553956
- **Guilherme Fernandes de Freitas** - RM554323
- **João Pedro Chizzolini de Freitas** - RM553172

---

## 🚀 Como executar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Kaiomeireles/cp5mobile
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o projeto:**
   ```bash
   npx expo start
   ```

4. **Abra no seu dispositivo:**
   Use o app **Expo Go** (Android/iOS) para ler o QR Code gerado no terminal.

---

## 📝 Regras de Negócio Implementadas

- [x] Título obrigatório nas tarefas.
- [x] Não permite salvar campos vazios.
- [x] IDs únicos gerados automaticamente.
- [x] Datas de criação e atualização automáticas.
- [x] Confirmação antes de excluir tarefas.
- [x] Redirecionamento inteligente pós-login (Admin -> Configurações | User -> Home).

---
Desenvolvido com ❤️ pelo grupo de CP5.
