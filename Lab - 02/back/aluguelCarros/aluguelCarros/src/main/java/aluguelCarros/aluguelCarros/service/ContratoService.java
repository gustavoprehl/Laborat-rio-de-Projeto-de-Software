package aluguelCarros.aluguelCarros.service;

import aluguelCarros.aluguelCarros.model.Contrato;
import aluguelCarros.aluguelCarros.repository.ContratoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContratoService {

    @Autowired
    private ContratoRepository contratoRepository;

    public Contrato criarContrato(Contrato contrato) {
        return contratoRepository.save(contrato);
    }

    public List<Contrato> listarContratos() {
        return contratoRepository.findAll();
    }

    public Optional<Contrato> buscarContratoPorId(Long id) {
        return contratoRepository.findById(id);
    }

    public void deletarContrato(Long id) {
        contratoRepository.deleteById(id);
    }
}