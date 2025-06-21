import { useEffect, useState } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { PiHandCoins } from "react-icons/pi";
import { TfiWallet } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/Cards/InfoCard";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import { RecentIncome } from "../../components/Dashboard/RecentIncome";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { addThousandSeparator } from "../../utils/helper";



//import { IoMCard } from "react-icons/io5";



const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () =>{
    setLoading(true);

    try{

      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data){
        console.log("Fetched dashboard data:", response.data);
        setDashboardData(response.data);
      }
    }
    catch(error){
      console.log("Something went wrong. Please try again later...", error)
    } finally{
      setLoading(false);
    }
  };
  useEffect(() =>{
    fetchDashboardData();
    return () =>{};
  }, []);

  if (loading) {
    return (
      <DashboardLayout activeMenu="Dashboard">
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Loading dashboard data...</p>
        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout activeMenu = "Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
          icon = {<FaRegCreditCard/>}
          label = "Total Balance"
          value = {addThousandSeparator(dashboardData?.totalBalance || 0)}
          color = "bg-primary"
          />

          <InfoCard
          icon = {<TfiWallet/>}
          label = "Total Income"
          value = {addThousandSeparator(dashboardData?.totalIncome || 0)}
          color = "bg-orange-500"
          />

          <InfoCard
          icon = {<PiHandCoins/>}
          label = "Total Expense"
          value = {addThousandSeparator(dashboardData?.totalExpense || 0)}
          color = "bg-red-500"
          />


        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
          transactions = {dashboardData?.recentTransactions} 
          onSeeMore = {() => navigate("/expense")}
          />

          <FinanceOverview
          totalBalance = {dashboardData?.totalBalance || 0 }
          totalIncome = {dashboardData?.totalIncome || 0 }
          totalExpense = {dashboardData?.totalExpense || 0}
          /> 

          <ExpenseTransactions
          transactions = {dashboardData?.expenseLast30Days?.transactions ||  []}
          onSeeMore = {() => navigate("/expense")}
          />

          <Last30DaysExpenses
          data = {dashboardData?.expenseLast30Days?.transactions || []}
          /> 

        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
            />

            <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
            />
        </div>

           </div>
         </div>
    </DashboardLayout>
  )
}
 
export default Home