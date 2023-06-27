import { FC, useEffect, useRef } from "react";
import {
    Chart,
    Plugin,
    TooltipItem,
    ChartTypeRegistry,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TriangleIcon from "../ui/_icons/TriangleIcon";

import styles from "./progressChart.module.scss";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface IVerticalLinePluginOptions {
    color: string;
    xPosition: number;
};


interface MyTooltipItem<TType extends keyof ChartTypeRegistry = keyof ChartTypeRegistry>
    extends TooltipItem<TType> {}

class VerticalLinePlugin implements Plugin {
    id = 'verticalLinePlugin';

    constructor(private options: IVerticalLinePluginOptions) {};
  
    beforeDraw(chart: Chart) {
        const ctx = chart.ctx as CanvasRenderingContext2D;
        const { top, bottom } = chart.chartArea;    
        const xPosition = this.options.xPosition;
        
        ctx.save();
        ctx.strokeStyle = this.options.color;
        ctx.setLineDash([5, 2.5]);
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(xPosition, top);
        ctx.lineTo(xPosition, bottom);
        ctx.stroke();
        ctx.restore();
    }
};

const ProgressChart: FC = () => {
    const chartRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const lineLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            tooltip: {
                intersect: false,
                backgroundColor: 'rgba(61, 61, 61, 0.8)',
                mode: 'index' as const,
                padding: {
                    top: 5,
                    bottom: 5,
                    left: 10,
                    right: 10
                },
                titleFont: {
                    family: 'Roboto',
                    weight: 'bold',
                    size: 16
                },
                bodyFont: {
                    family: 'Roboto',
                    size: 16
                },
                cornerRadius: 8,
                caretSize: 0,
                caretPadding: 20,
                filter: function (tooltipItem: any, data: number) {
                    if (tooltipItem.label === "June" && data === 2) {
                        return false;
                    }
                
                    return true;
                }
            },
            legend: {
                display: false,
                position: 'top' as const,
                align: 'start' as const
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
                    font: {
                        size: 16
                    }
                }
            },
            y: {
                max: 120,
                ticks: {
                    stepSize: 20,
                    beginAtZero: true,
                    font: {
                        size: 16
                    }
                },
            },
            
        },
    };

    const lineData = {
        labels: lineLabels,
        datasets: [
            {
                label: 'Target',
                data: [0, 16, 25, 45, 57, 75, 100, 0, 16, 25, 45, 57, 75, 100],
                borderWidth: 1,
                borderColor: '#3d3d3d',
                pointBackgroundColor: '#3d3d3d',
                pointRadius: 0,
                pointHitRadius: 5,
                backgroundColor: '#3d3d3d',
                tension: 0.3
            },
            {
                label: 'Actual',
                data: [0, 10, 15, 40, 67, 75, null, null, null, null, null, null, null, null],
                borderWidth: 1,
                borderColor: '#725AC1',
                pointBackgroundColor: '#725AC1',
                pointRadius: 0,
                pointHitRadius: 5,
                backgroundColor: '#725AC1',
                tension: 0.3,
            },
            {
                label: 'Actual',
                data: [null, null, null, null, null, 75, 90, 0, 10, 15, 40, 67, 75, 90],
                borderWidth: 1,
                borderColor: '#725AC1',
                pointBackgroundColor: '#725AC1',
                pointRadius: 0,
                pointHitRadius: 5,
                backgroundColor: '#725AC1',
                tension: 0.3,
                borderDash: [5, 5],
            }
        ]
    };

    useEffect(() => {
        if (chartRef.current) {
            const plugin = new VerticalLinePlugin({ color: "#FB5B0D", xPosition: 80 * 5 + 40 });
            Chart.register(plugin);
            chartRef.current.update();
        }
    }, []);

    const changeScrollPosition = (step: number): void => {
        if (containerRef.current) {
            const currentPosition = containerRef.current.scrollLeft;
            containerRef.current.scrollTo({
                left: currentPosition + step,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className={styles.progress}>
            <div className={styles.progress__header}> 
                <h3>Target / Actual number of works</h3>
                <p>?</p>
            </div>
            <div className={styles.progress__content}>
                <div ref={containerRef} className={styles.progress__content_wrapperExternal}>
                    <div style={{width: `${(lineLabels.length - 1) * 80 + 57}px`}} className={styles.progress__content_wrapperInternal}>
                        <Line ref={chartRef} options={lineOptions} data={lineData} />
                    </div>
                    <div onClick={() => changeScrollPosition(-180)} className={styles.progress__content_leftButton}>
                        <TriangleIcon />
                    </div>
                    <div onClick={() => changeScrollPosition(180)} className={styles.progress__content_rightButton}>
                        <TriangleIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressChart;