package com.novatics.starsdeck.controller;

import com.novatics.starsdeck.entity.Membro;
import com.novatics.starsdeck.entity.MembroEvento;
import com.novatics.starsdeck.service.GenericService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/membro-evento")
public class MembroEventoController extends GenericRestController<MembroEvento, Long> {

    public MembroEventoController(GenericService<MembroEvento, Long> service) {
        super(service);
    }
}
