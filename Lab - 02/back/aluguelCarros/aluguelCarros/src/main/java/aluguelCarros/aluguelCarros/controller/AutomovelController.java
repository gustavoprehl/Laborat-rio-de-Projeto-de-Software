package aluguelCarros.aluguelCarros.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import aluguelCarros.aluguelCarros.model.Automovel;
import aluguelCarros.aluguelCarros.service.AutomovelService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/automoveis")
public class AutomovelController {

    @Autowired
    private AutomovelService automovelService;

    @GetMapping("/listarAutomoveis")
    public List<Automovel> listarTodos() {
        return automovelService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Automovel> buscarPorId(@PathVariable Long id) {
        Optional<Automovel> automovel = automovelService.buscarPorId(id);
        return automovel.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/salvar")
    public Automovel salvar(@RequestBody Automovel automovel) {
        return automovelService.salvar(automovel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Automovel> atualizar(@PathVariable Long id, @RequestBody Automovel automovelAtualizado) {
        try {
            Automovel automovel = automovelService.atualizar(id, automovelAtualizado);
            return ResponseEntity.ok(automovel);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        try {
            automovelService.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}