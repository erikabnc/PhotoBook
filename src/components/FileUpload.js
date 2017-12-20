import React, {Component} from 'react';
class FileUpload extends Component{

    render(){
        return(
            <div class="ui icon input">
                <input type="file" onChange={this.props.onUpload}/>
            </div>
        )
    }
}
export default FileUpload;