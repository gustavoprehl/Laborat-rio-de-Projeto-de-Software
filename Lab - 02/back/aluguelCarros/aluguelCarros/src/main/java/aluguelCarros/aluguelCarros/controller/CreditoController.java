package aluguelCarros.aluguelCarros.controller;

import aluguelCarros.aluguelCarros.model.Credito;
import aluguelCarros.aluguelCarros.service.CreditoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/creditos")
public class CreditoController {

    @Autowired
    private CreditoService creditoService;

    @PostMapping
    public ResponseEntity<Credito> criarCredito(@RequestBody Credito credito) {
        Credito novoCredito = creditoService.criarCredito(credito);
        return ResponseEntity.ok(novoCredito);
    }

    @GetMapping
    public ResponseEntity<List<Credito>> listarCreditos() {
        List<Credito> creditos = creditoService.listarCreditos();
        return ResponseEntity.ok(creditos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Credito> buscarCreditoPorId(@PathVariable Long id) {
        Optional<Credito> credito = creditoService.buscarCreditoPorId(id);
        return credito.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarCredito(@PathVariable Long id) {
        creditoService.deletarCredito(id);
        return ResponseEntity.noContent().build();
    }
}