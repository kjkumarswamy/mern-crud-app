import React from 'react';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            name: "",
            age: "",
            city: "",
            _id: ""

        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        return (
            fetch("http://localhost:3002/api/users").then((resp) => {
                resp.json().then((result) => {
                    this.setState({
                        users: result
                    })
                })
            }))

    }

    beforeCreate(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        })
    }

    createUser(event) {
        event.preventDefault();

        fetch('http://localhost:3002/api/users/create', {
            method: 'post',
            headers: { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' },
            body: `name=${this.state.name}&age=${this.state.age}&city=${this.state.city}`
        })
        alert('user created');
        this.getData();
    }
    updateValue(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    update(event) {
        event.preventDefault();
        fetch('http://localhost:3002/api/users/update', {
            method: 'put',
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: `_id=${this.state._id}&name=${this.state.name}&age=${this.state.age}&city=${this.state.city}`
        })
        alert("user Updated")
        this.getData();
    }

    delete(uid) {
        fetch('http://localhost:3002/api/users/delete', {
            method: 'delete',
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: `_id=${uid}`
        })
        alert("user deleted")
        this.getData();
    }
    render() {
        console.log(this.state)
        return (
            <>
                <h1>THis is app component</h1>
                <table border="1">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>NAME</td>
                            <td>AGE</td>
                            <td>CITY</td>
                            <td>OPERATION</td>
                        </tr>

                    </thead>
                    <tbody>
                        {this.state.users.map((item) =>
                            <tr>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.city}</td>
                                <td><button onClick={this.delete.bind(this, item._id)}>delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <h2>Creating Users</h2>
                <form onSubmit={this.createUser.bind(this)}>
                    <p>Name:- <input type="text" name="name" onChange={this.beforeCreate.bind(this)} /></p>
                    <p>Age:- <input type="text" name="age" onChange={this.beforeCreate.bind(this)} /></p>
                    <p>City:- <input type="text" name="city" onChange={this.beforeCreate.bind(this)} /></p>
                    <input type="submit" value="create" />
                </form>
                <h2>Updating User</h2>
                <form onSubmit={this.update.bind(this)}>
                    <p>ID:- <input type="text" name="_id" onChange={this.updateValue.bind(this)} /></p>
                    <p>Name:- <input type="text" name='name' onChange={this.updateValue.bind(this)} /></p>
                    <p>Age:- <input type="text" name="age" onChange={this.updateValue.bind(this)} /></p>
                    <p>City:- <input type="text" name="city" onChange={this.updateValue.bind(this)} /></p>
                    <input type='submit' value='update' />
                </form>
            </>
        )
    }
}


export default App