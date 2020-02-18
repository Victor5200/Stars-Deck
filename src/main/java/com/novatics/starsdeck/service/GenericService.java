package com.novatics.starsdeck.service;

import java.io.Serializable;
import java.util.List;

public interface GenericService<T, Key> {
    List<T> buscarTodos();
    T buscaPorId(Key id);
    T salvar(T entity);
    void deletar(Key id);
}
