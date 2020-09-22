import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
     margin: 50px;
    background-color: white;
    padding: 50px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class ProvidersInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            name: '',
            address: '',
            hours: '',
            raitingid: '',
            phone: '',
        }
    }

    handleChangeInputEmail = async event => {
        const email = event.target.value
        this.setState({ email })
    }
    handleChangeInputPassword = async event => {
        const password = event.target.value
        this.setState({ password })
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputAddress = async event => {
        const address = event.target.value
        this.setState({ address })
    }


    handleChangeInputHours = async event => {
        const hours = event.target.value
        this.setState({ hours })
    }

    handleChangeInputRaitingid = async event => {
        const raitingid = event.target.validity.valid
            ? event.target.value
            : this.state.raitingid

        this.setState({ raitingid })
    }

    handleChangeInputPhone = async event => {
        const phone = event.target.validity.valid
            ? event.target.value
            : this.state.phone

        this.setState({ phone })
    }

    handleIncludeProvider = async () => {
        const { email, password, name, address, hours, raitingid, phone } = this.state
        const payload = { email, password, name, address, hours, raitingid, phone }

        await api.insertProvider(payload).then(res => {
            window.alert(`Provider inserted successfully`)
            this.setState({
                email: '',
                password: '',
                name: '',
                address: '',
                hours: '',
                raitingid: '',
                phone: '',
            })
        })
    }

    render() {
        const { email, password, name, address, hours, raitingid, phone } = this.state
        return (
            <Wrapper>
                <Title>Create Provider</Title>
                <Label>Email: </Label>
                <InputText
                    type="text"
                    value={email}
                    onChange={this.handleChangeInputEmail}
                />

                <Label>Password: </Label>
                <InputText
                    type="text"
                    value={password}
                    onChange={this.handleChangeInputPassword}
                />

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />
                <Label>Address: </Label>
                <InputText
                    type="text"
                    value={address}
                    onChange={this.handleChangeInputAddress}
                />

                <Label>Hours: </Label>
                <InputText
                    type="text"
                    value={hours}
                    onChange={this.handleChangeInputHours}
                />

                <Label>Raiting: </Label>
                <InputText
                    type="text"
                    value={raitingid}
                    onChange={this.handleChangeInputRaitingid}
                />
                <Label>Phone: </Label>
                <InputText
                    type="text"
                    value={phone}
                    onChange={this.handleChangeInputPhone}
                />


                <Button onClick={this.handleIncludeProvider}>Add Provider</Button>
                <CancelButton href={'/providers/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default ProvidersInsert