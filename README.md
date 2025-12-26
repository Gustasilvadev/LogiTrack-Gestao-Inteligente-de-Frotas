# 🚚 LogiTrack - Gestão Inteligente de Frotas

O **LogiTrack** é uma solução **SaaS** completa para o monitoramento e gerenciamento de frotas logísticas.  
A plataforma permite que transportadoras gerenciem seus **veículos, operadores e rotas**, com um sistema robusto de **permissões e segurança**.

---

## 🚀 Funcionalidades Principais

- 🔐 **Autenticação Segura**  
  Sistema de login utilizando **JWT (JSON Web Token)**.

- 🧩 **Controle de Acesso (RBAC)**  
  Níveis de permissão distintos para **Administradores, Gestores e Operadores**.

- 🏢 **Gestão de Transportadoras**  
  Cadastro e monitoramento de parceiros logísticos *(exclusivo Admin)*.

- 🚛 **Painel de Frota**  
  Visualização em tempo real do status dos veículos:
  - Disponível
  - Em Rota
  - Manutenção

- 👥 **Gestão de Equipe**  
  Gestores podem cadastrar e gerenciar seus próprios operadores.

- 📊 **Dashboards Interativos**  
  Visualização de dados para tomada de decisão rápida.

---

## 🛠️ Stack Tecnológica

### 🔙 Backend
- **Linguagem:** Java 21 
- **Framework:** Spring Boot 3  
- **Segurança:** Spring Security + JWT  
- **Banco de Dados:** MySQL  
- **Documentação:** Swagger (OpenAPI 3)

### 🎨 Frontend
- **Framework:** Next.js (App Router)  
- **Linguagem:** TypeScript  
- **UI:** Material-UI (MUI)  
- **Consumo de API:** Axios  

---

## 👥 Níveis de Acesso

| Nível     | Descrição               | Permissões Principais                                   |
|----------|-------------------------|----------------------------------------------------------|
| Admin    | Administrador Geral     | Criar transportadoras e gestores                         |
| Manager  | Gestor da Unidade       | Gerenciar frota, equipe e visualizar relatórios          |
| Operator | Operador Logístico      | Atualizar status de veículos e acompanhar viagens        |

---

## 🔧 Como Iniciar

### ✅ Pré-requisitos
- JDK 17 ou superior  
- Node.js 18 ou superior  
- MySQL 8  

---

### 📥 Passo a Passo

#### 1️⃣ Clone o repositório
```bash
git clone https://github.com/Gustasilvadev/LogiTrack.git