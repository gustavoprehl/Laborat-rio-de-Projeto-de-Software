package aluguelCarros.aluguelCarros.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import aluguelCarros.aluguelCarros.model.Automovel;
import aluguelCarros.aluguelCarros.repository.AutomovelRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AutomovelService {
    @Autowired
    private AutomovelRepository automovelRepository;

    public List<Automovel> listarTodos() {
        return automovelRepository.findAll();
    }

    public Optional<Automovel> buscarPorId(Long id) {
        return automovelRepository.findById(id);
    }

    public Automovel salvar(Automovel automovel) {
        return automovelRepository.save(automovel);
    }

    public Automovel atualizar(Long id, Automovel automovelAtualizado) {
        return automovelRepository.findById(id).map(automovel -> {
            automovel.setModelo(automovelAtualizado.getModelo());
            automovel.setMarca(automovelAtualizado.getMarca());
            automovel.setAno(automovelAtualizado.getAno());
            automovel.setPlaca(automovelAtualizado.getPlaca());
            return automovelRepository.save(automovel);
        }).orElseThrow(() -> new RuntimeException("Automóvel não encontrado"));
    }

    public void deletar(Long id) {
        automovelRepository.deleteById(id);
    }
}