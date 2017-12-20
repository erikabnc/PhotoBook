import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './components/FileUpload';
import Header from './components/Header';

class App extends Component {
  constructor(){
    super();
    this.state ={
      user : null,
      pictures :[]
    };
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user =>{
      this.setState({user});
    });

    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures : this.state.pictures.concat(snapshot.val())
      });
    });
  }

  handleUpload(event){
    const file = event.target.files[0];
    const storageREF = firebase.storage().ref(`/foto/${file.name}`);
    const task = storageREF.put(file);
    task.on('state_changed', snapshot =>{
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
    }, error => {
        console.log(error.message);
    },
    () => {
        const record = {
          photoURL : this.state.user.photoURL,
          displayName : this.state.user.displayName,
          image : task.snapshot.downloadURL
        };
        const dbRef = firebase.database().ref('pictures')
        const newPicture = dbRef.push();
        newPicture.set(record);
    });
}

  renderPage(){
    if (this.state.user){
      return(
        <div class="ui center aligned container">
          <div class="ui divided items">
            <div class="item">
              <div class="image">
                  <img src={this.state.user.photoURL} alt={this.state.user.displayName} />
              </div>
              <div class="content">
                <h4 class="header">Welcome {this.state.user.displayName}</h4>
                <div class="description">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ornare hendrerit posuere. Morbi sagittis fringilla lectus sed pretium. Phasellus nisi ipsum, bibendum eget mi ut, bibendum egestas dui. Suspendisse potenti. Vivamus a ultricies justo. Integer est ipsum, imperdiet a nunc et, vehicula lobortis lacus. Quisque vel mollis tortor, et lobortis ipsum. Nullam luctus velit nisl, ut sollicitudin purus lacinia eget. Nulla sed urna arcu. Nunc cursus lacus eu laoreet pharetra. Vestibulum pellentesque ac lacus eu mattis. Sed gravida mi sollicitudin, luctus sapien ac, laoreet turpis. Vestibulum luctus elementum lacus, ac consequat ex gravida vitae. Curabitur ullamcorper egestas mollis. Maecenas tempor, nunc ac aliquam iaculis, ligula urna condimentum quam, ac cursus diam dui eget nibh. Sed tincidunt suscipit blandit.
                  
                  Proin condimentum tortor ipsum, a consequat nisl bibendum a. Quisque venenatis, tortor ut tristique pulvinar, est massa efficitur lacus, id malesuada nulla odio non odio. Maecenas urna metus, commodo eu erat et, molestie sodales risus. Etiam aliquam tincidunt velit non ultricies. Nullam in est mollis, convallis massa eget, scelerisque neque. Fusce sit amet odio tellus. Nulla posuere tellus at sem tempor malesuada. Sed vitae velit fermentum, efficitur dolor sit amet, molestie mi. Ut semper lacus orci, a feugiat erat dictum in. Curabitur mattis ligula sed porttitor varius. </p>
                </div>
                <div class="ui hidden divider">
                </div>
                <div class="extra">
                  <FileUpload onUpload={this.handleUpload}/>
                </div>
              </div>
            </div>
          </div>
          <div class="ui inverted segment">
          <div class="ui inverted divider">
          </div>
          <div class="ui horizontal inverted divider">Uploaded photos</div>
        </div>
        <div class="ui grid">
          <div class="three column row">
            {
              this.state.pictures.map(picture => (
                <div class="column">
                  <img src = {picture.image} class="ui image"/>
                </div>
              )).reverse()
            }
          </div>
          </div>
        </div>
      );
    }else{
      return(
          <div class="ui text container">
            <div class="ui center aligned container"> Welcome mate! Is great to see you! Please, login to use PhotoBook</div>
            <div class="ui divider">
            </div>
            <div class="ui center aligned container"> 
            </div>
          </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <div class="ui hidden divider">
        </div>
        <div>
          {this.renderPage()}
        </div>
      </div>

    );
  }
}

export default App;
