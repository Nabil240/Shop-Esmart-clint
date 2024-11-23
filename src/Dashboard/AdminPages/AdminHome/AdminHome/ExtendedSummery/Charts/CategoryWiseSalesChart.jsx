

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#00C49F','#0088FE','#FF8042', '#FFA600', '#58508D', '#FFBB28','#FF6361',       ];


const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5; // Position inside the pie slice
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize={12}
            fontWeight="bold"
        >
            {`${(percent * 100).toFixed(0)}%`} {/* Display percentage inside */}
        </text>
    );
};



const CategoryWiseSalesChart = ({data}) => {
   
    if (!data || Object.keys(data).length === 0) {
        return 
    }

   
    const chartData = Object.keys(data).map((key) => ({
        category: key.toUpperCase(),
        value: data[key],
    }));

    

    return ( 
        <div className=' mb-10 md:mb-0' style={{ width: 600, height: 380 }}>  
        <h3 className="text-xl font-semibold mb-4 text-center">Category Wise Sales</h3>
            <ResponsiveContainer width="100%" height={380} className={"hidden md:block"}>
                <PieChart >
                    <Pie
                        data={chartData}
                        cx="50%" 
                        cy="50%"
                        outerRadius={120} 
                        innerRadius={5} 
                        fill="#8884d8"
                        dataKey="value"
                        
                        label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
                        nameKey="category"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend></Legend>
                </PieChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height="100%" className={"md:hidden"}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%" 
                        cy="50%"
                        outerRadius={120} 
                        innerRadius={5} 
                        fill="#8884d8"
                        dataKey="value"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        nameKey="category"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend></Legend>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryWiseSalesChart;