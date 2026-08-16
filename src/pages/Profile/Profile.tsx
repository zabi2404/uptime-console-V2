import Button from "../../components/common/Buttons/Button"
import DangeZone from "./DangeZone"


function Profile() {
    return (
        <>
            <div className="">
                <h1 className="text-[32px]  font-semibold">
                    Profile
                </h1>

                <div className="my-6 rounded-xl border border-gray-200 p-4 shadow-sm">
                  
                    <div className="flex justify-between">
                        <h1 className="text-lg font-semibold">
                            Account Details
                        </h1>
                        <Button name="Edit" variant="primary" />
                    </div>

                    <div className="mt-4 xs:grid-col-1 grid sm:grid-cols-2 md:grid-cols-3 gap-4">

                        {/* Personal details */}
                        <div className="grid gap-3">

                            <div>
                                <h2 className="text-sm font-semibold text-gray-900">
                                    Name
                                </h2>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    John Doe
                                </p>
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold text-gray-900">
                                    Email
                                </h2>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    john.doe@example.com
                                </p>
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold text-gray-900">
                                    Phone number
                                </h2>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    123-456-7890
                                </p>
                            </div>

                        </div>

                        {/* Company details */}
                        <div className="grid gap-3 xsm:border-t sm:border-t-0 xsm:pt-4 sm:border-l border-gray-300 sm:pl-4">

                            <div>
                                <h2 className="text-sm font-semibold text-gray-900">
                                    Company name
                                </h2>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    John Doe
                                </p>
                            </div>

                            <div>
                                <h2 className="text-sm font-semibold text-gray-900">
                                    Website URL
                                </h2>
                                <p className="mt-0.5 text-xs text-gray-500">
                                    https://www.johndoe.com
                                </p>
                            </div>

                        </div>

                        {/* Address */}
                        <div className="grid gap-3 xsm:border-t sm:border-l-0 xsm:pt-4 md:border-l md:border-t-0 border-gray-300 sm:pl-4">

                            <div>
                                <h2 className="text-sm font-semibold text-gray-900">
                                    Address
                                </h2>

                                <p className="mt-0.5 max-w-xs text-xs leading-5 text-gray-500">
                                    Marghzar Colony, Lahore,
                                    Punjab 54000, PK
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Danger zone */}
                    <div className="mt-6">
                        {/* Danger zone goes here */}
                    </div>

                </div>

                <DangeZone />
            </div>
        </>
    )
}

export default Profile