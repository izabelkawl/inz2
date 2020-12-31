import React, { useState, useEffect, Component} from "react";
import api from "../../api";
import styled from 'styled-components';
import { Button, Form, Modal } from 'react-bootstrap';
import Wrapper from '../../components/Wrapper/Wrapper'
import {RedButtonStyle, BlueButtonStyle } from '../constants'
import Title from '../../components/Title'

const Container = styled.div`
    background-color: white;
    -webkit-box-shadow: 0px 8px 18px -8px rgba(0,0,0,0.1);
    -moz-box-shadow: 0px 8px 18px -8px rgba(0,0,0,0.1);
    box-shadow: 0px 8px 18px -8px rgba(0,0,0,0.1);

    padding: 20px;
    margin-top: 20px;
    display: grid;

    grid-template-columns: 0.8fr 0.2fr;
    grid-template-rows:  4(1fr);
    gap: 25px 25px;
    grid-template-areas:
    "Content ."
    "Content ."
    "Content ."
    "Content Footer";`

const Content = styled.div`
  display: grid;
  grid-area: Content;
`
const FooterButton = styled.div`
  display: grid;
  grid-area: Footer;
`
const HeaderDiv = styled.div`
  font-size: 26px;
`
// const Image = styled.img.attrs({

// })`
//   grid-area: Image;
// `
//tylko dla swoich zrobić
class DeleteTable extends Component {
  deleteTable = event => {
      event.preventDefault()
      if (
          window.confirm(
              `Do you want to delete the table ${this.props.id} permanently?`,
          )
      ) {
          api.deleteTableById(this.props.id)
          window.location.reload()
      }
  }
  render() {
      return <Button style={RedButtonStyle} onClick={this.deleteTable}>Usuń</Button>
  }
}

  class AddAnnouncement extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        title: '',
        user_id: '',
        content: '',
        image: ''
    }
      this.handleChangeInputTitle = this.handleChangeInputTitle.bind(this);
      this.handleChangeInputUserId = this.handleChangeInputUserId.bind(this);
      this.handleChangeInputContent = this.handleChangeInputContent.bind(this);
      this.handleChangeInputImage = this.handleChangeInputImage.bind(this);
  
    }handleChangeInputTitle = async event => {
      const title = event.target.value
      this.setState({ title })
  }
  handleChangeInputUserId = async event => {
    const user_id = event.target.value
    this.setState({ user_id })
  }
  handleChangeInputContent = async event => {
      const content = event.target.value
      this.setState({ content })
  }
  handleChangeInputImage = async event => {
  const image = event.target.value
  this.setState({  image })
  }

  handleIncludeTable = async () => {
      const { title, user_id, content, image } = this.state
      const payload = { title, user_id, content, image }
      console.log(payload)
      await api.insertTable(payload).then(res => {
          window.alert(`Table inserted successfully`)
          this.setState({
            title: '',
            user_id: '',
            content: '',
            image: ''
          })
          window.location.reload()
      })
  }

    render(){ 
      const { title, user_id, content, image } = this.state
   return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Dodaj wątek
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
    <Form.Group controlId="exampleForm.ControlInput">
      <Form.Label>Tytuł</Form.Label>
      <Form.Control type="text" value={title} onChange={this.handleChangeInputTitle}/>
    </Form.Group>
    <Form.Group controlId="exampleForm.ControlInput1">
      <Form.Label>Użytkownik</Form.Label>
      <Form.Control type="text"value={user_id}  onChange={this.handleChangeInputUserId} />
    </Form.Group>
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label>Treść</Form.Label>
      <Form.Control as="textarea" value={content} onChange={this.handleChangeInputContent} rows={3} />
    </Form.Group>
    <Form.Group controlId="exampleForm.ControlTextarea2">
      <Form.Label>Treść</Form.Label>
      <Form.Control as="textarea"value={image}  onChange={this.handleChangeInputImage} rows={3} />
    </Form.Group>
   
  </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button style={RedButtonStyle} onClick={this.props.onHide}>Zamknij</Button>
          <Button style={BlueButtonStyle} onClick={this.handleIncludeTable}>Dodaj</Button>
        </Modal.Footer>
      </Modal>
    )
   }
  }

const NoticeBoard = () => {
    const [tables, setTables] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        const requestTablesList = async () => {
            const tablesList = await api.getAllTables();
            const { data } = tablesList;
            setTables(data.data);
        };

        requestTablesList();
    }, []);

    const TableList = tables.map((table, index) => {
        const { _id, title, user, content} = table;
        //date from timestap
        const timestamp = _id.toString().substring(0,8);
        const date = new Date(parseInt(timestamp ,16)*1000).toLocaleDateString();

        return (
            <Container key={_id}>
                {/* <Image src={image}/> */}
                <Content>
                  <HeaderDiv>{title}</HeaderDiv>
                  <Form.Text>{content}</Form.Text>
                  <Form.Text muted>{date}</Form.Text>
                </Content>
                <FooterButton>
                  <Form.Text muted>{user}</Form.Text>
                  <Button style={BlueButtonStyle} >Wiadomość</Button>
                  {/* dla swoich postów tylko usuwanie*/}
                  <DeleteTable id={_id}/>
                </FooterButton>
            </Container> 
        );
    });
    return (
      <Wrapper>
        <Title>Tablica ogłoszeń</ Title>
        <Button style={BlueButtonStyle} onClick={() => setModalShow(true)}>Dodaj ogłoszenie</Button>
        <AddAnnouncement show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Form.Check type="checkbox" label="Pokaż moje ogłoszenia" />
       {TableList}
      </Wrapper>
    )
};

export default NoticeBoard