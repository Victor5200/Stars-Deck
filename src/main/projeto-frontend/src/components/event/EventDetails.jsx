import React from "react";

import axios from "axios";
import {Col, Container, Row} from "reactstrap";
import {Link} from "react-router-dom";
import { browserHistory } from 'react-router';

const API_MEMBRO_URL = 'http://localhost:8888/api/membro/';
const API_TIPO_EVENTO_URL = 'http://localhost:8888/api/tipo-evento/';
const API_MEMBRO_EVENTO_URL = 'http://localhost:8888/api/membro-evento/';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      membros: [],
      tipoEvento: [],

      formControls: {
        id: { value : ''},
        tituloEvento: { value : ''},
        dataEvento: { value: ''},
        comentario: { value : ''},
        membro: { value : ''},
        tipoEvento: { value : ''}
      },

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

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      formControls: {
        ...this.state.formControls, [name]: { ...this.state.formControls[name], value }
      }
    })
  }

  salvarEvento = () => {
    let objeto = {
      id: this.state.formControls.id.value,
      tituloEvento: this.state.formControls.tituloEvento.value,
      dataEvento: this.state.formControls.dataEvento.value,
      comentario: this.state.formControls.comentario.value,
      membro: this.state.membros.filter(f => f.id == this.state.formControls.membro.value)[0],
      tipoEvento: this.state.tipoEvento.filter(f => f.id == this.state.formControls.tipoEvento.value)[0]
    }

    axios.post(`${API_MEMBRO_EVENTO_URL}`, objeto).then(res => {
      this.props.history.push("/");
    });
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <div className="main">
            <Container>
              <Row>
                <Col lg="12" sm="12">
                  <h3>{this.state.formControls.id.value ? 'Dados do tipo de Evento' : 'Cadastrar novo tipo de Evento'}</h3>
                  <form>
                    <div className="form-group">
                      <label>Titulo do Evento</label>
                      <input type="text"
                             name="tituloEvento"
                             className="form-control"
                             value={this.state.formControls.tituloEvento.value}
                             onChange={this.changeHandler}
                      />
                    </div>

                    <div className="form-group">
                      <label>Data</label>
                      <input type="Date"
                             name="dataEvento"
                             className="form-control"
                             value={this.state.formControls.dataEvento.value}
                             onChange={this.changeHandler}
                      />
                    </div>

                    <div className="form-group">
                      <label>Comentario</label>
                      <textarea
                             name="comentario"
                             className="form-control"
                             value={this.state.formControls.comentario.value}
                             onChange={this.changeHandler}
                      />
                    </div>

                    <div className="form-group">
                      <label>Usuario</label>
                      <select name="membro" className="form-control" value={this.state.formControls.membro.value} onChange={this.changeHandler}>
                        <option value="">Escolha uma opção...</option>
                        {
                          this.state.membros ?
                              this.state.membros.map((v, k) => {
                                return (
                                  <option value={v.id}>{v.nome}</option>
                                )}
                              )
                            : null

                        }
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Tipo do Evento</label>
                      <select name="tipoEvento" className="form-control" value={this.state.formControls.tipoEvento.value} onChange={this.changeHandler}>
                        <option value="">Escolha uma opção...</option>
                        {
                          this.state.tipoEvento ?
                              this.state.tipoEvento.map((v, k) => {
                                return (
                                    <option value={v.id}>{v.nomeEvento}</option>
                                )}
                              )
                              : null

                        }
                      </select>
                    </div>

                    <button type="button" onClick={this.salvarEvento} className="btn btn-primary">Salvar</button>
                    <Link to={'/'} type="button" className="btn btn-default">Voltar</Link>
                  </form>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </>
    );
  }
}

export default EventDetails;
