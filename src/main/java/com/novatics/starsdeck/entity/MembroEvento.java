package com.novatics.starsdeck.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity(name = "MembroEvento")
public class MembroEvento {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String tituloEvento;

    private LocalDate dataEvento;

    private String comentario;

    @NotNull
    @ManyToOne
    @JsonBackReference
    private Membro membro;

    @NotNull
    @ManyToOne
    private TipoEvento tipoEvento;

    public MembroEvento(@NotNull String tituloEvento, @NotNull LocalDate dataEvento, String comentario, @NotNull Membro membro, @NotNull TipoEvento tipoEvento) {
        this.tituloEvento = tituloEvento;
        this.dataEvento = dataEvento;
        this.comentario = comentario;
        this.tipoEvento = tipoEvento;
    }

    @Override
    public String toString() {
        return "MembroEvento{" +
                "tituloEvento='" + tituloEvento + '\'' +
                '}';
    }
}
