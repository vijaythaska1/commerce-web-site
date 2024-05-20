import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    Tooltip,
    CardFooter,
} from "@material-tailwind/react";

function Profile() {
    return (
        <>
            <Card className="overflow-hidden">
                <Card className="flex flex-col md:flex-row h-auto md:h-60 p-3 shadow-none">
                    <CardHeader
                        shadow={false}
                        floated={false}
                        className="m-0 w-full md:w-2/5 shrink-0 rounded-none md:rounded-r-none"
                    >
                        <video className="h-full w-full object-cover" autoPlay muted>
                            <source src="https://docs.material-tailwind.com/demo.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </CardHeader>
                    <CardBody className="mt-4 md:mt-0">
                        <Typography variant="h6" color="gray" className="mb-2 md:mb-4 uppercase text-sm md:text-base">
                            Institute Of Professional Studies (I.P.S.) Gangoh
                        </Typography>
                        <Typography variant="h4" color="blue-gray" className="mb-2 text-lg md:text-2xl">
                            Lyft launching cross-platform service this week
                        </Typography>
                        <Typography color="gray" className="mb-4 md:mb-8 font-normal text-sm md:text-base">
                            Like so many organizations these days, Autodesk is a company in
                            transition. It was until recently a traditional boxed software company
                            selling licenses. Yet its own business model disruption is only part
                            of the story
                        </Typography>
                    </CardBody>
                </Card>
                <div className="grid md:grid-rows-2 md:grid-flow-col gap-4 mt-8 w-full">
                    <Card className="w-full md:w-96 row-end-3 row-span-2 shadow-none">
                        <CardHeader floated={false} className="h-48 w-48 rounded-full mx-auto md:ml-24">
                            <img src="https://docs.material-tailwind.com/img/team-3.jpg" alt="profile-picture" />
                        </CardHeader>
                        <CardBody className="text-center">
                            <Typography variant="h4" color="blue-gray" className="mb-2 text-lg md:text-2xl">
                                Vijay Sharma
                            </Typography>
                            <Typography color="blue-gray" className="font-medium text-sm md:text-base" textGradient>
                                BCA III Sem
                            </Typography>
                        </CardBody>
                        <CardFooter className="flex justify-center gap-4 md:gap-7 pt-2">
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
                    <div className="row-start-1 col-span-4 mt-8 md:mt-14">
                        <div className="flex flex-col md:flex-row">
                            <Typography color="gray" className="font-normal mb-2 md:mb-0">
                                Name
                            </Typography>
                            <div className="w-full flex justify-end">
                                <div className="w-96">
                                    <Typography color="gray" className="font-normal">
                                        Vijay Sharma
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-4 md:mt-8">
                            <Typography color="gray" className="font-normal mb-2 md:mb-0">
                                Email
                            </Typography>
                            <div className="w-full flex justify-end">
                                <div className="w-96">
                                    <Typography color="gray" className="font-normal">
                                        VijaySharma@gmail.com
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row mt-4 md:mt-8">
                            <Typography color="gray" className="font-normal mb-2 md:mb-0">
                                Phone
                            </Typography>
                            <div className="w-full flex justify-end">
                                <div className="w-96">
                                    <Typography color="gray" className="font-normal">
                                        +91-9675570221
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
}

export default Profile;