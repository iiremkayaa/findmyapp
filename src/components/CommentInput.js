import React,{Component} from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Container,Row,Col} from 'react-bootstrap';
class CommentInput extends Component {
    constructor(props){
		super(props);
		this.state={
            comment:'',
            sharingId:'',
            userId:1,
            rightSuggestion:'',
            isAnon:false,
            rightSuggestion:false
        };
        this.commentChange=this.commentChange.bind(this);
        this.submitComment=this.submitComment.bind(this);
        this.onSwitchComment=this.onSwitchComment.bind(this);

    }
    componentDidMount(){
        this.setState({sharingId:this.props.sharing});  
    }
    onSwitchComment = () => {
		this.setState({isAnon: !this.state.isAnon})
	}; 
    submitComment(event){
        event.preventDefault();
		axios({
				method: 'post',
				url: '/comment',
				data: {
                  user_id: this.state.userId,
                  sharing_id:this.state.sharingId,
                  comment:this.state.comment,
                  rightSuggestion:this.state.rightSuggestion,
                  isAnon:this.state.isAnon
				}
		});
		alert("Comment is posted");
    }
    commentChange(event){
		this.setState({comment:event.target.value});
	}
    
    render(){
        return(
        <Container  style={{paddingTop:"10px",paddingBottom:"10px"}}>
        <Form onSubmit={this.submitComment}>
            <Row >
                <Col sm={10}>
				  <Form.Group className="d-flex p-2 col-example" controlId="formComment">
				    <Form.Control required as="textarea" rows="3" cols="1" value={this.state.description} onChange={this.commentChange}  />
				  </Form.Group>
                </Col>
                <Col sm={2}>
				  <Form.Group controlId="anonComment">
				  	<Form.Check  type="switch" label="Anonymous"  onChange={this.onSwitchComment} />
				  </Form.Group>
				  <Button type="submit" variant="secondary" className="btn  btn-sm" >Send Comment</Button>
                  </Col>
                  </Row>
		</Form>
        </Container>
        );
    }
    
  
} export default CommentInput;