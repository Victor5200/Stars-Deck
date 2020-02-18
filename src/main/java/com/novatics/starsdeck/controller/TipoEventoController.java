package com.novatics.starsdeck.controller;

import com.novatics.starsdeck.entity.MembroEvento;
import com.novatics.starsdeck.entity.TipoEvento;
import com.novatics.starsdeck.service.GenericService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/tipo-evento")
public class TipoEventoController extends GenericRestController<TipoEvento, Long> {

    public TipoEventoController(GenericService<TipoEvento, Long> service) {
        super(service);
    }
}
