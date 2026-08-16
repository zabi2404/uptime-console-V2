
import Cards from "../../components/common/Cards";
import CreateProjectModal from "../../components/common/CreateProjectModal";
import Tables from "../../components/common/Table/Tables";
import { useModal } from "../../context/ModalContext";

export default function Overview() {

    const { isOpen, closeModal } = useModal();

    return (
        <>

            <div><h1 className="font-bold text-3xl">
                Overview
            </h1></div>
            <div className="flex items-center  gap-3
    xsm:flex-col md:flex-row
    " >

                <Cards
                    heading='PROJECTS MONITORED'
                    description='3'
                />
                <Cards
                    heading='UPTIME, 7 DAYS'
                    description='99.2%'
                />
                <Cards
                    heading='SERVICES SLEEPING'
                    description='1'
                />
                <Cards
                    heading='DOMAINS EXPIRING < 30D'
                    description='1'
                />
            </div>
            <div className="mt-4">
                <Tables />
            </div>

            <CreateProjectModal 
            
            isOpen={isOpen}
             onClose={closeModal}
            />
        </>

    )
}
