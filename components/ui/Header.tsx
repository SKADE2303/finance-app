import { HeaderLogo } from "./HeaderLogo";

export const Header = () =>{
    return (
        <header className ="bg-gradient-to-b from-blue-800 to-blue-400 px-4 py-6 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    <div className="flex items-center lg:gap-x-16">
                     
                    <HeaderLogo>

                    </HeaderLogo>


                    </div>
                   
                </div>
            </div>
           
        </header>
    );
}