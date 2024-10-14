import Lgscreen from "./lgscreen";
import Mobile from "./mobile";

export default function NavigationBar() {

    return (
        <nav
            className="md:sticky fixed bottom-0 md:top-0  z-[2147] w-full max-w-full bg-gray-900 rounded-none shadow-lg shadow-black/50 h-max  bg-opacity-90 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
            
            <Lgscreen />

            <Mobile />
            
        </nav>

    )
}
