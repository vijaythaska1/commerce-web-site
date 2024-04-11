import React, { useState } from "react";
import image from "../assets/fall-zoom-5.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
// import { loginApi } from "../axios/Index.js";
// import { loginUserPost } from "../axios/APIs.js";
import APIS from "../axios/Index.js";
function Loginpage() {
    function Typography({ children }) {
        return <span>{children}</span>;
    }
    //   const dispatch=useDispatch()
    const loginUser = () => {
        let data = {
            email: "admin@gmail.com",
            password: "1234567"
        }
        APIS.authLogin(data)
    }
    const navegate = useNavigate()
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
                        required
                        name="email"
                        size="lg"
                        type="email"
                        autoComplete="username"
                    />
                    <div>
                        <Typography variant="small" color="red">
                        </Typography>
                    </div>
                    <div className="relative">
                        <Input
                            label="Password"
                            name="password"
                            size="lg"
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <Typography variant="small" color="red" style={{ display: "flex" }}>

                    </Typography>
                    <div className="-ml-2.5">
                        <Checkbox label="Remember Me" />
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button onClick={loginUser} variant="gradient" fullWidth>
                        Sign In
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Don&apos;t have an account?
                        <Link
                            as="a"
                            onClick={loginUser}
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