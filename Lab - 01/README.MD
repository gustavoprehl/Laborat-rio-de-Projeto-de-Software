 **🎓 Sistema de Matrículas - Universidade**

  **🎯 Visão Geral**

    Este projeto visa informatizar o Sistema de Matrículas de uma universidade, proporcionando um gerenciamento eficiente  
    e automatizado de cursos, disciplinas, alunos e professores. O sistema permitirá a matrícula em  disciplinas obrigatórias  
    e optativas, cancelamento de matrículas, consulta de informações  acadêmicas e integração com o sistema de cobrança da  
    instituição.  


  **🚀 Funcionalidades Principais**

    **1. Cadastro e Autenticação** 
      - Cadastro e login de usuários (alunos, professores e secretaria) com validação de senha;
      - Controle de acesso baseado no perfil do usuário (aluno, professor, secretaria).

    **2. Matrícula em Disciplinas** 
      - Matrícula em até 4 disciplinas obrigatórias e 2 disciplinas optativas por semestre;
      - Verificação automática de disponibilidade de vagas (máximo de 60 alunos por disciplina);
      - Cancelamento de matrículas durante o período permitido.

    **3. Gestão de Disciplinas e Cursos**
      - Ativação ou cancelamento de disciplinas com base no número mínimo de matrículas (3 alunos);
      - Criação e gerenciamento de cursos, disciplinas e currículos pela secretaria.

    **4. Consultas e Relatórios**
      - Consulta de disciplinas matriculadas pelos alunos;
      - Visualização da lista de alunos matriculados por disciplina para professores;
      - Relatórios de matrículas ativas e canceladas para a secretaria.

    **5. Integração com Sistema de Cobrança**
      - Notificação automática ao sistema de cobrança após a confirmação de matrícula.

  **👥 Atores do Sistema**

    **1. Aluno**
      - Realiza matrícula em disciplinas obrigatórias e optativas;
      - Cancela matrículas dentro do período permitido;
      - Consulta disciplinas matriculadas e informações acadêmicas.

    **2. Professor**
      - Acessa a lista de alunos matriculados em suas disciplinas;
      - Consulta informações sobre as disciplinas que leciona.

    **3. Secretaria**
      - Gerencia cursos, disciplinas e currículos;
      - Ativa ou cancela disciplinas com base no número de matrículas;
      - Mantém o sistema atualizado com as informações acadêmicas.

    **4. Sistema de cobrança**
      Recebe notificações automáticas de matrículas para processar cobranças.

  **📊 Modelos UML**

    - **Diagrama de Casos de Uso:** [Ver Diagrama] (https://github.com/gustavoprehl/Laborat-rio-de-Projeto-de-Software/blob/main/Lab%20-%2001/Diagrama%20de%20caso%20de%20uso.png) 
    - **Diagrama de Classes:** [Ver Diagrama]

  **📜 Histórias de Usuário**

    **1. Aluno**
      Como aluno, quero fazer login no sistema para acessar minhas informações acadêmicas;
      Como aluno, quero me matricular em até 4 disciplinas obrigatórias e 2 optativas para planejar meu semestre;
      Como aluno, quero cancelar disciplinas caso precise ajustar minha carga horária;
      Como aluno, quero consultar minhas disciplinas matriculadas para acompanhar meu cronograma;

    **2. Professor**
      Como professor, quero fazer login no sistema para acessar informações das minhas disciplinas;
      Como professor, quero consultar a lista de alunos matriculados em minhas disciplinas para organizar minhas aulas.

    **3. Secretaria**
      Como membro da secretaria, quero fazer login no sistema para gerenciar informações acadêmicas;
      Como membro da secretaria, quero criar e gerenciar cursos e disciplinas para manter o currículo atualizado;
      Como membro da secretaria, quero ativar ou cancelar disciplinas com base no número de matrículas para otimizar a oferta de cursos.

    **4. Sistema de cobrança**
      Como sistema de cobrança, quero ser notificado automaticamente após a matrícula de um aluno para processar a cobrança das disciplinas.

  <u>**🖥️ Estrutura de classes**</u>

        src/
          ├── main/
          │   ├── java/com/universidade/matriculas/
          │   │    ├── SistemaMatriculasApplication.java
          │   │    ├── config/
          │   │    │      └── SecurityConfig.java
          │   │    ├── controller/
          │   │    │      ├── AlunoController.java
          │   │    │      ├── ProfessorController.java
          │   │    │      ├── SecretariaController.java
          │   │    │      ├── CursoController.java
          │   │    │      ├── DisciplinaController.java
          │   │    │      └── PermissoesController.java
          │   │    ├── model/
          │   │    │      ├── Aluno.java
          │   │    │      ├── Professor.java
          │   │    │      ├── Secretaria.java
          │   │    │      ├── Curso.java
          │   │    │      ├── Disciplina.java
          │   │    │      ├── Matricula.java
          │   │    │      ├── Usuario.java
          │   │    │     
          │   │    ├── repository/
          │   │    │      ├── AlunoRepository.java
          │   │    │      ├── ProfessorRepository.java
          │   │    │      ├── SecretariaRepository.java
          │   │    │      ├── CursoRepository.java
          │   │    │      ├── DisciplinaRepository.java
          │   │    │      ├── MatriculaRepository.java
          │   │    │      └── PermissoesRepository.java 
          │   │    ├── service/
          │   │    │      ├── AlunoService.java
          │   │    │      ├── ProfessorService.java
          │   │    │      ├── SecretariaService.java
          │   │    │      ├── CursoService.java
          │   │    │      ├── DisciplinaService.java
          │   │    │      ├── MatriculaService.java
          │   │    │      └── PermissoesService.java
          │   │    ├── enum/
          │   │    │      └── ProfileEnum.java   
          │   │    ├── dto/
          │   │    │      └── LoginDTO.java     
          │   │    └── resources/
          │   │          ├── application.properties
          │   │          └── data.sql
          └── webapp/
              └── angular/
                     ├── src/
                     │    ├── app/
                     │    │    ├── components/
                     │    │    │      ├── aluno/
                     │    │    │      │      ├── aluno-lista/
                     │    │    │      │      │      └── aluno-lista.component.ts
                     │    │    │      │      ├── aluno-cadastro/
                     │    │    │      │      │      └── aluno-cadastro.component.ts
                     │    │    │      │      └── aluno-detalhe/
                     │    │    │      │             └── aluno-detalhe.component.ts
                     │    │    │      ├── disciplina/
                     │    │    │      │      ├── disciplina-lista/
                     │    │    │      │      │      └── disciplina-lista.component.ts
                     │    │    │      │      └── disciplina-cadastro/
                     │    │    │      │             └── disciplina-cadastro.component.ts
                     │    │    │      └── autenticacao/
                     │    │    │             ├── login/
                     │    │    │             │      └── login.component.ts
                     │    │    │             └── cadastro/
                     │    │    │                    └── cadastro.component.ts
                     │    │    ├── services/
                     │    │    │      ├── aluno.service.ts
                     │    │    │      ├── disciplina.service.ts
                     │    │    │      └── auth.service.ts
                     │    │    └── app.module.ts
                     │    └── index.html
                     └── angular.json

  <u>**🖥️ Arquitetura do sistema**</u>

     Arquitetura do Sistema de Matrículas Universitárias
Este projeto segue a arquitetura MVC (Model-View-Controller) dentro de uma arquitetura em camadas, combinando Spring Boot (back-end) e Angular (front-end) para fornecer uma API REST robusta e uma interface interativa para os usuários.

    🔹 Camadas do Back-End (Spring Boot)
       1️⃣ Model (Modelos de Dados) 
          🏛️ Representa as entidades do sistema (Aluno, Professor, Curso, Disciplina, Matricula, Usuario).
              Usa JPA/Hibernate para persistência no banco de dados.
              Localizado em model/.

       2️⃣ Repository (Repositórios) 
          🗄️Responsável pela comunicação com o banco de dados.
             Usa Spring Data JPA para CRUD automático.
             Exemplo: AlunoRepository extends JpaRepository<Aluno, Long>.
             Localizado em repository/.

       3️⃣ Service (Serviços) 
          ⚙️Contém a lógica de negócio do sistema.
             Exemplo: MatriculaService gerencia as regras para matrícula dos alunos.
             Localizado em service/.

       4️⃣ Controller (Controladores REST) 
          🎮Exponibiliza os endpoints REST para o frontend e sistemas externos.
            Exemplo: AlunoController define operações como GET /alunos, POST /alunos, etc.
            Localizado em controller/.

       5️⃣ Config (Configuração de Segurança) 
          🔒Define a configuração de Spring Security e JWT para autenticação e autorização.
            Exemplo: SecurityConfig.java gerencia permissões de acesso.
            Localizado em config/.

       6️⃣ Enum (Enums para perfis de usuário) 
         🔄Define os tipos de perfis disponíveis, como aluno, professor e administrador.
            Exemplo: ProfileEnum.java.
            Localizado em enum/.

       7️⃣ DTO (Data Transfer Objects)
          📦Contém classes usadas para transferência de dados entre front-end e back-end.
             Exemplo: LoginDTO.java para autenticação de usuários.
             Localizado em dto/.

       8️⃣ Resources (Configuração da Aplicação)
          ⚙️Contém arquivos de configuração, como application.properties para definir conexão com o banco de dados e segurança.
             Localizado em resources/.


  **Requisitos Técnicos**

    **Linguagem de Programação**
      - Java Spring Boot (back-end);
      - Angular (front-end);
      - MySql.
    
    **Modelagem**
      - Diagrama UML (Casos de Uso).

    **Versionamento e Documentação**
      - Repositório no GitHub com versionamento e documentação atualizada.

    **Ferramentas**
      - Ferramentas de modelagem UML (ex: Lucidchart, Figma).
      - Ambiente de desenvolvimento integrado (IDE) para Java (ex: IntelliJ, Eclipse).

  **🔗 Contribuição**

    **Desenvolvedores**
      
      - Gustavo Azi Prehl Gama
      - Guilherme Henrique da Silveira
    
    **Repositório**
      - Link para o repositório
