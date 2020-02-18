package com.novatics.starsdeck.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity(name = "Membro")
public class Membro {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String nome;

    @NotNull
    private String email;

    @NotNull
    private String login;

    @NotNull
    private String senha;

    private String bio;

    @OneToMany(mappedBy="membro", orphanRemoval=true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<MembroEvento> eventos = new ArrayList<>();

    @Transient
    private Integer pontuacao;

    public Integer getPontuacao() {
        pontuacao = eventos.stream() //
                    .map(MembroEvento::getTipoEvento) //
                    .mapToInt(TipoEvento::getPontuacao) //
                    .sum();
        return pontuacao;
    }

    @Override
    public String toString() {
        return "Membro{" +
                "nome='" + nome + '\'' +
                '}';
    }
}
