import React, {Component} from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class EditExercise extends Component {

    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {username: '', description: '', duration: 0, date: new Date(), users: []}
    }

    componentDidMount() {

        let id = window.location.href.split("/");

        axios.get('http://localhost:5000/exercises/' + id[id.length-1]).then(
            res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })
            }
        ).catch(err => console.log(err));

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),

                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }


    onChangeUsername(e) {
        this.setState({
            username: e.target.value,
        })
    }

    onChangeDesc(e) {
        this.setState({
            description: e.target.value,
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value,
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date,
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        let id = window.location.href.split("/");

        axios.post("http://localhost:5000/exercises/update/" + id[id.length-1], exercise).then(res => console.log(res))
            .catch(err => console.log(err));
        console.log(exercise);
        window.location = '/';
    }


    render() {

        return (
            <div>
                <h3>Edit New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function (user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                               required
                               className="form-control"
                               value={this.state.description}
                               onChange={this.onChangeDesc}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <br/>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );

    }
}