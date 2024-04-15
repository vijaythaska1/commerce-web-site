import React, { useState } from "react";
import image from "../assets/fall-zoom-5.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import APIS from "../axios/Index.js";

function Loginpage() {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const navegate = useNavigate();

    const handlelogin = async () => {
        try {
            const res = await dispatch(APIS.authLogin(data));
            if (res.payload.data.success === true) {
                navegate("/Dashboard")
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        setData((prevalue) => {
            return {
                ...prevalue,
                [event.target.name]: event.target.value
            }
        })
    };
    function Typography({ children }) {
        return <span>{children}</span>
    };
    return (
        <section
            className="w-full h-screen flex items-center justify-center"
            style={{ backgroundImage: `url("${image}")` }}
        >
            <Card className="w-96 display: flex justify-self-center">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input
                        label="Email"
                        name="email"
                        value={data?.email}
                        onChange={handleChange}
                        size="lg"
                        type="email"
                        required
                    />
                    <div>
                        <Typography variant="small" color="red">
                        </Typography>
                    </div>
                    <div className="relative">
                        <Input
                            label="Password"
                            name="password"
                            value={data?.password}
                            onChange={handleChange}
                            size="lg"
                            required
                        />
                    </div>
                    <Typography variant="small" color="red" style={{ display: "flex" }}>
                    </Typography>
                    <div className="-ml-2.5">
                        <Checkbox label="Remember Me" />
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button onClick={handlelogin} variant="gradient" fullWidth>
                        Sign In
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Don&apos;t have an account?
                        <Link
                            as="a"

                            // to={"/Dashboard"}
                            variant="small"
                            color="blue-gray"
                            className="ml-1 font-bold"
                        >
                            Sign up
                        </Link>
                    </Typography>
                </CardFooter>
            </Card>
        </section>
    );
}

export default Loginpage;