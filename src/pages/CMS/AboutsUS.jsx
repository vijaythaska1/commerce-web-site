import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Card, Typography, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import APIS from '../../axios/Index';


function AboutsUS() {
    const [data, setData] = useState({ content: '' })
    const dispatch = useDispatch()
    const getcms = useSelector((state) => state.GetCms);
    useEffect(() => {
        dispatch(APIS.cmsget(0));
    }, [dispatch]);

    useEffect(() => {
        if (getcms?.GetCms?.data?.body?.content) {
            setData({ content: getcms.GetCms.data.body.content });
        }
    }, [getcms]);

    const hendleUpdate = async () => {
        try {
            const res = await dispatch(APIS.UpdateCms(0, data));
            console.log("🚀 ~ hendleUpdate ~ res:", res)
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
            </div>

        </Card>
    );
}

export default AboutsUS;
