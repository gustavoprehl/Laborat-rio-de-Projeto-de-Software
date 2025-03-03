package lab1.sistemaMatriculas.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lab1.sistemaMatriculas.demo.model.Aluno;
import lab1.sistemaMatriculas.demo.model.Disciplina;
import lab1.sistemaMatriculas.demo.model.Matricula;
import lab1.sistemaMatriculas.demo.repository.AlunoRepository;
import lab1.sistemaMatriculas.demo.repository.DisciplinaRepository;
import lab1.sistemaMatriculas.demo.repository.MatriculaRepository;
 

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