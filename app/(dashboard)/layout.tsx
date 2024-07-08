import  { Header } from "@/components/ui/Header"
import { Navigation } from "@/components/ui/Navigation"
type Props ={
children : React.ReactNode;
}

const DashBoard = ({children} : Props) =>{
    return (
        <>
        <Header />
        <main className="px-3 lg:px-14">
            {children}
        </main>
        </>
    );
}

export default DashBoard;