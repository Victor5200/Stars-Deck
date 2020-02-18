import React from "react";

import PageHeader from "components/PageHeader/PageHeader.jsx";
import axios from "axios";
import {Col, Container, Row} from "reactstrap";
import {Link} from "react-router-dom";

const API_MEMBRO_URL = 'http://localhost:8888/api/membro/';

const GITHUB_API = 'https://api.github.com/users';

const maginTop = {
  marginTop: '-5px'
}

class UserDetails extends React.Component {

  _config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      host: '104.236.174.88',
      port: 3128
    }
  };

  constructor(props) {
    super(props);

    const id = this.props.match.params.id;

    this.state = {
      formControls: {
        id: { value : ''},
        nome: { value : ''},
        email: { value : ''},
        login: { value : ''},
        senha: { value : ''},
        bio: { value: ''}
      },
      eventos: []
    };

    if (id) {
      this.buscarMembrosPorId(id);
    }
  }

  buscarMembrosPorId = (id) => {
    axios.get(`${API_MEMBRO_URL}/${id}`, this._config).then(res => {
      let membro = res.data;
      this.populaStateValoresAtualizadosNoBanco(membro);
    });
  };

  carregarDadosGitHub = () => {
    const login = this.state.formControls.login.value;
    axios.get(`${GITHUB_API}/${login}`, this._config).then(res => {
      const data = res.data;
      this.setState({
        formControls: {
          id: {value: this.state.formControls.id.value},
          nome: {value: data.name},
          email: {value: data.email},
          login: {value: data.login},
          senha: {value: this.state.formControls.senha.value},
          bio: { value: data.bio}
        },
        eventos: this.state.eventos
      });
    })
  }

  populaStateValoresAtualizadosNoBanco(membro) {
    this.setState({
      formControls: {
        id: {value: membro.id},
        nome: {value: membro.nome},
        email: {value: membro.email},
        login: {value: membro.login},
        senha: {value: membro.senha},
        bio: { value: membro.bio}
      },
      eventos: membro.eventos
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

  salvarAtualizarMembro = () => {
    let objeto = {
      id: this.state.formControls.id.value,
      nome:  this.state.formControls.nome.value,
      email: this.state.formControls.email.value,
      login: this.state.formControls.login.value,
      senha: this.state.formControls.senha.value,
      bio: this.state.formControls.bio.value
    }

    axios.post(`${API_MEMBRO_URL}`, objeto, this._config).then(res => {
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
                <Col lg="6" sm="6">
                  <h3>{this.state.formControls.id ? 'Dados do Usuario' : 'Cadastrar novo usuario'}</h3>
                  <form>
                    <div className="form-group">
                      <label>Login</label>

                      <div className="input-group mb-3">
                        <input type="text"
                               name="login"
                               className="form-control"
                               value={this.state.formControls.login.value}
                               onChange={this.changeHandler}
                        />
                        <div className="input-group-append" style={maginTop}>
                          <button type="button" onClick={this.carregarDadosGitHub} className="btn btn-primary">Importar do Github</button>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Nome</label>
                      <input type="email"
                             name="nome"
                             className="form-control"
                             value={this.state.formControls.nome.value}
                             onChange={this.changeHandler}
                      />
                    </div>

                    <div className="form-group">
                      <label>E-mail</label>
                      <input type="email"
                             name="email"
                             className="form-control"
                             value={this.state.formControls.email.value}
                             onChange={this.changeHandler}
                      />
                    </div>

                    <div className="form-group">
                      <label>Senha</label>
                      <input type="password"
                             name="senha"
                             className="form-control"
                             value={this.state.formControls.senha.value}
                             onChange={this.changeHandler}
                      />
                    </div>

                    <div className="form-group">
                      <label>Biografia</label>
                      <input type="text"
                             name="bio"
                             className="form-control"
                             value={this.state.formControls.bio.value}
                             onChange={this.changeHandler}
                      />
                    </div>

                    <button type="button" onClick={this.salvarAtualizarMembro} className="btn btn-primary">Salvar</button>
                    <Link to={'/'} type="button" className="btn btn-default">Voltar</Link>
                  </form>
                </Col>

                <Col lg="6" sm="6">
                  <h3>Lista de Eventos</h3>

                  <table className="table">
                    <thead>
                      <tr>
                        <th>Titulo do Evento</th>
                        <th>Data</th>
                        <th>Comentario</th>
                        <th>Tipo do Evento</th>
                        <th>Pontuação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.eventos.length ?
                            this.state.eventos.map((val, index) => {
                              return (
                                  <tr>
                                    <td>{val.tituloEvento}</td>
                                    <td>{val.dataEvento}</td>
                                    <td>{val.comentario}</td>
                                    <td>{val.tipoEvento.nomeEvento}</td>
                                    <td>{val.tipoEvento.pontuacao}</td>
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
          </div>
        </div>
      </>
    );
  }
}

export default UserDetails;
