document.addEventListener("DOMContentLoaded", function () {
    window.login = async function () {
        const email = document.getElementById("email").value;
        const senha = document.getElementById("password").value;
        const tipoCliente = document.getElementById("tipoCliente").value;

        const loginData = {
            login: email,
            senha: senha,
            tipo: tipoCliente
        };

        console.log("Dados de login enviados:", loginData);

        try {
            const response = await fetch("http://localhost:8080/permissao/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                throw new Error("Erro ao fazer login");
            }

            const data = await response.json();

            console.log("Resposta do servidor:", data); 

           
            if (data) {
                localStorage.setItem("tipoCliente", data);
                window.location.href = "pedidos.html";
            } else {
                alert("Erro: Tipo de cliente não retornado!");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Falha no login. Verifique suas credenciais.");
        }
    };
});
