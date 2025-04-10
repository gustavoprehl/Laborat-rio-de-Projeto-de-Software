package aluguelCarros.aluguelCarros.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import aluguelCarros.aluguelCarros.model.Agente;
import aluguelCarros.aluguelCarros.repository.AgenteRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AgenteService {
    @Autowired
    private AgenteRepository agenteRepository;

    public List<Agente> listarTodos() {
        return agenteRepository.findAll();
    }

    public Optional<Agente> buscarPorId(Long id) {
        return agenteRepository.findById(id);
    }

    public Agente salvar(Agente agente) {
        return agenteRepository.save(agente);
    }

    public Agente atualizar(Long id, Agente agenteAtualizado) {
        return agenteRepository.findById(id).map(agente -> {
            agente.setNome(agenteAtualizado.getNome());
            agente.setTipo(agenteAtualizado.getTipo());
            return agenteRepository.save(agente);
        }).orElseThrow(() -> new RuntimeException("Agente não encontrado"));
    }

    public void deletar(Long id) {
        agenteRepository.deleteById(id);
    }
}
