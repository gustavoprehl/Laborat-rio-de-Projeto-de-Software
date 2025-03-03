package com.universidade.matriculas.service;

import com.universidade.matriculas.model.Matricula;
import com.universidade.matriculas.model.Aluno;
import com.universidade.matriculas.model.Disciplina;
import com.universidade.matriculas.repository.MatriculaRepository;
import com.universidade.matriculas.repository.AlunoRepository;
import com.universidade.matriculas.repository.DisciplinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MatriculaService {

    @Autowired
    private MatriculaRepository matriculaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    public Matricula findById(Long id) {
        return matriculaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Matrícula não encontrada! Id: " + id));
    }

    public List<Matricula> findAll() {
        return matriculaRepository.findAll();
    }

    @Transactional
    public Matricula create(Long alunoId, Long disciplinaId) {
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado! Id: " + alunoId));

        Disciplina disciplina = disciplinaRepository.findById(disciplinaId)
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada! Id: " + disciplinaId));

        if (disciplina.getAlunos().size() >= disciplina.getMaxAlunos()) {
            throw new RuntimeException("A disciplina já atingiu o limite máximo de alunos.");
        }

        Matricula matricula = new Matricula();
        matricula.setAluno(aluno);
        matricula.setDisciplina(disciplina);

        return matriculaRepository.save(matricula);
    }

    @Transactional
    public void delete(Long id) {
        findById(id);
        try {
            matriculaRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir a matrícula pois há entidades relacionadas.");
        }
    }
}