import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CustomLegend from "./CustomLegend";
import CustomTooltip from "./CustomTooltip";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  console.log({ label, totalAmount, showTextAnchor });
  console.log("CustomPieChart data:", data);
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length] || "#ccc"}
            />
          ))}
        </Pie>
        <Tooltip  content={CustomTooltip}/>
        <Legend  content={CustomLegend}/>

        {showTextAnchor && (
          <g>
            <text
              x="50%"
              y="45%"
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
            >
              {label}:
            </text>
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fill="#333"
              fontSize="24px"
              fontWeight="semi-bold"
            >
              {totalAmount}
            </text>
          </g>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
