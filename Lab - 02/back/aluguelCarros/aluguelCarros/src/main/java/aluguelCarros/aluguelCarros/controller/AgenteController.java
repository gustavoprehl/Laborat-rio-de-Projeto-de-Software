package aluguelCarros.aluguelCarros.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import aluguelCarros.aluguelCarros.model.Agente;
import aluguelCarros.aluguelCarros.service.AgenteService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/agentes")
public class AgenteController {
    @Autowired
    private AgenteService agenteService;

    @GetMapping
    public List<Agente> listarTodos() {
        return agenteService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agente> buscarPorId(@PathVariable Long id) {
        Optional<Agente> agente = agenteService.buscarPorId(id);
        return agente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Agente salvar(@RequestBody Agente agente) {
        return agenteService.salvar(agente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Agente> atualizar(@PathVariable Long id, @RequestBody Agente agenteAtualizado) {
        try {
            Agente agente = agenteService.atualizar(id, agenteAtualizado);
            return ResponseEntity.ok(agente);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        agenteService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}