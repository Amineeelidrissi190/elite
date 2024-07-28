import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
export default function ChartTrainies() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/Chartreservation");
                const formattedData = formatData(res.data);
                setData(formattedData);
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatData = (rawData) => {
        return rawData.map(item => ({
            x: new Date(item.x).getTime(), // Convertir le timestamp UNIX en millisecondes
            y: item.y
        }));
    };

    return (
        <div className='h-full w-full text-black'>
            {loading ? (
                <div className='flex items-center w-full h-full text-center text-white justify-center'>
                    <div className="loader">
                        <div data-glitch="Loading..." className="glitch">Loading...</div>
                    </div>
                </div>
            ) : error ? (
                <div className='flex items-center text-center justify-center text-red-500'>{error}</div>
            ) : data.length > 0 ? (
                <div className='flex items-center w-11/12 justify-center h-full'>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="x"
                                tickFormatter={unixTime => new Date(unixTime).getFullYear()}
                                type="number"
                                domain={['dataMin', 'dataMax']}
                            />
                            <YAxis />
                            <Tooltip
                                labelFormatter={unixTime => new Date(unixTime).toDateString()}
                            />
                            <Line type="monotone" dataKey="y" stroke="red" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className='flex items-center text-center justify-center'>No data available</div>
            )}
        </div>
    );
}
