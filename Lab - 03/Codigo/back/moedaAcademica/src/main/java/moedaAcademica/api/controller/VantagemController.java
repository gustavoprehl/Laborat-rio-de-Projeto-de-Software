package moedaAcademica.api.controller;

import moedaAcademica.application.usecases.GerenciarVantagens;
import moedaAcademica.domain.model.Vantagem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vantagens")
public class VantagemController {
    @Autowired
    private final GerenciarVantagens gerenciarVantagens;


    public VantagemController(GerenciarVantagens gerenciarVantagens) {
        this.gerenciarVantagens = gerenciarVantagens;
    }

    @PostMapping
    public ResponseEntity<Vantagem> adicionar(@RequestBody Vantagem vantagem) {
        gerenciarVantagens.adicionarVantagem(vantagem);
        return ResponseEntity.ok(vantagem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vantagem> atualizar(@PathVariable int id, @RequestBody Vantagem vantagem) {
        vantagem.setId(id);
        gerenciarVantagens.atualizarVantagem(vantagem);
        return ResponseEntity.ok(vantagem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable int id) {
        gerenciarVantagens.removerVantagem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vantagem> buscar(@PathVariable int id) {
        Vantagem v = gerenciarVantagens.buscarVantagem(id);
        if (v == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(v);
    }

    @GetMapping
    public ResponseEntity<List<Vantagem>> listar() {
        return ResponseEntity.ok(gerenciarVantagens.listarVantagens());
    }
}