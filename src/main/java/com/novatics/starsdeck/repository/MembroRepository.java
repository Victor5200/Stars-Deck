package com.novatics.starsdeck.repository;

import com.novatics.starsdeck.entity.Membro;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembroRepository extends CrudRepository<Membro, Long> {

}
