import React, {Component} from "react";
import axios from "axios";
import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default class ExerciseStats extends Component {
    constructor(props) {
        super(props);

        this.state = {stats: [], names: []};
    }

    componentDidMount() {
        axios.get("http://localhost:5000/exercises/stats").then(resp => {

                this.setState({

                    stats: resp.data.map(currDat => currDat['total']),
                    names: resp.data.map(currDat => currDat['_id']),

                });

            }
        ).catch(err => console.log(err));
    }

    renderBarGraph() {

        const labels = [...this.state.names];
        const cData = {
            labels,

            datasets: [{
                label: 'Total Hours Exercised',
                data: this.state.stats,
                backgroundColor: 'rgb(255, 99, 132)',
            }]
        };

        return <Bar data={cData}/>;

    }

    render() {

        return (
            <div>
                <h3>Exercise Statistics</h3>
                {this.renderBarGraph()}
            </div>);

    }
}