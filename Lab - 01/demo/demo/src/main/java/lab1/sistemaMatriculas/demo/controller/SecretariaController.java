package lab1.sistemaMatriculas.demo.controller;

import lab1.sistemaMatriculas.demo.model.Secretaria;
import lab1.sistemaMatriculas.demo.service.SecretariaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/secretarias")
public class SecretariaController {

    @Autowired
    private SecretariaService secretariaService;

    @GetMapping
    public ResponseEntity<List<Secretaria>> listarTodas() {
        List<Secretaria> secretarias = secretariaService.findAll();
        return ResponseEntity.ok(secretarias);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Secretaria>> buscarPorId(@PathVariable Long id) {
        Optional<Secretaria> secretaria = secretariaService.findById(id);
        return ResponseEntity.ok(secretaria);
    }

    @PostMapping
    public ResponseEntity<Secretaria> criar(@RequestBody Secretaria secretaria) {
        Secretaria novaSecretaria = secretariaService.create(secretaria);
        return ResponseEntity.ok(novaSecretaria);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Secretaria> atualizar(@PathVariable Long id, @RequestBody Secretaria secretaria) {
        secretaria.setId(id);
        Secretaria secretariaAtualizada = secretariaService.update(id, secretaria);
        return ResponseEntity.ok(secretariaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        secretariaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
