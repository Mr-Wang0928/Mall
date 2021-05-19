import React,{Component, Fragment} from 'react'
import { Upload, message ,Modal} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
class UpLoadImages extends Component{
    constructor(props){
        super(props)
        this.state={
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            isUpdate:false
        }
        this.handleCancel=this.handleCancel.bind(this)
        this.handlePreview=this.handlePreview.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }
    handleCancel () {
        this.setState({ previewVisible: false })
    } 

    async handlePreview(file) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    }
    static getDerivedStateFromProps(props,state){
        if(state.isUpdate){
            return null
        }else{
            return {
                fileList:props.fileList
            }
        }
    }
    handleChange ({fileList})  {
        const imageUrlList = fileList.map(item=>{
            if(item.response && item.response.status=='done'){
                return item.response.url
            }
        }).join(',')
        //(虽然解决了，不会多次执行getImageUrlLists()方法的问题，但是当你上传一个icon后，再删除之后，这个函数判断条件为空，不会执行)
        // //有路径并且不以“,”结尾
        // if(imageUrlList && !(/,$/.test(imageUrlList))){
        //     this.props.getImageUrlLists(imageUrlList)
        // }
        this.props.getImageUrlLists(imageUrlList)
        this.setState({ 
            fileList,
            isUpdate:true
        })
    }
    render(){
        const { previewVisible, previewImage, previewTitle,fileList} = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        )
        const{max,active}= this.props
        console.log(max,active,fileList);
        return(
            <Fragment>
                <Upload
                    name='file'
                    action={active}
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={beforeUpload}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    >
                    {fileList.length >= max ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Fragment>
        )
    }
}

export default UpLoadImages