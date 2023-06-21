import { FC } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import styles from "./progressChart.module.scss";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ProgressChart: FC = () => {
    const lineLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const lineOptions = {
        responsive: true,
        aspectRatio: 2.85,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            tooltip: {
                enabled: true,
                intersect: true
            },
            legend: {
                display: false,
                position: 'top' as const,
            },
            title: {
                display: false
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    display: true
                }
            },
            y: {
                max: 100,
                ticks: {
                    stepSize: 25,
                    beginAtZero: true, 
                },
            },
            
        },
    };

    const lineData = {
        labels: lineLabels,
        datasets: [
          {
            label: 'Target',
            data: [0, 16, 25, 45, 57, 75, 100],
            borderColor: '#3d3d3d',
            pointBackgroundColor: '#3d3d3d',
            backgroundColor: '#3d3d3d',
            tension: 0.1
          },
          {
            label: 'Actual',
            data: [0, 10, 15, 40, 67, 75, 90],
            borderColor: '#725AC1',
            pointBackgroundColor: '#725AC1',
            backgroundColor: '#725AC1',
            tension: 0.1
          },

        ],
    };

    return (
        <div className={styles.progress}>
            <div className={styles.progress__header}> 
                <h3>Target / Actual number of works</h3>
                <p>?</p>
            </div>
            <div className={styles.progress__content}>
                <Line options={lineOptions} data={lineData} />
            </div>
        </div>
    )
}

export default ProgressChart;