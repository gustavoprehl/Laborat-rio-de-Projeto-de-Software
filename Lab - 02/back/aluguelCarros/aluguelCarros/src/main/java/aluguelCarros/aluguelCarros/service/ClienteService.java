package aluguelCarros.aluguelCarros.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import aluguelCarros.aluguelCarros.model.Clientes;
import aluguelCarros.aluguelCarros.repository.ClienteRepository;

@Service
public class ClienteService {
    
    @Autowired  
    private ClienteRepository clienteRepository;

    public List<Clientes> listarClientes() {
        return clienteRepository.findAll();
    }

    public Clientes buscarClientes(Long id) {
        Optional<Clientes> cliente = clienteRepository.findById(id);
        return cliente.orElse(null);
    }

    public Clientes salvarClientes(Clientes cliente) {
        return clienteRepository.save(cliente);
    }

    public Clientes atualizarClientes(Long id, Clientes clienteAtualizado) {
        
        clienteAtualizado.setId(id.intValue());
        return clienteRepository.save(clienteAtualizado);
    }

    public void deletarClientes(Long id) {
        clienteRepository.deleteById(id);
    }
}

