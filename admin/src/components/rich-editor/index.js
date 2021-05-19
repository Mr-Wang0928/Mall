import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import '@ckeditor/ckeditor5-build-classic/build/translations/zh-cn';

class RichEditor extends Component{
    render(){
        const {data,getDetail,url} =this.props
        return(
            <div className="Detail">
                <CKEditor
                    config={ {
                        language: 'zh-cn',
                        ckfinder:{
                            uploadUrl:url
                        },
                    } }
                    editor={ ClassicEditor }
                    data={data}
                    // onReady={ editor => {
                    //     // You can store the "editor" and use when it is needed.
                    //     console.log( 'Editor is ready to use!', editor );
                    // } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        getDetail(data)
                        console.log( { event, editor, data } );
                    } }
                    // onBlur={ ( event, editor ) => {
                    //     console.log( 'Blur.', editor );
                    // } }
                    // onFocus={ ( event, editor ) => {
                    //     console.log( 'Focus.', editor );
                    // } }
                />
            </div>
        )
    }
}
export default RichEditor