import axios from "axios"; // Make sure to import axios
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { SIDE_MENU_DATA } from "../../utils/data";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = async () => {
        try {
            // Optional: Make logout API call if your backend needs it
            await axios.post('/api/v1/auth/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
        } catch (error) {
            console.error("Logout API error:", error);
            // Continue with logout even if API fails
        } finally {
            // Clear client-side state
            localStorage.removeItem('authToken'); // More specific than clear()
            clearUser();
            
            // Redirect to login
            navigate("/login", { replace: true });
            
        }
    };

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {user?.profileImageUrl ? (
                    <img
                        src={user.profileImageUrl}
                        alt="Profile Image"
                        className="w-20 h-20 bg-slate-400 rounded-full"
                    />
                ) : (
                    <CharAvatar
                        fullName={user?.fullName}
                        width="w-20"
                        height="h-20"
                        style="text-xl"
                    />
                )}

                <h5 className="text-gray-950 font-medium leading-6">
                    {user?.fullName || ""}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-[15px] ${
                        activeMenu === item.label 
                            ? "text-white bg-primary" 
                            : "text-gray-700 bg-transparent"
                    } py-3 px-6 rounded-lg mb-3`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className="text-xl" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default SideMenu;