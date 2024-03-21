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
            <div className='w-full h-full flex flex-col px-4 py-2'>
                <Navbars />
                <div className='w-full h-full p-4 overflow-auto'>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    )
}
export default Layout;
