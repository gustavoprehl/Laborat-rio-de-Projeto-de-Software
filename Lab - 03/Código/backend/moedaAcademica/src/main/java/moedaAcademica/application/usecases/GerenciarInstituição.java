package moedaAcademica.application.usecases;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.stereotype.Service;

import moedaAcademica.domain.model.Instituicao;
import moedaAcademica.infrastructure.persistence.InstituicaoRepository;


@Service
public class GerenciarInstituição {
    @Autowired
    private InstituicaoRepository instituicaoRepository;
    public GerenciarInstituição(InstituicaoRepository instituicaoRepository) {
        this.instituicaoRepository = instituicaoRepository;
    }
    public boolean adicionarInstituição(String nome) {
        Instituicao instituicao = new Instituicao();
        instituicao.setNome(nome);
        instituicaoRepository.save(instituicao);
        return true;
    }
    public boolean atualizarInstituição(String nome) {
        Instituicao instituicao = instituicaoRepository.findByNome(nome);
        if (instituicao == null) return false;
        instituicao.setNome(nome);
        instituicaoRepository.save(instituicao);
        return true;
    }
    public boolean deletarInstituição(int id) {
        Instituicao instituicao = instituicaoRepository.findById(id).orElse(null);
        if (instituicao == null) return false;
        instituicaoRepository.delete(instituicao);
        return true;
    }
    public List<Instituicao> listarInstituições() {
        return instituicaoRepository.findAll();
    }
    public Instituicao buscarInstituiçãoPorId(int id) {
        return instituicaoRepository.findById(id).orElse(null);
    }
}
