import React from "react";

import PageHeader from "components/PageHeader/PageHeader.jsx";
import axios from "axios";
import {Col, Container, Row} from "reactstrap";
import {Link} from "react-router-dom";

const API_TIPO_EVENTO_URL = 'http://localhost:8888/api/tipo-evento/';

class TipoEventoDetails extends React.Component {
  constructor(props) {
    super(props);

    const id = this.props.match.params.id;

    this.state = {
      formControls: {
        id: { value : ''},
        nomeEvento: { value : ''},
        pontuacao: { value : ''},
      }
    };

    if (id) {
      this.buscarTipoEventoPorId(id);
    }
  }

  buscarTipoEventoPorId = (id) => {
    axios.get(`${API_TIPO_EVENTO_URL}/${id}`).then(res => {
      let tipoEvento = res.data;
      this.populaStateValoresAtualizadosNoBanco(tipoEvento);
    });
  };

  populaStateValoresAtualizadosNoBanco(tipoEvento) {
    this.setState({
      formControls: {
        id: {value: tipoEvento.id},
        nomeEvento: {value: tipoEvento.nomeEvento},
        pontuacao: {value: tipoEvento.pontuacao},
      }
    });
  }

  salvarTipoEvento = () => {
    let objeto = {
      id: this.state.formControls.id.value,
      nomeEvento:  this.state.formControls.nomeEvento.value,
      pontuacao: this.state.formControls.pontuacao.value
    }

    axios.post(`${API_TIPO_EVENTO_URL}`, objeto).then(res => {
      this.props.history.push("/");
    } , () => {

    });
  }

  changeHandler = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      formControls: {
        ...this.state.formControls, [name]: { ...this.state.formControls[name], value }
      }
    })
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
                      <label>Nome</label>
                      <input type="email"
                             name="nomeEvento"
                             className="form-control"
                             value={this.state.formControls.nomeEvento.value}
                             onChange={this.changeHandler}
                      />
                    </div>

                    <div className="form-group">
                      <label>Pontuação</label>
                      <input type="number"
                             name="pontuacao"
                             className="form-control"
                             value={this.state.formControls.pontuacao.value}
                             onChange={this.changeHandler}
                      />
                    </div>

                    <button type="button" onClick={this.salvarTipoEvento} className="btn btn-primary">Salvar</button>
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

export default TipoEventoDetails;
