package com.novatics.starsdeck.repository;

import com.novatics.starsdeck.entity.MembroEvento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembroEventoRepository extends CrudRepository<MembroEvento, Long> {

}
