package com.novatics.starsdeck.controller.contoller;

import java.util.List;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.novatics.starsdeck.entity.TipoEvento;
import com.novatics.starsdeck.repository.TipoEventoRepository;


import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class TipoEventoControllerTest {

    public static final String API_TIPO_EVENTO = "/api/tipo-evento";

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private TipoEventoRepository tipoEventoRepository;

    @After
    public void limpaBanco(){
        //this.tipoEventoRepository.deleteAll();
    }

    @Test
    public void deveSalvarUmNovoTipoEvento() {
        TipoEvento tipoEvento = new TipoEvento(null, "Participação de encontro", 1);
        ResponseEntity<TipoEvento> response = restTemplate.exchange(API_TIPO_EVENTO,
                                                                    HttpMethod.POST,
                                                                    new HttpEntity<>(tipoEvento),
                                                                    TipoEvento.class);
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void deveBuscarTodosOsTipoEventos() {
        ParameterizedTypeReference<List<TipoEvento>> responseType = new ParameterizedTypeReference<List<TipoEvento>>() {};
        ResponseEntity<List<TipoEvento>> response = restTemplate.exchange(API_TIPO_EVENTO,
                                                                        HttpMethod.GET,
                                                                        null,
                                                                        responseType);
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
    }
}


