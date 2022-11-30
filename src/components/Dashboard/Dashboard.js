// import getConfig from 'next/config';
import { getDashboardData, getProductCount, getServiceCount, getWeekelyRevenue } from 'api/dataAPI';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Menu } from 'primereact/menu';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProductService } from '../../demo/services/ProductService';
import './dashboard.css';


const Dashboard = () => {
    const [products, setProducts] = useState(null);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const [lineOptions, setLineOptions] = useState(null);

    const [state, setState] = useState({
        summaryBoxes : null,
        soldProducts : [],
        soldServices : [],
        lineData : null
    });

    useEffect( () => {
        async function getData() {
            var response1 = await getDashboardData();
            var response2 = await getProductCount();
            var response3 = await getServiceCount();
            var response4 = await getWeekelyRevenue();

            var labels = [];
            var data = [];

            await response4.data.data.forEach(element => {
                labels.push(`Week ${element.week}`);
                data.push(element["sum(total)"]);
            });

            var lineData = {
                labels,
                datasets: [
                    {
                        label: 'Weekly Revenue',
                        data,
                        fill: false,
                        backgroundColor: '#2f4860',
                        borderColor: '#2f4860',
                        tension: 0.4
                    }
                ]
            }

            setState({
                summaryBoxes : response1.data.data.numbers ,
                soldProducts : response2.data.data.slice(0,5),
                soldServices : response3.data.data.slice(0,5),
                lineData : lineData
            })
        }
        getData();
    }, [] )

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        const productService = new ProductService();
        productService.getProductsSmall().then((data) => setProducts(data));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    return (
        <div className="grid mx-8 mt-4">
            {
                state.summaryBoxes ? <div className="col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Orders</span>
                                <div className="text-900 font-medium text-xl">{ state.summaryBoxes.ongoingOrders.overall }</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-shopping-cart text-blue-500 text-xl" />
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">{state.summaryBoxes.ongoingOrders.thisWeek} new</span>
                        <span className="text-500">since last visit</span>
                    </div>
                </div> : <></>
            }
            {
                state.summaryBoxes ? <div className="col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Revenue</span>
                                <div className="text-900 font-medium text-xl">${ state.summaryBoxes.revenue.thisWeek }</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-map-marker text-orange-500 text-xl" />
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">${ state.summaryBoxes.revenue.lastWeel }</span>
                        <span className="text-500">last week</span>
                    </div>
                </div> : <></>
            }
            {
                state.summaryBoxes ? <div className="col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Products</span>
                                <div className="text-900 font-medium text-xl">{state.summaryBoxes.productCount }</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-inbox text-cyan-500 text-xl" />
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">8</span>
                        <span className="text-500">Categories</span>
                    </div>
                </div>: <></>
            }
            {
                state.summaryBoxes ? <div className="col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Services</span>
                                <div className="text-900 font-medium text-xl">{state.summaryBoxes.serviceCount }</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-comment text-purple-500 text-xl" />
                            </div>
                        </div>
                        <span className="text-green-500 font-medium">6</span>
                        <span className="text-500">Categories</span>
                    </div>
                </div> : <></>
            }
            {
                state.lineData ? <div className="col-12">
                    <div className="card">
                        <h5>Sales Overview</h5>
                        <Chart type="line" data={state.lineData} options={lineOptions} />
                    </div>
                </div>: <></>
            }
            {
                state.soldProducts.length > 0 ? <div className='col-6'>
                    <div className="card">
                        <div className="flex justify-content-between align-items-center mb-5">
                            <h5>Best Selling Products</h5>
                        </div>
                        <ul className="list-none p-0 m-0">
                            {
                                state.soldProducts.map( (item) => {
                                    return <li className="flex flex-row align-items-center justify-content-between mb-4">
                                        <div>
                                            <span className="text-900 font-medium mr-2 mb-1 md:mb-0">{item.title}</span>
                                        </div>
                                        <div className="mt-2 md:mt-0 flex align-items-center">
                                            <span className="text-orange-500 ml-3 font-medium">{item.quantity}</span>
                                        </div>
                                    </li>
                                } )
                            }
                        </ul>
                    </div>
                </div> : <></>
            }
            {
                state.soldServices.length > 0 ? <div className='col-6'>
                    <div className="card">
                        <div className="flex justify-content-between align-items-center mb-5">
                            <h5>Best Selling Services</h5>
                        </div>
                        <ul className="list-none p-0 m-0">
                            {
                                state.soldServices.map( (item) => {
                                    return <li className="flex flex-row align-items-center justify-content-between mb-4">
                                        <div>
                                            <span className="text-900 font-medium mr-2 mb-1 md:mb-0">{item.title}</span>
                                        </div>
                                        <div className="mt-2 md:mt-0 flex align-items-center">
                                            <span className="text-orange-500 ml-3 font-medium">{item.quantity}</span>
                                        </div>
                                    </li>
                                } )
                            }
                        </ul>
                    </div>
                </div> : <></>
            }
        </div>
    );
};

export default Dashboard;
