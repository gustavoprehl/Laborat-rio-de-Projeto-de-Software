package lab1.sistemaMatriculas.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lab1.sistemaMatriculas.demo.model.Disciplina;
import lab1.sistemaMatriculas.demo.repository.DisciplinaRepository;

@Service
public class DisciplinaService {

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    public Disciplina findById(Long id) {
        return disciplinaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada! Id: " + id));
    }

    public List<Disciplina> findAll() {
        return disciplinaRepository.findAll();
    }

    @Transactional
    public Disciplina create(Disciplina disciplina) {
        disciplina.setId(null);
        return disciplinaRepository.save(disciplina);
    }

    @Transactional
    public Disciplina update(Disciplina disciplina) {
        Disciplina existingDisciplina = findById(disciplina.getId());
        existingDisciplina.setNome(disciplina.getNome());
        existingDisciplina.setMaxAlunos(disciplina.getMaxAlunos());
        return disciplinaRepository.save(existingDisciplina);
    }

    public void delete(Long id) {
        findById(id);
        try {
            disciplinaRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir a disciplina pois há entidades relacionadas.");
        }
    }
}