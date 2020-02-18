package com.novatics.starsdeck.controller;

import com.novatics.starsdeck.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static java.util.Objects.isNull;

public abstract class GenericRestController<T, ID> {

    private Logger logger = LoggerFactory.getLogger(GenericRestController.class);

    private GenericService<T, ID> service;

    public GenericRestController(GenericService<T, ID> service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<T>> buscarTodos() {
        return new ResponseEntity<>(this.service.buscarTodos(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<T> buscaPorId(@PathVariable(name = "id") ID id) {
        T entity = this.service.buscaPorId(id);
        return  isNull(entity) ? ResponseEntity.notFound().build() : ResponseEntity.ok(entity);
    }

    @PostMapping
    public ResponseEntity<T> salvar(@Valid @RequestBody T entity, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }

        return new ResponseEntity<>(this.service.salvar(entity), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> remove(@PathVariable(name = "id") ID id) {
        T entity = this.service.buscaPorId(id);

        if (isNull(entity)) {
            return ResponseEntity.notFound().build();
        }

        this.service.deletar(id);
        return ResponseEntity.noContent().build();
    }

}
