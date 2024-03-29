import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Card, Typography, Input, Button } from "@material-tailwind/react";


function AboutsUS() {
    return (
        <Card className='p-3 w-full'>

            <div className="mb-8  w-full flex justify-center">
                <Typography variant="h2" color="gray" className="mb-2 mt-3 ml-4  font-sans text-2xl">
                    Abouts US
                </Typography>
            </div>

            <CKEditor
                editor={ClassicEditor}
                data="<p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>"
            />

            <div className=" flex justify-end mt-10">
                <Button loading={true}>Submit</Button>
            </div>

        </Card>
    );
}

export default AboutsUS;
