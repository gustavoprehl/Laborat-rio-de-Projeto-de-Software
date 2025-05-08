package moedaAcademica.application.usecases;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.Getter;
import lombok.Setter;
import moedaAcademica.domain.model.Vantagem;
import moedaAcademica.infrastructure.persistence.VantagemRepository;
import java.util.List;

@Setter
@Getter
@Service
public class GerenciarVantagens {
    @Autowired
    private VantagemRepository vantagemRepository;


    public GerenciarVantagens(VantagemRepository vantagemRepository) {
    this.vantagemRepository = vantagemRepository;
}
    public void adicionarVantagem(Vantagem vantagem) {
        vantagemRepository.save(vantagem);
    }
    public void removerVantagem(int id) {
        vantagemRepository.deleteById(id);
    }
    public Vantagem buscarVantagem(int id) {
        return vantagemRepository.findById(id).orElse(null);
    }
    public void atualizarVantagem(Vantagem vantagem) {
        vantagemRepository.save(vantagem); 
    }
    public List<Vantagem> listarVantagens() {
        return vantagemRepository.findAll();
    }
    

}
