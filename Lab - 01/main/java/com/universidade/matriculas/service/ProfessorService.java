package com.universidade.matriculas.service;

import com.universidade.matriculas.model.Professor;
import com.universidade.matriculas.repository.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    public Professor findById(Long id) {
        return professorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado! Id: " + id));
    }

    public List<Professor> findAll() {
        return professorRepository.findAll();
    }

    @Transactional
    public Professor create(Professor professor) {
        professor.setId(null);
        return professorRepository.save(professor);
    }

    @Transactional
    public Professor update(Professor professor) {
        Professor existingProfessor = findById(professor.getId());
        existingProfessor.setNome(professor.getNome());
        existingProfessor.setEmail(professor.getEmail());
        return professorRepository.save(existingProfessor);
    }

    public void delete(Long id) {
        findById(id);
        try {
            professorRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir o professor pois há entidades relacionadas.");
        }
    }
}