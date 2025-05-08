package lab1.sistemaMatriculas.demo.controller;

import lab1.sistemaMatriculas.demo.model.Aluno;
import lab1.sistemaMatriculas.demo.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    public ResponseEntity<List<Aluno>> listarTodos() {
        List<Aluno> alunos = alunoService.findAll();
        return ResponseEntity.ok(alunos);
    }

    @GetMapping("login/{id}")
    public ResponseEntity<Aluno> buscarPorId(@PathVariable Long id) {
        Aluno aluno = alunoService.findById(id);
        return ResponseEntity.ok(aluno);
    }

    @PostMapping
    public ResponseEntity<Aluno> criar(@RequestBody Aluno aluno) {
        Aluno novoAluno = alunoService.create(aluno);
        return ResponseEntity.ok(novoAluno);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> atualizar(@PathVariable Long id, @RequestBody Aluno aluno) {
        aluno.setId(id);
        Aluno alunoAtualizado = alunoService.update(aluno);
        return ResponseEntity.ok(alunoAtualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        alunoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
