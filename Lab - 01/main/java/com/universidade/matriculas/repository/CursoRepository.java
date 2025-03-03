package com.universidade.matriculas.repository;

import com.universidade.matriculas.model.Curso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CursoRepository extends JpaRepository<Curso, Long> {
}