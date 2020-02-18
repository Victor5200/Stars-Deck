package com.novatics.starsdeck.controller.contoller;

import com.novatics.starsdeck.entity.Membro;
import com.novatics.starsdeck.entity.TipoEvento;
import com.novatics.starsdeck.repository.MembroRepository;
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

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class MembroControllerTest {

    public static final String API_MEMBRO = "/api/membro";

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private MembroRepository membroRepository;

    @After
    public void limpaBanco(){
        //this.membroRepository.deleteAll();
    }

    @Test
    public void deveSalvarUmNovoMembro() {
        Membro membro = new Membro();
        membro.setNome("Victor Alexsander");
        membro.setEmail("valexsander@gmail.com");
        membro.setLogin("valexsander");
        membro.setSenha("12345678");
        ResponseEntity<Membro> response = restTemplate.exchange(API_MEMBRO,
                                                                HttpMethod.POST,
                                                                new HttpEntity<>(membro),
                                                                Membro.class);
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
    }

    @Test
    public void deveBuscarTodosOsMembros() {
        ParameterizedTypeReference<List<Membro>> responseType = new ParameterizedTypeReference<List<Membro>>() {};
        ResponseEntity<List<Membro>> response = restTemplate.exchange(API_MEMBRO,
                                                HttpMethod.GET,
                                                null,
                                                responseType);
        assertThat(response.getStatusCodeValue()).isEqualTo(200);
        assertThat(response.getBody()).isNotNull();
    }
}


