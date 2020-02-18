package com.novatics.starsdeck.repository;

import com.novatics.starsdeck.entity.TipoEvento;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoEventoRepository extends CrudRepository<TipoEvento, Long> {

}
