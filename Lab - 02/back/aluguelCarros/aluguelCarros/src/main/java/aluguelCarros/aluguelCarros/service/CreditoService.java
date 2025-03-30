package aluguelCarros.aluguelCarros.service;

import aluguelCarros.aluguelCarros.model.Credito;
import aluguelCarros.aluguelCarros.repository.CreditoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CreditoService {

    @Autowired
    private CreditoRepository creditoRepository;

    public Credito criarCredito(Credito credito) {
        return creditoRepository.save(credito);
    }

    public List<Credito> listarCreditos() {
        return creditoRepository.findAll();
    }

    public Optional<Credito> buscarCreditoPorId(Long id) {
        return creditoRepository.findById(id);
    }

    public void deletarCredito(Long id) {
        creditoRepository.deleteById(id);
    }
}