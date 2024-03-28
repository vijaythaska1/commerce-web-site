import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Input
} from "@material-tailwind/react";
import changepassword from "../../assets/changepassword2.jpg"
function ChangePassword() {
    return (
        <Card className="w-full h-auto p-3">
            <Typography variant="h4" color="gray" className="mb-2 mt-3 ml-4">
                Change Password
            </Typography>
            <div className="w-full flex flex-row">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 w-2/4 shrink-0 rounded-r-none"
                >
                    <img
                        src={changepassword}
                        alt="card-image"
                        className="h-full w-full object-cover"
                    />
                </CardHeader>
                <CardBody className="w-full">

                    <div className="mt-8 w-full">
                        <Typography variant="h6" color="gray" className="mb-2 font-sans">
                            Current Password
                        </Typography>

                        <div className="w-96">
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className=" !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{ className: "min-w-[100px]" }}
                            />
                        </div>
                    </div>


                    <div className="mt-5 w-full">
                        <Typography variant="h6" color="gray" className="mb-2 font-sans">
                            New Password
                        </Typography>

                        <div className="w-96">
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className=" !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{ className: "min-w-[100px]" }}
                            />
                        </div>
                    </div>
                    <div className="mt-5 w-full">
                        <Typography variant="h6" color="gray" className="mb-2 font-sans">
                            confirm Password
                        </Typography>

                        <div className="w-96">
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className=" !border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
                                labelProps={{
                                    className: "hidden",
                                }}
                                containerProps={{ className: "min-w-[100px]" }}
                            />
                        </div>
                    </div>
                    <div className="w-96 flex justify-end mt-10">
                        <Button  loading={true}>Submit</Button>
                    </div>


                </CardBody>
            </div>
        </Card>
    )
}

export default ChangePassword