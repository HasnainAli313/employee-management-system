
import { useNavigate } from "react-router-dom";

function Home() {
    const navigte = useNavigate();

    const handleEmployeeNavigate = () => {
        navigte('/employeelogin');
    }

    const handleManagerNavigate = () => {
        navigte('/managerlogin');
    }

    return (
        <>
            <section>
                <h1 className="text-3xl font-semibold text-blue-600 p-3">Employee Management System</h1>

                <div className="flex gap-3 flex-col justify-center border h-[70vh] place-items-center">
                    <p className="text-3xl">Welcome to Employee Management System</p>

                    <div className="flex gap-3">
                        <button 
                            className="border border-black p-2 bg-blue-500 text-white hover:bg-blue-700 transition duration-300"
                            onClick={handleManagerNavigate}
                        >
                            Manager
                        </button>
                        <button 
                            className="border border-black p-2 bg-green-500 text-white hover:bg-green-700 transition duration-300"
                            onClick={handleEmployeeNavigate}
                        >
                            Employee
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;
