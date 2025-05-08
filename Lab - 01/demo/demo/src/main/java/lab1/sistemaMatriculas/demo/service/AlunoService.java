package lab1.sistemaMatriculas.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lab1.sistemaMatriculas.demo.model.Aluno;
import lab1.sistemaMatriculas.demo.repository.AlunoRepository;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    public Aluno findById(Long id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado! Id: " + id));
    }

    public List<Aluno> findAll() {
        return alunoRepository.findAll();
    }

    @Transactional
    public Aluno create(Aluno aluno) {
        aluno.setId(null);
        return alunoRepository.save(aluno);
    }

    @Transactional
    public Aluno update(Aluno aluno) {
        Aluno existingAluno = findById(aluno.getId());
        existingAluno.setNome(aluno.getNome());
        existingAluno.setEmail(aluno.getEmail());
        return alunoRepository.save(existingAluno);
    }

    public void delete(Long id) {
        findById(id);
        try {
            alunoRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir o aluno pois há entidades relacionadas.");
        }
    }
}