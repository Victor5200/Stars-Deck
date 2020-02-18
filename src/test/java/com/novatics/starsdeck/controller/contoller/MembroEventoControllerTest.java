package com.novatics.starsdeck.controller.contoller;

import com.novatics.starsdeck.entity.MembroEvento;
import com.novatics.starsdeck.repository.MembroEventoRepository;
import com.novatics.starsdeck.repository.MembroRepository;
import com.novatics.starsdeck.repository.TipoEventoRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class MembroEventoControllerTest {

    public static final String API_MEMBRO_EVENTO = "/api/membro-evento";

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private MembroRepository membroRepository;

    @Autowired
    private TipoEventoRepository tipoEventoRepository;

    @Autowired
    private MembroEventoRepository membroEventoRepository;

    @After
    public void limpaBanco(){
        //this.membroRepository.deleteAll();
    }

    @Test
    public void deveSalvarUmNovoMembro() {
        MembroEvento membroEvento = new MembroEvento();
        membroEvento.setDataEvento(LocalDate.now());
        membroEvento.setTituloEvento("The Developer´s Conference");
        membroEvento.setMembro(membroRepository.findById(1l).get());
        membroEvento.setTipoEvento(tipoEventoRepository.findById(1l).get());
        ResponseEntity<MembroEvento> response = restTemplate.exchange(API_MEMBRO_EVENTO,
                                                                HttpMethod.POST,
                                                                new HttpEntity<>(membroEvento),
                                                                MembroEvento.class);
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
    }
}


