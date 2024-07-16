import React, { useState } from "react";
import image from "../assets/fall-zoom-5.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import Joi from 'joi';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Checkbox,
    Typography,
    Button,
} from "@material-tailwind/react";
import APIS from "../axios/Index.js";
import helper from "../utility/helper.js";

function Loginpage() {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [eye, setEye] = useState(0);
    const dispatch = useDispatch();
    const navegate = useNavigate();

    const validateForm = () => {
        const validationSchema = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            password: Joi.string().required(),
        });
        return helper.reactDataValidator(validationSchema, data, setErrors);
    };

    const handlelogin = async () => {
        try {
            if (!validateForm()) return;
            const res =  await dispatch(APIS.authLogin(data));
            if (res.payload.data.success === true) {
                 navegate("/Dashboard");
                localStorage.setItem('userProfile', JSON.stringify(res.payload.data.body));
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handeleye = () => {
        setEye(eye === 1 ? 0 : 1)
    }

    const handleChange = (event) => {
        helper.handleChange(event, setData);
    };

    return (
        <section
            className="w-full h-screen flex items-center justify-center"
            style={{ backgroundImage: `url("${image}")` }}
        >
            <Card className="w-96 display: flex justify-self-center">
                <form>
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
                            type="email"
                            size="lg"
                            autoComplete="username"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <div>
                            <Typography variant="small" color="red" >
                                {errors.email || ""}
                            </Typography>
                        </div>
                        <div className="relative flex">
                            <Input
                                label="Password"
                                name="password"
                                size="lg"
                                type={eye === 0 ? "password" : "text"}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={handleChange}
                                error={errors.password}
                            />
                            <span className="material-symbols-outlined flex absolute left-[90%] top-[9px]" onClick={handeleye}>
                                {eye === 1 ? "visibility" : "visibility_off"}
                            </span>
                        </div>
                        <Typography variant="small" color="red">
                            {errors?.password || ""}
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
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                            >
                                Sign up
                            </Link>
                        </Typography>
                    </CardFooter>
                </form>
            </Card>
        </section>
    );
}

export default Loginpage;
