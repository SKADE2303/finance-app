import  { Header } from "@/components/ui/Header"
import { Navigation } from "@/components/ui/navigation"
type Props ={
children : React.ReactNode;
}

const DashBoard = ({children} : Props) =>{
    return (
        <div>
        <Header />
        <main className="px-3 lg:px-14">
            {children}
        </main>
        </div>
    );
}

export default DashBoard;