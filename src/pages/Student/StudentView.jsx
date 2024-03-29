import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Tooltip,
    CardFooter,
    Input,
    label
} from "@material-tailwind/react";

function StudentView() {
    return (
        <>
            <Card>
            <Typography variant="h4" color="gray" className="mb-2 mt-6 ml-6">
                Student Details
            </Typography>
                <div className="grid grid-rows-2 grid-flow-col gap-4 mt-6 w-full">
                    <Card className="w-96 row-end-3 row-span-2  shadow-none">
                        <CardHeader floated={false} className="h-48 w-48 rounded-full ml-24 ">
                            <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                        </CardHeader>
                        <CardBody className="text-center">
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                Vijay Sharma
                            </Typography>
                            <Typography color="blue-gray" className="font-medium" textGradient>
                                BCA III Sem
                            </Typography>
                        </CardBody>
                        <CardFooter className="flex justify-center gap-7 pt-2">
                            <Tooltip content="Like">
                                <Typography
                                    as="a"
                                    href="#facebook"
                                    variant="lead"
                                    color="blue"
                                    textGradient
                                >
                                    <i className="fab fa-facebook" />
                                </Typography>
                            </Tooltip>
                            <Tooltip content="Follow">
                                <Typography
                                    as="a"
                                    href="#twitter"
                                    variant="lead"
                                    color="light-blue"
                                    textGradient
                                >
                                    <i className="fab fa-twitter" />
                                </Typography>
                            </Tooltip>
                            <Tooltip content="Follow">
                                <Typography
                                    as="a"
                                    href="#instagram"
                                    variant="lead"
                                    color="purple"
                                    textGradient
                                >
                                    <i className="fab fa-instagram" />
                                </Typography>
                            </Tooltip>
                        </CardFooter>
                    </Card>
                    <div className="row-start-1 col-span-4 mt-14">
                        <div className="flex">
                            <Typography color="gray" className="font-normal">
                                Name
                            </Typography>
                            <div className="w-full flex justify-end ">
                                <div className="w-96">
                                    <Typography color="gray"
                                        className="font-normal"
                                    >Vijay Sharma</Typography>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-8">
                            <Typography color="gray" className="font-normal">
                                Email
                            </Typography>
                            <div className="w-full flex justify-end ">
                                <div className="w-96">
                                    <Typography color="gray"
                                        className="font-normal"
                                    >VijaySharma@gmail.com</Typography>
                                </div>
                            </div>
                        </div>
                        {/* <div className="flex mt-8">
                        <label>
                            Class
                        </label>
                        <div className="w-full flex justify-end">
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
                    </div> */}
                        <div className="flex mt-8">
                            <Typography color="gray" className="font-normal">
                                Phone
                            </Typography>
                            <div className="w-full flex justify-end ">
                                <div className="w-96">
                                    <Typography color="gray"
                                        className="font-normal"
                                    >+91-9675570221</Typography>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Card>

        </>

    )
}

export default StudentView