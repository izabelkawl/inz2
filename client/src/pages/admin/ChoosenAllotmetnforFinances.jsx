import React, { useState, useEffect, Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import api, { insertFinance } from "../../api/index";
import { Form }from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Wrapper,Span,  BlueButtonStyle, RedButtonStyle, Title } from '../constants';

class FinancesInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allotment_number: '',
            owner: '',
            title: '',
            area: '',
            charge: '',
            term: '',
            account: '',
            status: '',

            id: this.props.match.params.id,
            number: '',
            allotment_width: '',
            allotment_length: '',
            user_id: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount = async () => {
        const { id } = this.state
        const allotment = await api.getAllotmentById(id)
        const paymentdetails = await api.getPaymentdetailById('5ffa2f4e205ae300946933d7')
        
        this.setState({
            number: allotment.data.data.number,
            allotment_width: allotment.data.data.allotment_width,
            allotment_length: allotment.data.data.allotment_length,
            user_id: allotment.data.data.user_id,

            stable_price: paymentdetails.data.data.stable_price,
            membership_fee: paymentdetails.data.data.membership_fee,
            water_advance: paymentdetails.data.data.water_advance,
            water_charge: paymentdetails.data.data.water_charge,
            energy_charge: paymentdetails.data.data.energy_charge,
            garbage: paymentdetails.data.data.garbage,
            transfer_title: paymentdetails.data.data.transfer_title,
            payment_date: paymentdetails.data.data.payment_date,
            account_number: paymentdetails.data.data.account_number
        })
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {

        e.preventDefault();
        const newFinance = {

            allotment_number: this.state.number,
            owner: this.state.user_id,
            title: this.state.transfer_title,
            area: this.state.allotment_width * this.state.allotment_length,
            charge: ( this.state.allotment_width * this.state.allotment_length*this.state.stable_price) + this.state.membership_fee  + this.state.water_advance + this.state.water_charge + this.state.energy_charge + this.state.garbage,
            term: this.state.payment_date,
            account: this.state.account_number,
            status: this.state.status
        };
        this.props.insertFinance(newFinance, this.props.history)
    };

    render() {

        const FinancesComponent = () => {
            const [userss, setUsers] = useState([]);
        
            useEffect(() => {
              const userName = async () => {
                  const userList = await api.getAllUsers()
                  const {data } = userList
                      
                  setUsers(data.data);
                  }
              userName();
          }, []);
          const { stable_price, membership_fee, water_advance, water_charge, energy_charge, garbage,transfer_title,  payment_date, account_number  } = this.state;
        
          const {  number, allotment_width, allotment_length, user_id } = this.state;
          const { errors } = this.state;

          const username = userss.map((user, index) => {
            const { _id, firstname, lastname } = user
            if(_id === user_id){
           
          return (
            <Wrapper key={_id}>
                <Title>Tworzenie zobowiązania</Title>
        <Form onSubmit={this.onSubmit}>
            <Form.Group>
                <Form.Label>Numer działki: </Form.Label>
                    <Form.Control
                        id="allotment_number"
                        type="text"
                        defaultValue={number}
                        readOnly>
                    </Form.Control>
                    </Form.Group>
            <Form.Group>
                <Form.Label>Posiadacz: </Form.Label>
                    <Form.Control
                        type="text"
                        defaultValue={firstname+ ' '+ lastname}
                        readOnly>
                    </Form.Control>
                    <Form.Control
                        hidden
                        id="owner"
                        type="text"
                        defaultValue={user_id}
                        readOnly>
                    </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="title" >Tytuł: </Form.Label>
                    <Form.Control
                        onChange={this.onChange}
                        value={transfer_title}
                        id="title"
                        type="text"
                        readOnly
                    ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Powierzchnia: </Form.Label>
                    <Form.Control
                        id="area"
                        value={allotment_width * allotment_length}
                        type="text"
                        readOnly
                        ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Należność: </Form.Label>
                    <Form.Control
                        id="charge"
                        type="text"
                        value={( allotment_width * allotment_length*stable_price ) + membership_fee +  water_advance +water_charge + energy_charge + garbage}
                        readOnly
                        onChange={this.onChange}
                        ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Termin zapłaty: </Form.Label>
                    <Form.Control
                        id="term"
                        type="date"
                        value={payment_date}
                        onChange={this.onChange}
                        readOnly
                        ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Konto: </Form.Label>
                    <Form.Control
                        id="account"
                        type="text"
                        value={account_number}
                        onChange={this.onChange}
                        readOnly
                        ></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Status: </Form.Label>
                <Span>{errors.status}</Span>
                    <Form.Control
                    onChange={this.onChange}
                    as="select" 
                    value={this.state.status} 
                    id="status" >
                        <option>Wybierz..</option> 
                        <option>Opłacona</option> 
                        <option>Nieopłacona</option> 
                    </Form.Control>
            </Form.Group><Button style={RedButtonStyle} href={'/admin/finances/list'}>Powrót</Button>
            {' '}
                <Button style={BlueButtonStyle} type="submit">Stwórz</Button>
                 </Form>
            </Wrapper>
        )
          }
          else {return null}
  })
  return username
        }

        // useEffect(() => {
        //     const userName = async () => {
        //         const userList = await api.getAllUsers()
        //         const {data } = userList
        //         setUsers(data.data);
        //         }

        //     userName();
        // }, []);
        
        return <FinancesComponent/>
    }
}


const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { insertFinance }
)(withRouter(FinancesInsert));