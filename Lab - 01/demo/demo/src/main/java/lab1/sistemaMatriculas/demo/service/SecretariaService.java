package lab1.sistemaMatriculas.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lab1.sistemaMatriculas.demo.model.Disciplina;
import lab1.sistemaMatriculas.demo.model.Secretaria;
import lab1.sistemaMatriculas.demo.repository.SecretariaRepository;

@Service
public class SecretariaService {

    private final SecretariaRepository secretariaRepository;

    @Autowired
    public SecretariaService(SecretariaRepository secretariaRepository) {
        this.secretariaRepository = secretariaRepository;
    }

    public List<Secretaria> listarTodas() {
        return secretariaRepository.findAll();
    }

    public Optional<Secretaria> buscarPorId(Long id) {
        return secretariaRepository.findById(id);
    }

    public Secretaria salvar(Secretaria secretaria) {
        return secretariaRepository.save(secretaria);
    }

    public void remover(Long id) {
        secretariaRepository.deleteById(id);
    }
    
    // public void validarDisciplinas(List<Disciplina> disciplinas) {
    //     for (Disciplina disciplina : disciplinas) {
    //         if (disciplina.getAlunosMatriculados().size() < 3) {
    //             disciplina.setAtiva(false);
    //         } else {
    //             disciplina.setAtiva(true);
    //         }
    //     }
    // }
}