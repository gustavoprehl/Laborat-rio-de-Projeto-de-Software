package aluguelCarros.aluguelCarros.controller;

import aluguelCarros.aluguelCarros.model.Contrato;
import aluguelCarros.aluguelCarros.service.ContratoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contratos")
public class ContratoController {

    @Autowired
    private ContratoService contratoService;

    @PostMapping
    public ResponseEntity<Contrato> criarContrato(@RequestBody Contrato contrato) {
        Contrato novoContrato = contratoService.criarContrato(contrato);
        return ResponseEntity.ok(novoContrato);
    }

    @GetMapping
    public ResponseEntity<List<Contrato>> listarContratos() {
        List<Contrato> contratos = contratoService.listarContratos();
        return ResponseEntity.ok(contratos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contrato> buscarContratoPorId(@PathVariable Long id) {
        Optional<Contrato> contrato = contratoService.buscarContratoPorId(id);
        return contrato.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarContrato(@PathVariable Long id) {
        contratoService.deletarContrato(id);
        return ResponseEntity.noContent().build();
    }
}