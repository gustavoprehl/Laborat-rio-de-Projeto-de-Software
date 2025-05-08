package lab1.sistemaMatriculas.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lab1.sistemaMatriculas.demo.model.Secretaria;
import lab1.sistemaMatriculas.demo.repository.SecretariaRepository;

@Service
public class SecretariaService {

    private final SecretariaRepository secretariaRepository;

    @Autowired
    public SecretariaService(SecretariaRepository secretariaRepository) {
        this.secretariaRepository = secretariaRepository;
    }

    public List<Secretaria> findAll() {
        return secretariaRepository.findAll();
    }

    public Optional<Secretaria> findById(Long id) {
        return secretariaRepository.findById(id);
    }

    public Secretaria create(Secretaria secretaria) {
        secretaria.setId(null);
        return secretariaRepository.save(secretaria);
    }

    public Secretaria update(Long id, Secretaria secretaria) {
        Optional<Secretaria> existingSecretaria = secretariaRepository.findById(id);
        if (existingSecretaria.isPresent()) {
            Secretaria updatedSecretaria = existingSecretaria.get();
            updatedSecretaria.setNome(secretaria.getNome());
            return secretariaRepository.save(updatedSecretaria);
        } else {
            throw new RuntimeException("Secretaria não encontrada! Id: " + id);
        }
    }

    public void delete(Long id) {
        secretariaRepository.deleteById(id);
    }
}
