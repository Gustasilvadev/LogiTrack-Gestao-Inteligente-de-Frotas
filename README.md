# 🚚 LogiTrack - Gestão Inteligente de Frotas

![Java](https://img.shields.io/badge/Backend-Java%2021%20%7C%20Spring%20Boot-red)
![React](https://img.shields.io/badge/Frontend-Next.js%20%7C%20React%20Query-blue)
![Database](https://img.shields.io/badge/Database-MySQL-orange)
![Status](https://img.shields.io/badge/Status-Refactoring%20Complete-success)

O **LogiTrack** é uma solução SaaS completa para o monitoramento e gerenciamento de frotas logísticas. A plataforma permite que transportadoras gerenciem seus veículos, operadores e status de manutenção, com um sistema robusto de permissões e segurança.

---

## 🚀 Atualização Técnica: Refatoração & Performance

## ⚡ Estudo de Caso: Performance e Refatoração

Recentemente, a aplicação passou por uma migração arquitetural do gerenciamento de estado manual **useEffect** para o **TanStack Query**. O objetivo foi eliminar gargalos de performance e melhorar a experiência do usuário (UX).

### 🔄 Comparativo de Implementação

#### 🔴 Antes: (Gerenciamento Manual)
Antigamente, cada componente precisava gerenciar seus próprios estados de `loading`, `error` e `data`. Isso gerava muito código repetitivo e causava o efeito de "flickering" (tela piscando) ao navegar entre páginas, pois os dados eram buscados novamente a cada renderização.

```typescript
// Boilerplate excessivo: Gestão manual de loading e dados no próprio componente
const [vehicles, setVehicles] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  api.get('/vehicles')
    .then(res => {
      setVehicles(res.data);
    })
    .finally(() => setIsLoading(false));
}, []); // Dados perdidos ao trocar de aba (sem cache)
```

#### 🟢 Depois: Arquitetura Reativa (TanStack Query)
```typescript
// 1. Lógica centralizada no Hook (Gerenciamento de Cache)
export const useVehicles = () => {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      const { data } = await api.get('/vehicles');
      return data;
    }
  });
};

// 2. Uso no Componente (Clean Code: 1 linha resolve tudo)
const { data: vehicles, isLoading } = useVehicles();
```

## 🛠️ Stack Tecnológica

### 🔙 Backend
- **Linguagem:** Java 21
- **Framework:** Spring Boot 3
- **Segurança:** Spring Security + JWT (RBAC)
- **Banco de Dados:** MySQL
- **Documentação:** Swagger (OpenAPI)

### 🎨 Frontend
- **Framework:** Next.js (App Router)
- **Gerenciamento de Estado:** React Query (TanStack Query v5)
- **UI Kit:** Material UI (MUI) v6
- **HTTP Client:** Axios (com Interceptors para Injeção de Token)

---

## 📂 Arquitetura e Documentação Técnica

<details>
<summary><strong>🗄️ Modelagem de Dados (Banco de Dados)</strong></summary>

O sistema utiliza um banco relacional MySQL com as seguintes entidades principais:

### 1. Carrier (`carrier`)
Representa a empresa/transportadora.
| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| **id** | PK | Identificador único |
| **name** | Varchar | Razão Social |
| **cnpj** | Varchar | Documento único |
| **status** | Boolean | Ativo/Inativo |

### 2. User (`user`) e Role (`role`)
Usuários do sistema e seus níveis de acesso.
| Tabela | Coluna | Descrição |
| :--- | :--- | :--- |
| **user** | **id**, email, password, name | Dados de acesso |
| **role** | **id**, name | (ADMIN, MANAGER, OPERATOR) |
| **user_role** | user_id, role_id | Tabela associativa (N:N) |

### 3. Vehicle (`vehicle`)
Ativo principal monitorado.
| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| **id** | PK | Identificador único |
| **plate** | Varchar | Placa do veículo |
| **model** | Varchar | Modelo/Marca |
| **status** | Enum | AVAILABLE, IN_ROUTE, MAINTENANCE |
| **carrier_id** | FK | Transportadora proprietária |

### 4. Status History (`status_history`)
Log de auditoria para mudanças de status.
| Coluna | Tipo | Descrição |
| :--- | :--- | :--- |
| **id** | PK | Identificador do registro |
| **vehicle_id** | FK | Veículo alterado |
| **old_status** | Enum | Status anterior |
| **new_status** | Enum | Novo status |
| **changed_at** | Datetime | Data da alteração |

</details>

<details>
<summary><strong>🔌 Documentação da API (Endpoints)</strong></summary>

Abaixo estão listados os endpoints disponíveis, organizados por Controller.

### 🚛 Vehicle Controller
Gerenciamento da frota.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/vehicles/listVehicles` | Lista todos os veículos da transportadora. |
| `GET` | `/api/vehicles/listVehicleById/{id}` | Busca detalhes de um veículo específico. |
| `POST` | `/api/vehicles/createVehicle` | Cadastra um novo veículo. |
| `PUT` | `/api/vehicles/updateVehicleById/{id}` | Atualiza dados gerais do veículo. |
| `PATCH` | `/api/vehicles/{id}/status` | Atualiza apenas o status (Disp/Rota/Manut). |

### 👥 User Controller
Gerenciamento de usuários e autenticação.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/users/loginUser` | Autenticação (Retorna JWT). |
| `GET` | `/api/users/listTeam` | Lista a equipe da transportadora logada. |
| `GET` | `/api/users/listAllManagerOperators` | Lista gerentes e operadores (Admin view). |
| `POST` | `/api/users/createManager` | Cria um usuário Gestor. |
| `POST` | `/api/users/createOperator` | Cria um usuário Operador. |
| `PUT` | `/api/users/update/{id}` | Atualiza dados do usuário. |
| `PATCH` | `/api/users/{id}/status` | Ativa ou Inativa um usuário. |

### 🏢 Carrier Controller
Gerenciamento de empresas (Tenants).

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/carriers/listCarrier` | Lista todas as transportadoras (Admin). |
| `GET` | `/api/carriers/listCarrierActive` | Lista apenas transportadoras ativas. |
| `GET` | `/api/carriers/myCarrier` | Dados da transportadora do usuário logado. |
| `GET` | `/api/carriers/listCarrierById/{id}` | Busca uma transportadora pelo ID. |
| `POST` | `/api/carriers/createCarrier` | Cria uma nova transportadora. |
| `PUT` | `/api/carriers/updateCarrierById/{id}` | Atualiza dados da transportadora. |
| `PATCH` | `/api/carriers/{id}/status` | Ativa ou Inativa a transportadora. |

### 📜 Status History Controller
Auditoria e histórico.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/history/listHistoryByCarrier` | Histórico completo de mudanças da frota. |
| `DELETE` | `/api/history/deleteHistoryById/{id}` | Remove um registro de histórico. |

</details>

---
## 👥 Níveis de Acesso

| Nível     | Descrição               | Permissões Principais                                   |
|----------|-------------------------|----------------------------------------------------------|
| Admin    | Administrador Geral     | Criar transportadoras e gestores                         |
| Manager  | Gestor da Unidade       | Gerenciar frota, equipe e visualizar relatórios          |
| Operator | Operador Logístico      | Atualizar status de veículos e acompanhar viagens        |

---
## ⚙️ Instalação e Execução

### Pré-requisitos
- Node.js 18+
- JDK 21
- MySQL 8

### Passos
1. **Clone o repositório**
   ```bash
    git clone https://github.com/Gustasilvadev/LogiTrack-Gestao-Inteligente-de-Frotas.git

    npm install

    npm run dev
