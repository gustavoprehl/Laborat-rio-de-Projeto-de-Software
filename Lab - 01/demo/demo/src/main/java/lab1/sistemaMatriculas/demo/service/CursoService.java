package lab1.sistemaMatriculas.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lab1.sistemaMatriculas.demo.model.Curso;
import lab1.sistemaMatriculas.demo.repository.CursoRepository;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    public Curso findById(Long id) {
        return cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado! Id: " + id));
    }

    public List<Curso> findAll() {
        return cursoRepository.findAll();
    }

    @Transactional
    public Curso create(Curso curso) {
        curso.setId(null);
        return cursoRepository.save(curso);
    }

    @Transactional
    public Curso update(Curso curso) {
        Curso existingCurso = findById(curso.getId());
        existingCurso.setNome(curso.getNome());
        existingCurso.setCreditos(curso.getCreditos());
        return cursoRepository.save(existingCurso);
    }

    public void delete(Long id) {
        findById(id);
        try {
            cursoRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não é possível excluir o curso pois há entidades relacionadas.");
        }
    }
}