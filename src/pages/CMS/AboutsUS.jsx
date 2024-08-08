import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Card, Typography, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import APIS from '../../axios/Index';


function AboutsUS() {

    const [data, setData] = useState({ content: '' });
    const dispatch = useDispatch()
    const getcms = useSelector((state) => state.GetCms);
    useEffect(() => {
        dispatch(APIS.cmsget(0));
    }, [dispatch]);



    const token = JSON.parse(localStorage.getItem("userProfile"))?.authToken;

    const test = async () => {
        const requestKey = {
            content: data.content
        };
        const requestMethods = {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${token}`,
                SECRET_KEY: process.env.REACT_APP_SECRET_KEY,
                PUBLISH_KEY: process.env.REACT_APP_PUBLISH_KEY,
            },
            body: JSON.stringify(requestKey)
        };
        const res = await fetch(`http://127.0.0.1:7300/CmsUpdate?type=${0}`, requestMethods);
        const data = await res.json();
        console.log("data>>>>>>>>>", data);
    }


    const hendleUpdate = async () => {
        const test = { content: data.content, type: 0 }
        try {
            await dispatch(APIS.UpdateCms({content: data.content, type: 0 }));
        } catch (error) {
            console.log(error);
        }
    }
    const handleEditorChange = (event, editor) => {
        const content = editor.getData();
        setData((prevData) => ({
            ...prevData,
            content,
        }));
    }

    return (
        <Card className='p-3 w-full'>
            <div className="mb-8  w-full flex justify-center">
                <Typography variant="h2" color="gray" className="mb-2 mt-3 ml-4  font-sans text-2xl">
                    {getcms?.GetCms?.data?.body?.title}
                </Typography>
            </div>

            <CKEditor
                editor={ClassicEditor}
                data={getcms?.GetCms?.data?.body?.content}
                onChange={handleEditorChange}
            />

            <div className=" flex justify-end mt-10">
                <Button onClick={hendleUpdate} >Submit</Button>
                <Button onClick={() => test()} >test</Button>
            </div>

        </Card>
    );
}

export default AboutsUS;
