package com.novatics.starsdeck.controller;

import com.novatics.starsdeck.entity.Membro;
import com.novatics.starsdeck.service.GenericService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/membro")
public class MembroController extends GenericRestController<Membro, Long> {

    public MembroController(GenericService<Membro, Long> service) {
        super(service);
    }
}
