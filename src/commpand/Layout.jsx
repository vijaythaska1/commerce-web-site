import { Sidebar } from './Sidebar.jsx'
import { Navbars } from './Navbars.jsx'
import { Footer } from './Footer.jsx';
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className='w-full h-screen flex overflow-auto'>
            <div className='min-h-full'>
                <Sidebar />
            </div>
            <div className='flex-col w-full'>
                <div className='w-full flex-col px-4 py-2'>
                    <Navbars/>
                    <div className='w-full h-full p-4 overflow-auto'>
                        <Outlet />
                    </div>
                </div>
                <div className='w-full flex justify-end'>
                    <Footer />
                </div>

            </div>

        </div>
    )
}
export default Layout;
