import React from "react";

import {Col, Container, Row} from "reactstrap";
import { Link } from "react-router-dom";

import axios from 'axios';
const API_MEMBRO_URL = 'http://localhost:8888/api/membro/';
const API_TIPO_EVENTO_URL = 'http://localhost:8888/api/tipo-evento/';
const API_MEMBRO_EVENTO_URL = 'http://localhost:8888/api/membro-evento/';

class Basics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputFocus: false,
      membros: [],
      tipoEvento: []
    };

    this.buscarMembros();
    this.buscarTipoEvento();
  }

  buscarMembros = () => {
    axios.get(API_MEMBRO_URL).then(res => {
      this.setState({ membros: res.data });
    });
  };

  buscarTipoEvento = () => {
    axios.get(API_TIPO_EVENTO_URL).then(res => {
      this.setState({ tipoEvento: res.data });
    });
  };

  render() {
    return (
        <Container>
          <Row>
            <Link to="new-user" rel="tooltip" className="btn btn-primary">Novo Membro</Link>
            <Link to="new-event" rel="tooltip" className="btn btn-info">Novo Evento</Link>
            <Link to="new-type-event" rel="tooltip" className="btn btn-success">Novo tipo de Evento</Link>
          </Row>
          <Row>
            <Col lg="6" sm="6">
              <h3>Ranking de Membros</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Total de Eventos</th>
                    <th>Pontuação</th>
                    <th className="text-right">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.membros.length ?
                        this.state.membros.map((val, index) => {
                        return (
                          <tr>
                            <th>{index + 1}</th>
                            <td>{val.nome}</td>
                            <td>{val.eventos.length}</td>
                            <td>{val.pontuacao}</td>
                            <td className="td-actions text-right">
                              <Link to={'user-details/' + val.id} rel="tooltip" className="btn btn-info btn-simple btn-icon btn-sm mr-2">
                                <i className="tim-icons icon-single-02"></i>
                              </Link>
                            </td>
                          </tr>
                        )
                      })
                    : null
                  }
                </tbody>
              </table>
            </Col>
            <Col lg="6" sm="6">
                <h3>Lista de Tipos de Eventos</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nome do Tipo de Evento</th>
                      <th>Pontuação</th>
                      <th className="text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.tipoEvento.length ?
                        this.state.tipoEvento.map((val, index) => {
                          return (
                              <tr>
                                <td>{val.nomeEvento}</td>
                                <td>{val.pontuacao}</td>
                                <td className="td-actions text-right">
                                  <Link to={'new-type-details/' + val.id} rel="tooltip" className="btn btn-info btn-simple btn-icon btn-sm mr-2">
                                    <i className="tim-icons icon-single-02"></i>
                                  </Link>
                                </td>
                              </tr>
                          )
                        })
                        : null
                  }
                  </tbody>
                </table>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default Basics;
