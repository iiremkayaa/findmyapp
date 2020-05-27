import React,{useState, useEffect} from "react";
const CommentList =()=> {
    const [commentList, setCommentList] = useState([]);
    const [sharingId, setSharingId] = useState("");
        return (
            <div> 
               {
               this.state.commentList.map((item,index)=>{ 
                    return (
                        <div key={index} className="row">
                            <div className="col">From: {item.user.username}</div>
                            <div className="col">{item.comment}</div>
                            <div className="col">{item.commentDate}</div>

                        </div>
                    );
               })
              }
            </div>    
        );
    }
export default CommentList;