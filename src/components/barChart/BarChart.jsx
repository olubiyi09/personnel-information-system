import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import styles from "../admin/Admin.module.css"

const BarChart = ({ data }) => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartContainer.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Total Users', 'Leave Applications', 'Total Supervisor', 'UnApproved Users'],
                    datasets: [{
                        label: 'Number of Users',
                        data: data,
                        backgroundColor: [
                            'rgba(17, 66, 50, 0.5)',
                            'rgba(135, 169, 34, 0.5)',
                            'rgba(252, 220, 42, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                        ],
                        borderColor: [
                            'rgba(17, 66, 50, 1)',
                            'rgba(135, 169, 34, 1)',
                            'rgba(252, 220, 42, 1)',
                            'rgba(247, 246, 187, 1)',
                        ],
                        borderWidth: 1,
                    }],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className={styles.chartwrap}>
            <canvas ref={chartContainer} />
        </div>
    );
};

export default BarChart;
