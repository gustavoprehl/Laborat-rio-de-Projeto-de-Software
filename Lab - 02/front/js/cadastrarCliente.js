const API_URL = 'http://localhost:8080/clientes';

function listarClientes() {
    fetch(`${API_URL}/listarClientes`)
        .then(response => response.json())
        .then(clientes => {
            const tabela = document.getElementById('clientesTable');
            tabela.innerHTML = '';
            clientes.forEach(cliente => {
                tabela.innerHTML += `
                    <tr>
                        <td>${cliente.nome}</td>
                        <td>${cliente.identificacao}</td>
                        <td>${cliente.tipo}</td>
                        <td>
                            <button onclick="editarCliente(${cliente.id})">Editar</button>
                            <button onclick="deletarCliente(${cliente.id})">Excluir</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function adicionarCliente() {
    const nome = document.getElementById('nome').value;
    const identificacao = document.getElementById('identificador').value;
    const tipo = document.getElementById('tipo').value;

    fetch(`${API_URL}/salvarCliente`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, identificacao, tipo })
    }).then(() => listarClientes());
}

function deletarCliente(id) {
    fetch(`${API_URL}/deletarCliente/${id}`, { method: 'DELETE' })
        .then(() => listarClientes());
}

listarClientes();