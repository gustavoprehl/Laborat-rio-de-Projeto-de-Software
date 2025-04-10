document.addEventListener("DOMContentLoaded", () => {
    carregarClientes();
    carregarAutomoveis();

    document.getElementById("pedidoForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        await salvarPedido();
    });
});

async function carregarClientes() {
    try {
        const response = await fetch("http://localhost:8080/clientes/listarClientes");
        const clientes = await response.json();
        const selectCliente = document.getElementById("cliente");
        selectCliente.innerHTML = '<option value="">Selecione um cliente</option>';
        clientes.forEach(cliente => {
            const option = document.createElement("option");
            option.value = cliente.id;
            option.textContent = cliente.nome;
            selectCliente.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}

async function carregarAutomoveis() {
    try {
        const response = await fetch("http://localhost:8080/automoveis/listarAutomoveis");
        const automoveis = await response.json();
        const selectAutomovel = document.getElementById("automovel");
        selectAutomovel.innerHTML = '<option value="">Selecione um automóvel</option>';
        automoveis.forEach(automovel => {
            const option = document.createElement("option");
            option.value = automovel.id;
            option.textContent = `${automovel.marca} ${automovel.modelo} - ${automovel.ano}`;
            selectAutomovel.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar automóveis:", error);
    }
}

async function salvarPedido() {
    const pedido = {
        cliente: { id: document.getElementById("cliente").value },
        automovel: { id: document.getElementById("automovel").value },
        dataInicio: document.getElementById("dataInicio").value,
        dataFim: document.getElementById("dataFim").value,
        status: "Novo"
    };

    try {
        const response = await fetch("http://localhost:8080/pedidos/salvar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedido)
        });

        if (response.ok) {
            alert("Pedido salvo com sucesso!");
            window.location.href = "pedidos.html";
        } else {
            const errorData = await response.json();
            alert("Erro ao salvar pedido: " + (errorData.message || "Erro desconhecido"));
        }
    } catch (error) {
        console.error("Erro ao salvar pedido:", error);
        alert("Erro ao salvar pedido. Verifique o console para mais detalhes.");
    }
}
